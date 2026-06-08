// lib/supabase/queries.ts
// All database queries. Import and use in server components or API routes.
// Client components should call the /api/* routes instead.

import { createServerClient } from './server'
import type {
  Business,
  BusinessWithStats,
  Category,
  CategoryWithTasks,
  Task,
  TaskCreateInput,
  TaskUpdateInput,
  SessionLog,
  SessionLogCreateInput,
  Resource,
  ResourceCreateInput,
  Milestone,
  DashboardStats,
} from '@/types'

// ─── BUSINESSES ───────────────────────────────

export async function getBusinesses(): Promise<Business[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

// Uses the business_stats VIEW for aggregated metrics
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createServerClient()

  const [{ data: businesses }, { data: sessions }] = await Promise.all([
    supabase.from('business_stats').select('*'),
    supabase.from('latest_sessions').select('*'),
  ])

  const enriched: BusinessWithStats[] = (businesses ?? []).map((b) => ({
    ...b,
    latest_session: sessions?.find((s) => s.business_id === b.id) ?? undefined,
  }))

  const totals = enriched.reduce(
    (acc, b) => ({
      total_tasks: acc.total_tasks + (b.task_total ?? 0),
      completed_tasks: acc.completed_tasks + (b.task_completed ?? 0),
      blocked_tasks: acc.blocked_tasks + (b.task_blocked ?? 0),
    }),
    { total_tasks: 0, completed_tasks: 0, blocked_tasks: 0 }
  )

  const { count } = await supabase
    .from('session_logs')
    .select('id', { count: 'exact', head: true })

  return {
    ...totals,
    session_count: count ?? 0,
    businesses: enriched,
  }
}

// ─── CATEGORIES & TASKS ───────────────────────

export async function getCategoriesWithTasks(
  businessId: string,
  module: 'backend' | 'product',
  includeHidden = false
): Promise<CategoryWithTasks[]> {
  const supabase = createServerClient()

  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', businessId)
    .eq('module', module)
    .order('sort_order')

  if (catErr) throw catErr

  const categoryIds = categories.map((c) => c.id)

  let taskQuery = supabase
    .from('tasks')
    .select('*')
    .in('category_id', categoryIds)
    .order('sort_order')

  if (!includeHidden) {
    taskQuery = taskQuery.eq('is_hidden', false)
  }

  const { data: tasks, error: taskErr } = await taskQuery
  if (taskErr) throw taskErr

  // Group tasks under their category
  return categories.map((cat) => ({
    ...cat,
    tasks: tasks.filter((t) => t.category_id === cat.id),
  }))
}

export async function getTask(id: string): Promise<Task | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function createTask(input: TaskCreateInput): Promise<Task> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('tasks')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTask(input: TaskUpdateInput): Promise<Task> {
  const supabase = createServerClient()
  const { id, ...updates } = input
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}

// Toggle a task's hidden status for the timeline
export async function toggleTaskHidden(taskId: string, hidden: boolean): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('tasks')
    .update({ is_hidden: hidden })
    .eq('id', taskId)

  if (error) throw error
}

// Get all critical/blocked tasks across all businesses for dashboard widget
export async function getCriticalTasks(limit = 8): Promise<Task[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('tasks_with_category')
    .select('*')
    .in('priority', ['critical', 'high'])
    .not('status', 'eq', 'completed')
    .not('status', 'eq', 'archived')
    .eq('is_hidden', false)
    .order('priority', { ascending: false })
    .order('updated_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Search tasks by title (full-text via pg_trgm)
export async function searchTasks(query: string, businessId?: string): Promise<Task[]> {
  const supabase = createServerClient()
  let q = supabase
    .from('tasks')
    .select('*')
    .ilike('title', `%${query}%`)
    .limit(20)

  if (businessId) q = q.eq('business_id', businessId)

  const { data, error } = await q
  if (error) throw error
  return data
}

// ─── SESSION LOGS ─────────────────────────────

export async function getSessionLogs(
  businessId?: string,
  limit = 20
): Promise<SessionLog[]> {
  const supabase = createServerClient()
  let q = supabase
    .from('session_logs')
    .select('*, business:businesses(name, slug, color, icon)')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (businessId) q = q.eq('business_id', businessId)

  const { data, error } = await q
  if (error) throw error
  return data
}

export async function getLatestSession(businessId: string): Promise<SessionLog | null> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('latest_sessions')
    .select('*')
    .eq('business_id', businessId)
    .single()

  return data
}

export async function createSessionLog(input: SessionLogCreateInput): Promise<SessionLog> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('session_logs')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data
}

// ─── RESOURCES ────────────────────────────────

export async function getResources(
  businessId: string,
  type?: string,
  tags?: string[]
): Promise<Resource[]> {
  const supabase = createServerClient()
  let q = supabase
    .from('resources')
    .select('*')
    .eq('business_id', businessId)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (type) q = q.eq('resource_type', type)
  if (tags?.length) q = q.overlaps('tags', tags)

  const { data, error } = await q
  if (error) throw error
  return data
}

export async function createResource(input: ResourceCreateInput): Promise<Resource> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('resources')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteResource(id: string): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) throw error
}

// ─── MILESTONES ───────────────────────────────

export async function getMilestones(businessId: string): Promise<Milestone[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('business_id', businessId)
    .order('target_date', { ascending: true })

  if (error) throw error
  return data
}

export async function toggleMilestone(id: string, completed: boolean): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('milestones')
    .update({ is_completed: completed })
    .eq('id', id)

  if (error) throw error
}

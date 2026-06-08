// ─────────────────────────────────────────────
// FounderOS — Core Type Definitions
// Mirrors the Supabase PostgreSQL schema 1:1
// ─────────────────────────────────────────────

export type BusinessSlug = 'fundamentals' | 'marketmap'

export type TaskStatus =
  | 'not_started'
  | 'in_progress'
  | 'blocked'
  | 'completed'
  | 'archived'

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export type ResourceType =
  | 'pdf'
  | 'youtube'
  | 'article'
  | 'github'
  | 'loom'
  | 'image'
  | 'ai_export'
  | 'notes'
  | 'figma'

export type SessionModule = 'backend' | 'product'

export type AISource = 'claude' | 'chatgpt' | 'manual' | 'n8n'

// ─── Database Row Types ───────────────────────

export interface Business {
  id: string
  name: string
  slug: BusinessSlug
  description: string
  color: string
  icon: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  business_id: string
  name: string
  module: SessionModule
  sort_order: number
  created_at: string
}

export interface Task {
  id: string
  business_id: string
  category_id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  completion_percent: number
  current_blocker: string | null
  next_step: string | null
  due_date: string | null
  is_hidden: boolean
  sort_order: number
  created_at: string
  updated_at: string
  // Joined
  category?: Category
  business?: Business
}

export interface Dependency {
  id: string
  task_id: string          // the dependent task
  depends_on_task_id: string // the prerequisite task
  label: string | null
  created_at: string
  // Joined
  task?: Task
  depends_on_task?: Task
}

export interface Milestone {
  id: string
  business_id: string
  title: string
  description: string | null
  target_date: string | null
  is_completed: boolean
  created_at: string
}

export interface SessionLog {
  id: string
  business_id: string
  ai_source: AISource
  raw_input: string | null   // original paste from ChatGPT/Claude
  summary: string
  completed_items: string[]
  pending_items: string[]
  blockers: string[]
  next_steps: string[]
  recommended_action: string | null
  created_at: string
  // Joined
  business?: Business
}

export interface Resource {
  id: string
  business_id: string
  title: string
  description: string | null
  resource_type: ResourceType
  url: string | null
  file_path: string | null   // Supabase Storage path
  tags: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
  // Joined
  business?: Business
}

export interface HiddenTask {
  id: string
  task_id: string
  user_id: string
  hidden_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  default_business_id: string | null
  theme: 'dark' | 'light' | 'system'
  sidebar_collapsed: boolean
  timezone: string
  updated_at: string
}

// ─── API / Client Types ───────────────────────

export interface BusinessWithStats extends Business {
  task_total: number
  task_completed: number
  task_blocked: number
  overall_completion: number
  active_sprint: string | null
  last_updated: string
  latest_session?: SessionLog
}

export interface CategoryWithTasks extends Category {
  tasks: Task[]
}

export interface TaskCreateInput {
  business_id: string
  category_id: string
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  completion_percent?: number
  current_blocker?: string
  next_step?: string
  due_date?: string
}

export interface TaskUpdateInput extends Partial<TaskCreateInput> {
  id: string
}

export interface SessionLogCreateInput {
  business_id: string
  raw_input: string
  ai_source: AISource
}

export interface ResourceCreateInput {
  business_id: string
  title: string
  description?: string
  resource_type: ResourceType
  url?: string
  tags?: string[]
}

// ─── UI / Store Types ─────────────────────────

export interface DashboardStats {
  total_tasks: number
  completed_tasks: number
  blocked_tasks: number
  session_count: number
  businesses: BusinessWithStats[]
}

export interface TimelineTask extends Task {
  start_offset_pct: number  // 0-100 position in timeline
  width_pct: number         // 0-100 width in timeline
  is_intersecting: boolean
  intersecting_label?: string
}

export const dynamic = "force-dynamic";
// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { z } from 'zod'

const CreateTaskSchema = z.object({
  business_id: z.string().uuid(),
  category_id: z.string().uuid().optional(),
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  status: z.enum(['not_started', 'in_progress', 'blocked', 'completed', 'archived']).default('not_started'),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  completion_percent: z.number().int().min(0).max(100).default(0),
  current_blocker: z.string().optional(),
  next_step: z.string().optional(),
  due_date: z.string().optional(),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('business_id')
  const status = searchParams.get('status')

  const supabase = createAdminClient()
  let query = supabase.from('tasks').select('*, category:categories(name, module)').order('sort_order')

  if (businessId) query = query.eq('business_id', businessId)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = CreateTaskSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const supabase = createAdminClient()

  // If no category_id provided, find or create a default one
  let categoryId = parsed.data.category_id
  if (!categoryId) {
    const { data: cats } = await supabase
      .from('categories')
      .select('id')
      .eq('business_id', parsed.data.business_id)
      .eq('module', 'backend')
      .limit(1)
      .single()

    categoryId = cats?.id
  }

  if (!categoryId) {
    return NextResponse.json({ error: 'No category found for this business' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...parsed.data, category_id: categoryId } as any)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}


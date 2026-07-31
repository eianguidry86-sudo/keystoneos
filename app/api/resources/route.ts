export const dynamic = "force-dynamic";
// app/api/resources/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { z } from 'zod'

const CreateResourceSchema = z.object({
  business_id: z.string().uuid(),
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  resource_type: z.enum(['pdf', 'youtube', 'article', 'github', 'loom', 'image', 'ai_export', 'notes', 'figma']),
  url: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('business_id')

  const supabase = createAdminClient()
  let query = supabase
    .from('resources')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (businessId) query = query.eq('business_id', businessId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = CreateResourceSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('resources')
    .insert(parsed.data as any)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}


export const dynamic = "force-dynamic";
// app/api/sessions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { parseSessionWithAI } from '@/lib/ai/summarize'
import { z } from 'zod'

const CreateSessionSchema = z.object({
  business_id: z.string(),  // uuid or 'both'
  ai_source: z.enum(['claude', 'chatgpt', 'manual', 'n8n']).default('manual'),
  raw_input: z.string().min(1),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('business_id')
  const limit = Number(searchParams.get('limit') ?? '20')

  const supabase = createAdminClient()
  let query = supabase
    .from('session_logs')
    .select('*, business:businesses(name, slug, color, icon)')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (businessId && businessId !== 'all') {
    query = query.eq('business_id', businessId)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = CreateSessionSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { business_id, ai_source, raw_input } = parsed.data

  // AI parsing: structured extraction from raw text
  const structured = await parseSessionWithAI(raw_input)

  const supabase = createAdminClient()

  // If "both" businesses, create a log for each
  if (business_id === 'both') {
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id')
      .eq('is_active', true)

    const inserts = ((businesses as any[]) ?? []).map((b) => ({
      business_id: b.id,
      ai_source,
      raw_input,
      ...structured,
    }))

    const { data, error } = await supabase
      .from('session_logs')
      .insert(inserts as any)
      .select('*, business:businesses(name, slug, color, icon)')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data?.[0], { status: 201 })
  }

  const { data, error } = await supabase
    .from('session_logs')
    .insert({
      business_id,
      ai_source,
      raw_input,
      ...structured,
    } as any)
    .select('*, business:businesses(name, slug, color, icon)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}


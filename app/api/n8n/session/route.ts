// app/api/n8n/session/route.ts
// Receives POST from n8n workflows to auto-create session logs.
// Secured with a shared secret token.

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { z } from 'zod'

const N8NSessionSchema = z.object({
  business_slug: z.string(),
  summary: z.string(),
  completed_items: z.array(z.string()).default([]),
  pending_items: z.array(z.string()).default([]),
  blockers: z.array(z.string()).default([]),
  next_steps: z.array(z.string()).default([]),
  recommended_action: z.string().optional(),
})

export async function POST(request: NextRequest) {
  // Verify shared secret
  const authHeader = request.headers.get('Authorization')
  const expectedToken = `Bearer ${process.env.N8N_WEBHOOK_SECRET}`

  if (authHeader !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = N8NSessionSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Look up business by slug
  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', parsed.data.business_slug)
    .single()

  if (!biz) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 })
  }

  const { data, error } = await supabase
    .from('session_logs')
    .insert({
      business_id: biz.id,
      ai_source: 'n8n',
      summary: parsed.data.summary,
      completed_items: parsed.data.completed_items,
      pending_items: parsed.data.pending_items,
      blockers: parsed.data.blockers,
      next_steps: parsed.data.next_steps,
      recommended_action: parsed.data.recommended_action ?? null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, session: data }, { status: 201 })
}

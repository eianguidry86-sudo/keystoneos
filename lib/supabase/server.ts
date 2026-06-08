// lib/supabase/server.ts
// Server-side Supabase client (use in server components, API routes)
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Server component client (reads session from cookies)
export const createServerClient = () =>
  createServerComponentClient<Database>({ cookies })

// Admin client with service role key — bypasses RLS
// USE ONLY in trusted server contexts (API routes, n8n webhooks)
export const createAdminClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

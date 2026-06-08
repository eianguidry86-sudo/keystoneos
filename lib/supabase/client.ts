// lib/supabase/client.ts
// Browser-side Supabase client (use in client components)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './database.types'

export const createClient = () =>
  createClientComponentClient<Database>()

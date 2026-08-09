import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AppShell } from '@/components/layout/AppShell'
import { TasksClient } from '@/components/tasks/TasksClient'
import { getBusinesses } from '@/lib/supabase/queries'

export const dynamic = "force-dynamic"

export default async function TasksPage() {
  try {
    const supabase = createServerComponentClient({ cookies })
    const businesses = await getBusinesses()

    // Fetch all tasks with categories for the global tasks view
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*, category:categories(*)')
      .eq('is_hidden', false)
      .order('sort_order')

    if (error) throw error

    return (
      <AppShell businesses={businesses}>
        <TasksClient tasks={tasks || []} businesses={businesses} />
      </AppShell>
    )
  } catch (error: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-zinc-950 text-red-500 font-mono">
        <h1 className="text-2xl font-bold mb-4">Tasks Server Error</h1>
        <p className="mb-4">The server crashed while fetching data from Supabase. Error details:</p>
        <div className="bg-red-950/50 p-6 rounded-lg text-left max-w-4xl overflow-auto border border-red-900 shadow-2xl">
          <pre>{error?.message || String(error)}</pre>
          <pre className="mt-4 text-xs opacity-70">{error?.stack}</pre>
        </div>
      </div>
    )
  }
}

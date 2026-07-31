// app/dashboard/page.tsx
// Server component — fetches all data at request time, zero client JS for data loading.

import { getDashboardStats, getCriticalTasks, getSessionLogs } from '@/lib/supabase/queries'
import { getBusinesses } from '@/lib/supabase/queries'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export const dynamic = 'force-dynamic' // Force dynamic rendering due to cookies usage

export default async function DashboardPage() {
  try {
    const [stats, criticalTasks, sessions, businesses] = await Promise.all([
      getDashboardStats(),
      getCriticalTasks(8),
      getSessionLogs(undefined, 5),
      getBusinesses(),
    ])

    return (
      <AppShell businesses={businesses}>
        <DashboardClient
          stats={stats}
          criticalTasks={criticalTasks}
          sessions={sessions}
          businesses={businesses}
        />
      </AppShell>
    )
  } catch (error: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-zinc-950 text-red-500 font-mono">
        <h1 className="text-2xl font-bold mb-4">Dashboard Server Error</h1>
        <p className="mb-4">The server crashed while fetching data from Supabase. Error details:</p>
        <div className="bg-red-950/50 p-6 rounded-lg text-left max-w-4xl overflow-auto border border-red-900 shadow-2xl">
          <pre>{error?.message || String(error)}</pre>
          <pre className="mt-4 text-xs opacity-70">{error?.stack}</pre>
        </div>
      </div>
    )
  }
}

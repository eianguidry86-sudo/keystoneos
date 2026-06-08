// app/dashboard/page.tsx
// Server component — fetches all data at request time, zero client JS for data loading.

import { getDashboardStats, getCriticalTasks, getSessionLogs } from '@/lib/supabase/queries'
import { getBusinesses } from '@/lib/supabase/queries'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export const revalidate = 30 // ISR: revalidate every 30 seconds

export default async function DashboardPage() {
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
}

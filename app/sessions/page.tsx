import { getBusinesses, getSessionLogs } from '@/lib/supabase/queries'
import { AppShell } from '@/components/layout/AppShell'
import { SessionCard } from '@/components/sessions/SessionCard'

export const dynamic = "force-dynamic"

export default async function SessionsPage() {
  const [businesses, sessions] = await Promise.all([
    getBusinesses(),
    getSessionLogs(undefined, 50)
  ])

  return (
    <AppShell businesses={businesses}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-fos-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-lg">
            ◎
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-fos-text">AI Sessions</h1>
            <p className="text-sm text-fos-text3 font-mono">Global continuity logs</p>
          </div>
        </div>
        
        <div className="grid gap-4">
          {sessions.length > 0 ? (
            sessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <div className="bg-fos-bg2 border border-fos-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-fos-text3">No sessions found.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}

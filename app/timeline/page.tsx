import { getBusinesses } from '@/lib/supabase/queries'
import { AppShell } from '@/components/layout/AppShell'

export const dynamic = "force-dynamic"

export default async function TimelinePage() {
  const businesses = await getBusinesses()

  return (
    <AppShell businesses={businesses}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-fos-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fos-accent to-fos-accent2 flex items-center justify-center text-white text-lg shadow-lg">
            ⟶
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-fos-text">Master Timeline</h1>
            <p className="text-sm text-fos-text3 font-mono">Global view across all ventures</p>
          </div>
        </div>
        
        <div className="bg-fos-bg2 border border-fos-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-4xl mb-4 opacity-50">⏳</div>
          <h2 className="text-lg font-bold mb-2">Timeline Coming Soon</h2>
          <p className="text-sm text-fos-text3 max-w-md">
            The global timeline view is currently under construction. Soon you'll be able to see a unified view of all tasks, milestones, and events across your ventures.
          </p>
        </div>
      </div>
    </AppShell>
  )
}

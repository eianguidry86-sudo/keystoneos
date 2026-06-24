import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AppShell } from '@/components/layout/AppShell'
import { SessionCard } from '@/components/sessions/SessionCard'
import { getSessionLogs } from '@/lib/supabase/queries'

export const dynamic = "force-dynamic"

export default async function BusinessSessionsPage({
  params,
}: {
  params: { businessId: string }
}) {
  const supabase = createServerComponentClient({ cookies })

  const { data: biz } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', params.businessId)
    .single()
  
  if (!biz) notFound()

  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .eq('is_active', true)

  const sessions = await getSessionLogs(biz.id, 50)

  return (
    <AppShell businesses={businesses ?? []}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-fos-border pb-4">
          <div className="text-3xl">{biz.icon}</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-fos-text">{biz.name} Sessions</h1>
            <p className="text-sm text-fos-text3 font-mono">Continuity logs for this venture</p>
          </div>
        </div>
        
        <div className="grid gap-4">
          {sessions.length > 0 ? (
            sessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <div className="bg-fos-bg2 border border-fos-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-fos-text3">No sessions logged for {biz.name} yet.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}

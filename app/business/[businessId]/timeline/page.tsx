import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AppShell } from '@/components/layout/AppShell'

export const dynamic = "force-dynamic"

export default async function BusinessTimelinePage({
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

  return (
    <AppShell businesses={businesses ?? []}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-fos-border pb-4">
          <div className="text-3xl">{biz.icon}</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-fos-text">{biz.name} Timeline</h1>
            <p className="text-sm text-fos-text3 font-mono">Project timeline and milestones</p>
          </div>
        </div>
        
        <div className="bg-fos-bg2 border border-fos-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-4xl mb-4 opacity-50" style={{ color: biz.color }}>📅</div>
          <h2 className="text-lg font-bold mb-2">Timeline View</h2>
          <p className="text-sm text-fos-text3 max-w-md">
            The timeline view for {biz.name} is currently under construction.
          </p>
        </div>
      </div>
    </AppShell>
  )
}

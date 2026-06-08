import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AppShell } from '@/components/layout/AppShell'
import { OpsPageClient } from '@/components/dashboard/OpsPageClient'

export const dynamic = "force-dynamic"

export default async function BackendOpsPage({
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
  
  console.log('PARAMS:', params.businessId)
  console.log('BIZ FOUND:', biz)

  if (!biz) notFound()

  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .eq('is_active', true)

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', biz.id)
    .eq('module', 'backend')
    .order('sort_order')

  const categoryIds = (categories ?? []).map((c: any) => c.id)

  const { data: tasks } = categoryIds.length > 0
    ? await supabase
        .from('tasks')
        .select('*')
        .in('category_id', categoryIds)
        .eq('is_hidden', false)
        .order('sort_order')
    : { data: [] }

  const { data: latestSession } = await supabase
    .from('session_logs')
    .select('*, business:businesses(name, slug, color, icon)')
    .eq('business_id', biz.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const categoriesWithTasks = (categories ?? []).map((cat: any) => ({
    ...cat,
    tasks: (tasks ?? []).filter((t: any) => t.category_id === cat.id),
  }))

  return (
    <AppShell businesses={businesses ?? []}>
      <OpsPageClient
        business={biz}
        categories={categoriesWithTasks}
        module="backend"
        latestSession={latestSession ?? null}
      />
    </AppShell>
  )
}
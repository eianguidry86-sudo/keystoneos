import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AppShell } from '@/components/layout/AppShell'
import { ResourcesClient } from '@/components/resources/ResourcesClient'

export const dynamic = "force-dynamic"

export default async function ResourcesPage({
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

  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .eq('business_id', biz.id)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <AppShell businesses={businesses ?? []}>
      <ResourcesClient business={biz} resources={resources ?? []} />
    </AppShell>
  )
}
import { getBusinesses } from '@/lib/supabase/queries'
import { AppShell } from '@/components/layout/AppShell'
import { SettingsClient } from '@/components/settings/SettingsClient'

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  const businesses = await getBusinesses()

  return (
    <AppShell businesses={businesses}>
      <SettingsClient businesses={businesses} />
    </AppShell>
  )
}

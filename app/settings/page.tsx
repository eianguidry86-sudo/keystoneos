import { getBusinesses } from '@/lib/supabase/queries'
import { AppShell } from '@/components/layout/AppShell'

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  const businesses = await getBusinesses()

  return (
    <AppShell businesses={businesses}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-fos-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-fos-bg3 border border-fos-border flex items-center justify-center text-fos-text text-lg shadow-sm">
            ⚙
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-fos-text">Settings</h1>
            <p className="text-sm text-fos-text3 font-mono">System configuration and preferences</p>
          </div>
        </div>
        
        <div className="bg-fos-bg2 border border-fos-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="text-4xl mb-4 opacity-50">🛠️</div>
          <h2 className="text-lg font-bold mb-2">Settings Hub</h2>
          <p className="text-sm text-fos-text3 max-w-md">
            System configuration modules are being assembled. Check back later to manage your account and workspace preferences.
          </p>
        </div>
      </div>
    </AppShell>
  )
}

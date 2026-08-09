import { getBusinesses } from '@/lib/supabase/queries'
import { AppShell } from '@/components/layout/AppShell'
import { ResourcesClient } from '@/components/resources/ResourcesClient'

export const dynamic = "force-dynamic"

export default async function ResourcesPage() {
  try {
    const businesses = await getBusinesses()
    
    // We could fetch dynamic resources here if available globally
    const resources = []

    return (
      <AppShell businesses={businesses}>
        <ResourcesClient businesses={businesses} resources={resources} />
      </AppShell>
    )
  } catch (error: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-zinc-950 text-red-500 font-mono">
        <h1 className="text-2xl font-bold mb-4">Resources Server Error</h1>
        <p className="mb-4">The server crashed while fetching data from Supabase. Error details:</p>
        <div className="bg-red-950/50 p-6 rounded-lg text-left max-w-4xl overflow-auto border border-red-900 shadow-2xl">
          <pre>{error?.message || String(error)}</pre>
          <pre className="mt-4 text-xs opacity-70">{error?.stack}</pre>
        </div>
      </div>
    )
  }
}

'use client'

import type { Business, SessionLog } from '@/types'

interface SessionsClientProps {
  businesses: Business[]
  sessions: SessionLog[]
}

export function SessionsClient({ businesses, sessions }: SessionsClientProps) {
  const latestSession = sessions[0]

  return (
    <div className="h-full w-full pb-24 md:pb-0">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-white/5 px-lg py-md flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Session Logs</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage and review your AI execution history.</p>
        </div>

        <div className="flex items-center gap-sm">
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>
            <input className="w-full pl-10 pr-4 py-2 rounded-lg glass-input font-body-md text-body-md" placeholder="Search sessions..." type="text" />
          </div>
          <button className="btn-secondary p-2 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span>
          </button>
        </div>
      </div>
      <div className="p-lg md:p-xl max-w-container-max mx-auto space-y-lg">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          
          <div className="glass-panel-alt glass-panel-interactive col-span-1 md:col-span-2 p-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-sm">
                <span className="font-label-md text-label-md text-primary uppercase tracking-wider">Latest Execution</span>
                <div className="flex items-center gap-2">
                  <div className="status-dot-active"></div>
                  <span className="font-label-sm text-label-sm text-secondary-fixed-dim">
                    {latestSession ? `Completed ${new Date(latestSession.created_at).toLocaleDateString()}` : 'No recent sessions'}
                  </span>
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">
                {latestSession?.business?.name || 'General Workspace'}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-md">
                {latestSession?.summary || 'No recent session data available. Start a new session to see details here.'}
              </p>
              <div className="flex gap-sm mb-lg">
                <span className="px-2 py-1 rounded-md bg-secondary-container/10 border border-secondary-container/30 font-label-md text-label-md text-secondary uppercase">
                  {latestSession?.ai_source || 'AI'}
                </span>
                <span className="px-2 py-1 rounded-md bg-tertiary-container/10 border border-tertiary-container/30 font-label-md text-label-md text-tertiary">
                  Standard Execution
                </span>
              </div>
            </div>
            <div className="flex gap-md">
              <button className="btn-primary px-4 py-2 rounded-lg font-label-md text-label-md">View Details</button>
              <button className="btn-secondary px-4 py-2 rounded-lg font-label-md text-label-md">Resume Context</button>
            </div>
          </div>

          <div className="glass-panel-alt p-lg flex flex-col justify-between">
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-tertiary" data-icon="analytics">analytics</span>
              <h3 className="font-body-lg text-body-lg text-on-surface font-medium">Continuity Stats</h3>
            </div>
            <div className="space-y-md">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Total Sessions (30d)</p>
                <p className="font-display-lg text-display-lg text-on-surface">{sessions.length}</p>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2 mb-1">
                <div className="bg-gradient-to-r from-primary to-tertiary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant flex justify-between">
                <span>Resource Quota</span>
                <span>65% Used</span>
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel-alt overflow-hidden">
          <div className="px-lg py-md border-b border-white/5 bg-surface-container-lowest/50 flex justify-between items-center">
            <h3 className="font-body-lg text-body-lg text-on-surface font-medium">Session History</h3>
            <button className="text-primary font-label-md text-label-md hover:underline">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-low/30">
                  <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant font-medium">Session Name</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant font-medium">Model</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant font-medium">Date/Time</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant font-medium">Outcome</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-white/5">
                {sessions.map(session => (
                  <tr key={session.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm text-on-surface font-medium">
                        <span className="material-symbols-outlined text-primary text-sm" data-icon="terminal">terminal</span>
                        {session.business?.name || 'General Session'}
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <span className="px-2 py-1 rounded-md bg-surface-bright border border-outline-variant font-label-sm text-label-sm text-on-surface-variant uppercase">
                        {session.ai_source || 'AI'}
                      </span>
                    </td>
                    <td className="px-lg py-md text-on-surface-variant text-sm">
                      {new Date(session.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-lg py-md text-on-surface-variant truncate max-w-xs">
                      {session.summary}
                    </td>
                    <td className="px-lg py-md text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-md text-on-surface-variant" title="View Details">
                        <span className="material-symbols-outlined text-sm" data-icon="visibility">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-lg py-md text-center text-on-surface-variant">No sessions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

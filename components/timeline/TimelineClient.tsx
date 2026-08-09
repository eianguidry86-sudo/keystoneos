'use client'

import type { BusinessWithStats, Task, SessionLog } from '@/types'
import { getBusinessLogo } from '@/lib/utils'

interface TimelineClientProps {
  businesses: BusinessWithStats[]
  tasks: Task[]
  sessions: SessionLog[]
}

export function TimelineClient({ businesses, tasks, sessions }: TimelineClientProps) {
  // We'll show up to 4 businesses in the Bento
  const activeBusinesses = businesses.slice(0, 4)

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-lg h-full pt-4 md:pt-8 px-4 md:px-lg pb-24 md:pb-lg">
      {/* High Level Overview: Active Ventures Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md shrink-0">
        {activeBusinesses.map((business, index) => {
          const colors = [
            'bg-blue-500/20 border-blue-500/30 text-blue-400',
            'bg-purple-500/20 border-purple-500/30 text-purple-400',
            'bg-indigo-500/20 border-indigo-500/30 text-indigo-400'
          ]
          const barColors = ['bg-blue-400', 'bg-purple-400', 'bg-indigo-400']
          const colorClass = colors[index % colors.length]
          const barColorClass = barColors[index % barColors.length]
          
          const progress = business.task_total > 0 
            ? Math.round((business.task_completed / business.task_total) * 100)
            : 0

          let statusLabel = 'On Track'
          let statusClass = 'text-secondary bg-secondary/10'
          if (progress < 50 && business.task_total > 0) {
            statusLabel = 'At Risk'
            statusClass = 'text-yellow-400 bg-yellow-400/10'
          }

          return (
            <div key={business.id} className="bg-glass-card p-md rounded-xl flex flex-col gap-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-sm">
                  <div className={`w-8 h-8 rounded flex items-center justify-center border ${colorClass} overflow-hidden`}>
                    {getBusinessLogo(business.name) ? (
                      <img src={getBusinessLogo(business.name)!} alt={`${business.name} Logo`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">{business.icon || 'domain'}</span>
                    )}
                  </div>
                  <h3 className="font-body-lg text-on-surface font-semibold">{business.name}</h3>
                </div>
                <span className={`font-label-md px-2 py-1 rounded ${statusClass}`}>{statusLabel}</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1 text-on-surface-variant">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${barColorClass}`} style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Main Timeline / Kanban Hybrid Area */}
      <div className="flex flex-col lg:flex-row gap-md flex-1 min-h-0">
        
        {/* Timeline/Milestones (Main Area) */}
        <section className="flex-1 bg-glass p-md rounded-xl flex flex-col min-h-[500px] border-t border-white/10">
          <div className="flex justify-between items-center mb-md shrink-0">
            <h2 className="font-headline-md text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined">flag</span> Key Milestones
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md text-sm border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">filter_list</span> Filter
              </button>
              <button className="px-3 py-1.5 rounded-md text-sm bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">add</span> New
              </button>
            </div>
          </div>
          
          {/* Vertical Timeline Container */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/20 before:via-white/10 before:to-transparent scrollbar-hide">
            
            {tasks.map((task, idx) => {
              const isActive = idx === 0
              return (
                <div key={task.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isActive ? 'is-active' : ''}`}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                    {isActive ? (
                      <div className="status-dot pulsing bg-secondary"></div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    )}
                  </div>
                  
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-md rounded-xl ${isActive ? 'bg-glass-active' : 'bg-glass-card opacity-70 hover:opacity-100 transition-opacity'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-2 items-center">
                        <span className={`font-label-md px-2 py-0.5 rounded border ${isActive ? 'text-primary bg-primary/10 border-primary/20' : 'text-purple-400 bg-purple-400/10 border-purple-400/20'}`}>
                          {task.category?.name || 'Task'}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          {task.due_date ? `Due ${new Date(task.due_date).toLocaleDateString()}` : 'No deadline'}
                        </span>
                      </div>
                      <button className="text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">more_horiz</span></button>
                    </div>
                    
                    <h4 className="font-body-lg font-semibold mb-1 text-on-surface">{task.title}</h4>
                    <p className="text-sm text-on-surface-variant/80 mb-3 line-clamp-2">
                      {task.description || 'No description available for this task.'}
                    </p>
                    
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <div className="flex -space-x-2">
                        {/* Fake avatars for the UI mock */}
                        <div className="w-6 h-6 rounded-full border border-surface bg-black/50 flex items-center justify-center text-[10px] text-white/50">
                          {task.priority.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-on-surface-variant text-xs">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_box</span> 
                          {task.completion_percent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Sidebar Widgets */}
        <aside className="w-full lg:w-80 flex flex-col gap-md shrink-0">
          
          {/* Upcoming Deadlines */}
          <div className="bg-glass-card rounded-xl p-md">
            <h3 className="font-body-lg font-semibold text-on-surface mb-md flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="material-symbols-outlined text-[18px] text-yellow-400">warning</span> Upcoming Deadlines
            </h3>
            <div className="flex flex-col gap-3">
              {tasks.filter(t => t.due_date).slice(0, 3).map(task => {
                const date = new Date(task.due_date!)
                const month = date.toLocaleString('default', { month: 'short' })
                const day = date.getDate().toString().padStart(2, '0')
                
                return (
                  <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] uppercase text-red-400 font-bold leading-none">{month}</span>
                      <span className="text-sm text-on-surface font-bold">{day}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-on-surface truncate max-w-[180px]">{task.title}</h4>
                      <p className="text-xs text-on-surface-variant">{task.category?.name || 'General'}</p>
                    </div>
                  </div>
                )
              })}
              {tasks.filter(t => t.due_date).length === 0 && (
                <p className="text-sm text-on-surface-variant">No upcoming deadlines.</p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-glass-card rounded-xl p-md flex-1">
            <h3 className="font-body-lg font-semibold text-on-surface mb-md flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="material-symbols-outlined text-[18px]">history</span> Recent Activity
            </h3>
            <div className="flex flex-col gap-4">
              {sessions.slice(0, 4).map((session, idx) => {
                const isLast = idx === sessions.length - 1 || idx === 3
                return (
                  <div key={session.id} className={`flex gap-3 relative ${!isLast ? 'before:absolute before:left-[11px] before:top-6 before:bottom-[-16px] before:w-px before:bg-white/10' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0 z-10">
                      <span className="material-symbols-outlined text-[12px] text-secondary">
                        {session.ai_source === 'claude' ? 'smart_toy' : 'check'}
                      </span>
                    </div>
                    <div className="text-sm overflow-hidden">
                      <span className="text-on-surface font-medium capitalize">{session.ai_source}</span> session <span className="text-primary cursor-pointer hover:underline truncate inline-block max-w-[200px] align-bottom">{session.summary}</span>
                      <div className="text-xs text-on-surface-variant mt-0.5">{new Date(session.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
        </aside>
      </div>
    </div>
  )
}

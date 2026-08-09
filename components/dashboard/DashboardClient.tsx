'use client'

import Link from 'next/link'
import type { DashboardStats, Task, SessionLog, Business } from '@/types'
import { useState } from 'react'

interface DashboardClientProps {
  stats: DashboardStats
  criticalTasks: Task[]
  sessions: SessionLog[]
  businesses: Business[]
}

export function DashboardClient({
  stats,
  criticalTasks,
  sessions,
  businesses,
}: DashboardClientProps) {

  const todoTasks = criticalTasks.filter(t => !t.status || t.status === 'not_started')
  const inProgressTasks = criticalTasks.filter(t => t.status === 'in_progress')
  const completedTasks = criticalTasks.filter(t => t.status === 'completed')

  return (
    <div className="flex flex-col xl:flex-row gap-lg p-4 md:p-lg h-full w-full">
      <div className="flex-1 flex flex-col gap-lg min-w-0">
        <div className="glass-panel p-md md:p-lg rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Kanban Board: Product Roadmap</h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-secondary animate-pulse">check_circle</span>
              AI Summary: You have {criticalTasks.length} critical tasks pending review across {businesses.length} ventures.
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full bg-surface-container-lowest border border-white/10 rounded-full py-2 pl-10 pr-4 font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" placeholder="Search tasks..." type="text" />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-md overflow-x-auto pb-4">
          
          {/* To Do Column */}
          <div className="kanban-col p-sm flex flex-col gap-sm min-w-[280px]">
            <div className="flex justify-between items-center p-sm border-b border-white/5 mb-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">list_alt</span>
                <h3 className="font-headline-md text-headline-md text-on-surface text-lg">To Do</h3>
                <span className="bg-surface-variant text-on-surface-variant font-label-sm px-2 py-0.5 rounded-full">{todoTasks.length}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer">more_horiz</span>
            </div>
            <button className="w-full py-2 border border-dashed border-white/20 rounded-lg text-on-surface-variant font-body-md flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/40 transition-all">
              <span className="material-symbols-outlined text-sm">add</span> Add Task
            </button>
            {todoTasks.map(task => <KanbanTaskCard key={task.id} task={task} />)}
          </div>

          {/* In Progress Column */}
          <div className="kanban-col p-sm flex flex-col gap-sm min-w-[280px]">
            <div className="flex justify-between items-center p-sm border-b border-white/5 mb-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">schedule</span>
                <h3 className="font-headline-md text-headline-md text-on-surface text-lg">In Progress</h3>
                <span className="bg-surface-variant text-on-surface-variant font-label-sm px-2 py-0.5 rounded-full">{inProgressTasks.length}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer">more_horiz</span>
            </div>
            <button className="w-full py-2 border border-dashed border-white/20 rounded-lg text-on-surface-variant font-body-md flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/40 transition-all">
              <span className="material-symbols-outlined text-sm">add</span> Add Task
            </button>
            {inProgressTasks.map(task => <KanbanTaskCard key={task.id} task={task} active />)}
          </div>

          {/* Completed Column */}
          <div className="kanban-col p-sm flex flex-col gap-sm min-w-[280px]">
            <div className="flex justify-between items-center p-sm border-b border-white/5 mb-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-400">task_alt</span>
                <h3 className="font-headline-md text-headline-md text-on-surface text-lg opacity-80">Completed</h3>
                <span className="bg-surface-variant text-on-surface-variant font-label-sm px-2 py-0.5 rounded-full">{completedTasks.length}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer">more_horiz</span>
            </div>
            {completedTasks.map(task => <KanbanTaskCard key={task.id} task={task} completed />)}
          </div>
        </div>
      </div>

      {/* Right Utility Panel */}
      <aside className="w-full xl:w-80 flex flex-col gap-lg min-w-[320px]">
        <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-surface-container/50">
            <h3 className="font-headline-md text-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Overview
            </h3>
          </div>
          <div className="p-4 flex-1 text-sm text-on-surface-variant font-body-md bg-surface-container-low/50 overflow-y-auto max-h-[300px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Total Tasks</span>
                <span className="text-on-surface font-bold">{stats.total_tasks}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Completed</span>
                <span className="text-green-400 font-bold">{stats.completed_tasks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Blocked</span>
                <span className="text-amber-400 font-bold">{stats.blocked_tasks}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 flex flex-col gap-md">
          <h3 className="font-headline-md text-lg text-on-surface flex items-center gap-2 border-b border-white/10 pb-2">
            <span className="material-symbols-outlined text-tertiary">history</span>
            Recent Sessions
          </h3>
          <div className="flex flex-col gap-3">
            {sessions.slice(0, 4).map(session => (
              <div key={session.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1">
                  <span className="material-symbols-outlined text-sm">stream</span>
                </div>
                <div>
                  <p className="font-body-md text-sm text-on-surface truncate">{session.summary || 'General Session'}</p>
                  <p className="font-label-sm text-xs text-on-surface-variant mt-1">{new Date(session.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

function KanbanTaskCard({ task, active, completed }: { task: Task, active?: boolean, completed?: boolean }) {
  let cardClass = "glass-panel-card p-md cursor-grab active:cursor-grabbing"
  if (active) cardClass += " glow-active relative overflow-hidden"
  if (completed) cardClass += " opacity-60 hover:opacity-100 transition-opacity"

  return (
    <div className={cardClass}>
      {active && <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>}
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-headline-md text-base text-on-surface font-semibold ${completed ? 'line-through' : ''}`}>
          {task.title}
        </h4>
        <span className="material-symbols-outlined text-on-surface-variant text-sm">more_horiz</span>
      </div>
      <div className="flex gap-2 mb-3">
        {task.category && (
          <span className="font-label-sm px-2 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-200 uppercase">
            {task.category.name}
          </span>
        )}
        {task.priority === 'critical' && (
          <span className="font-label-sm px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-200 uppercase">
            Critical
          </span>
        )}
      </div>
      <div className="flex justify-between items-center text-on-surface-variant font-body-md text-xs">
        <div className="flex items-center gap-1">
          {completed ? (
            <>
              <span className="material-symbols-outlined text-[14px] text-green-400">check</span>
              {task.updated_at ? new Date(task.updated_at).toLocaleDateString() : 'Done'}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
              Details
            </>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import type { Task, Business } from '@/types'

interface TasksClientProps {
  tasks: Task[]
  businesses: Business[]
}

export function TasksClient({ tasks, businesses }: TasksClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const todoTasks = filteredTasks.filter(t => t.status === 'not_started' || t.status === 'blocked')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in_progress')
  const completedTasks = filteredTasks.filter(t => t.status === 'completed')

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <header className="flex justify-between items-center px-lg w-full h-16 shrink-0 bg-surface-dim/50 backdrop-blur-md border-b border-white/5 z-40">
        <div className="flex items-center gap-md">
          <button className="md:hidden text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-sm">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Task Management: Master View</h1>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-1.5 border border-white/5 focus-within:border-primary/50 focus-within:shadow-[inset_0_0_8px_rgba(99,102,241,0.1)] transition-all">
            <input 
              className="bg-transparent border-none text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 w-48 outline-none" 
              placeholder="Search tasks..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined text-on-surface-variant/70 text-sm">search</span>
          </div>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-white/5 rounded-full">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              K
            </div>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto p-lg pt-xl flex gap-gutter">
        {/* Column 1: To Do */}
        <div className="glass-panel rounded-xl flex flex-col w-[340px] shrink-0 max-h-full">
          <div className="p-md flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
                <span className="material-symbols-outlined text-lg" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>list_alt</span>
              </div>
              <h2 className="font-headline-md text-[18px] font-semibold text-on-surface">To Do</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-white/5 px-2 py-1 rounded-md">{todoTasks.length}</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="px-md py-sm">
            <button className="w-full py-2 flex items-center justify-center gap-sm rounded-lg border border-white/5 text-on-surface-variant font-body-md text-body-md hover:border-primary/30 hover:text-primary hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Add Task
            </button>
          </div>
          <div className="flex-1 overflow-y-auto kanban-col-scroll p-md flex flex-col gap-sm pt-0">
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="glass-panel rounded-xl flex flex-col w-[340px] shrink-0 max-h-full">
          <div className="p-md flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-lg" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
              </div>
              <h2 className="font-headline-md text-[18px] font-semibold text-on-surface">In Progress</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-white/5 px-2 py-1 rounded-md">{inProgressTasks.length}</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="px-md py-sm">
            <button className="w-full py-2 flex items-center justify-center gap-sm rounded-lg border border-white/5 text-on-surface-variant font-body-md text-body-md hover:border-primary/30 hover:text-primary hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Add Task
            </button>
          </div>
          <div className="flex-1 overflow-y-auto kanban-col-scroll p-md flex flex-col gap-sm pt-0">
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} isActive />
            ))}
          </div>
        </div>

        {/* Column 3: Completed */}
        <div className="glass-panel rounded-xl flex flex-col w-[340px] shrink-0 max-h-full opacity-80">
          <div className="p-md flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary-container flex items-center justify-center border border-secondary-container/30">
                <span className="material-symbols-outlined text-lg" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h2 className="font-headline-md text-[18px] font-semibold text-on-surface">Completed</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-white/5 px-2 py-1 rounded-md">{completedTasks.length}</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="px-md py-sm">
            <button className="w-full py-2 flex items-center justify-center gap-sm rounded-lg border border-white/5 text-on-surface-variant font-body-md text-body-md hover:border-primary/30 hover:text-primary hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Add Task
            </button>
          </div>
          <div className="flex-1 overflow-y-auto kanban-col-scroll p-md flex flex-col gap-sm pt-0">
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} isCompleted />
            ))}
          </div>
        </div>

        <div className="w-4 shrink-0"></div>
      </div>
    </div>
  )
}

function TaskCard({ task, isActive, isCompleted }: { task: Task, isActive?: boolean, isCompleted?: boolean }) {
  let cardClass = "kanban-card rounded-lg p-md cursor-pointer flex flex-col gap-sm"
  if (isActive) cardClass += " active-focus"

  return (
    <div className={cardClass}>
      <div className="flex justify-between items-start">
        <h3 className={`font-body-lg text-body-lg font-semibold text-on-surface leading-tight ${isCompleted ? 'line-through decoration-white/20 text-on-surface/70' : ''}`}>
          {task.title}
        </h3>
        <button className="text-on-surface-variant/50 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-sm">more_horiz</span>
        </button>
      </div>
      
      <div className="flex items-center gap-xs mt-1">
        {task.category && (
          <span className="font-label-sm text-label-sm text-secondary bg-secondary/10 border border-secondary/30 px-2 py-0.5 rounded">
            {task.category.name}
          </span>
        )}
        {task.priority === 'critical' && (
          <span className="font-label-sm text-label-sm text-error bg-error/10 border border-error/30 px-2 py-0.5 rounded">
            Critical
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-on-surface-variant/70 font-label-md text-label-md">
        <div className="flex items-center gap-1">
          {isCompleted ? (
            <>
              <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
              <span className="text-secondary">{task.updated_at ? new Date(task.updated_at).toLocaleDateString() : 'Done'}</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
              <span>Details</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {task.due_date && <span className="text-xs">Due {new Date(task.due_date).toLocaleDateString()}</span>}
        </div>
      </div>
    </div>
  )
}

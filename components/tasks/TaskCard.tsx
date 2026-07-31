'use client'
// components/tasks/TaskCard.tsx
// Displays a single task row with status, priority, and inline check-off.

import { useState, useTransition } from 'react'
import { cn, STATUS_COLORS, STATUS_LABELS, PRIORITY_COLORS, PRIORITY_LABELS, PRIORITY_DOT } from '@/lib/utils'
import { useStore } from '@/lib/hooks/useStore'
import type { Task, TaskStatus } from '@/types'

interface TaskCardProps {
  task: Task
  onStatusChange?: (id: string, status: TaskStatus) => Promise<void>
  showCategory?: boolean
  compact?: boolean
}

export function TaskCard({ task, onStatusChange, showCategory, compact }: TaskCardProps) {
  const { setEditingTask, taskOverrides } = useStore()
  const [isPending, startTransition] = useTransition()

  // Merge optimistic overrides
  const display = { ...task, ...taskOverrides[task.id] }
  const isCompleted = display.status === 'completed'

  const handleCheck = () => {
    if (!onStatusChange) return
    const next: TaskStatus = isCompleted ? 'in_progress' : 'completed'
    startTransition(() => onStatusChange(task.id, next))
  }

  const formatSchedule = (start: string | null, end: string | null) => {
    if (!start || !end) return null
    const s = new Date(start)
    const e = new Date(end)
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' }
    return `${s.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${s.toLocaleTimeString(undefined, timeOptions)} - ${e.toLocaleTimeString(undefined, timeOptions)}`
  }
  const scheduleText = formatSchedule(display.scheduled_start, display.scheduled_end)

  return (
    <div
      className={cn(
        'flex items-start gap-3 border-b border-fos-border last:border-none',
        compact ? 'py-2.5' : 'py-3',
        'hover:bg-fos-bg3/30 -mx-3 px-3 rounded-lg transition-colors cursor-pointer group'
      )}
      onClick={() => setEditingTask(task)}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => { e.stopPropagation(); handleCheck() }}
        disabled={isPending}
        className={cn(
          'mt-0.5 w-4 h-4 rounded flex-shrink-0 border-[1.5px] flex items-center justify-center transition-all',
          isCompleted
            ? 'bg-green-400 border-green-400'
            : 'border-fos-border2 hover:border-fos-accent'
        )}
      >
        {isCompleted && <span className="text-[9px] font-bold text-white">✓</span>}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-sm font-medium leading-snug',
          isCompleted ? 'text-fos-text3 line-through' : 'text-fos-text'
        )}>
          {display.title}
        </p>

        {!compact && (
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {/* Priority dot */}
            <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', PRIORITY_DOT[display.priority])} />

            {showCategory && display.category && (
              <span className="text-[10px] font-mono text-fos-text3">
                {display.category.name}
              </span>
            )}

            {display.current_blocker && (
              <span className="text-[10px] font-mono text-red-400">
                ⚠ {display.current_blocker.slice(0, 40)}
              </span>
            )}

            {display.due_date && (
              <span className="text-[10px] font-mono text-fos-text3">
                Due {display.due_date}
              </span>
            )}

            {scheduleText && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fos-bg3 text-fos-text2 border border-fos-border flex items-center gap-1">
                🗓 {scheduleText}
              </span>
            )}

            {display.task_context && display.task_context !== 'general' && (
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {display.task_context.replace('_', ' ')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Badge className={PRIORITY_COLORS[display.priority]}>
          {PRIORITY_LABELS[display.priority]}
        </Badge>
        <Badge className={STATUS_COLORS[display.status]}>
          {STATUS_LABELS[display.status]}
        </Badge>
      </div>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border',
      className
    )}>
      {children}
    </span>
  )
}

// ─── Task List (category group) ─────────────────

interface TaskListProps {
  categoryName: string
  tasks: Task[]
  onStatusChange?: (id: string, status: TaskStatus) => Promise<void>
  onAddTask?: (categoryId: string) => void
  categoryId?: string
}

export function TaskList({ categoryName, tasks, onStatusChange, onAddTask, categoryId }: TaskListProps) {
  const [collapsed, setCollapsed] = useState(false)
  const completedCount = tasks.filter((t) => t.status === 'completed').length

  return (
    <div className="mb-7">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-fos-text3 hover:text-fos-text2 transition-colors"
        >
          <span className="text-[10px]">{collapsed ? '▶' : '▼'}</span>
          {categoryName}
        </button>
        <div className="flex-1 h-px bg-fos-border" />
        <span className="text-[10px] font-mono text-fos-text3">
          {completedCount}/{tasks.length}
        </span>
        {onAddTask && categoryId && (
          <button
            onClick={() => onAddTask(categoryId)}
            className="text-[10px] text-fos-text3 hover:text-fos-accent transition-colors font-mono"
          >
            + Add
          </button>
        )}
      </div>

      {/* Tasks */}
      {!collapsed && (
        <div>
          {tasks.length === 0 ? (
            <p className="text-xs text-fos-text3 font-mono py-2 px-3">No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

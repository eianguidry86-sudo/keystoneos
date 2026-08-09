'use client'
// components/dashboard/OpsPageClient.tsx
// Renders the full Backend Ops or Product Dev page for a business.

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { getBusinessLogo } from '@/lib/utils'
import { DominoBar } from '@/components/ui/DominoBar'
import { TaskList } from '@/components/tasks/TaskCard'
import { SessionCard } from '@/components/sessions/SessionCard'
import { useStore } from '@/lib/hooks/useStore'
import { calcCompletion, cn } from '@/lib/utils'
import type {
  Business,
  CategoryWithTasks,
  SessionLog,
  TaskStatus,
} from '@/types'

interface OpsPageClientProps {
  business: Business
  categories: CategoryWithTasks[]
  module: 'backend' | 'product'
  latestSession: SessionLog | null
}

export function OpsPageClient({
  business,
  categories,
  module,
  latestSession,
}: OpsPageClientProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const { setNewTaskCategoryId, setNewTaskOpen, setTaskOverride } = useStore()

  const allTasks = categories.flatMap((c) => c.tasks)
  const overallPct = calcCompletion(allTasks)
  const completedCount = allTasks.filter((t) => t.status === 'completed').length
  const blockedCount = allTasks.filter((t) => t.status === 'blocked').length

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    // Optimistic update
    setTaskOverride(id, { status })

    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    startTransition(() => router.refresh())
  }

  const handleAddTask = (categoryId: string) => {
    setNewTaskCategoryId(categoryId)
    setNewTaskOpen(true)
  }

  const [isScheduling, setIsScheduling] = useState(false)
  const handleScheduleTasks = async () => {
    setIsScheduling(true)
    try {
      await fetch('/api/tasks/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_id: business.id })
      })
      startTransition(() => router.refresh())
    } catch (e) {
      console.error(e)
    } finally {
      setIsScheduling(false)
    }
  }

  return (
    <div className="max-w-[860px] space-y-6">

      {/* ── Header ──────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {getBusinessLogo(business.name) ? (
              <img src={getBusinessLogo(business.name)!} alt={`${business.name} Logo`} className="w-6 h-6 object-cover rounded-md" />
            ) : (
              <span className="text-lg">{business.icon}</span>
            )}
            <h1 className="text-lg font-bold">{business.name}</h1>
          </div>
          <p className="text-[11px] font-mono text-fos-text3">
            {module === 'backend' ? 'Backend Operations' : 'Product Development'} ·{' '}
            {completedCount}/{allTasks.length} tasks complete
            {blockedCount > 0 && ` · ${blockedCount} blocked`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleScheduleTasks}
            disabled={isScheduling}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-fos-accent/10 text-fos-accent border border-fos-accent/20 hover:bg-fos-accent/20 transition-colors disabled:opacity-50"
          >
            {isScheduling ? 'Scheduling...' : '🗓 Auto-Schedule'}
          </button>
          <span className={cn(
            'text-[11px] font-mono px-2.5 py-1.5 rounded-lg border',
            completedCount === allTasks.length && allTasks.length > 0
              ? 'text-green-400 bg-green-400/10 border-green-400/30'
              : 'text-fos-text3 bg-fos-bg3 border-fos-border'
          )}>
            {overallPct}% complete
          </span>
        </div>
      </div>

      {/* Overall progress bar */}
      <DominoBar
        percent={overallPct}
        label={module === 'backend' ? 'Operations Completion' : 'Product Completion'}
        segments={24}
      />

      {/* ── "Where I Left Off" panel ─ */}
      {latestSession && (
        <div
          className="rounded-xl p-5 border"
          style={{
            background: `${business.color}08`,
            borderColor: `${business.color}30`,
          }}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: business.color }}>
            📍 Where I Left Off
          </div>
          <SessionCard session={latestSession} />
        </div>
      )}

      {/* ── Category task lists ──────────────────── */}
      <div>
        {categories.map((cat) => (
          <TaskList
            key={cat.id}
            categoryName={cat.name}
            tasks={cat.tasks}
            onStatusChange={handleStatusChange}
            onAddTask={handleAddTask}
            categoryId={cat.id}
          />
        ))}
      </div>
    </div>
  )
}

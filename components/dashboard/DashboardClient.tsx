'use client'
// components/dashboard/DashboardClient.tsx
// All dashboard widgets assembled into the master command center.

import Link from 'next/link'
import { DominoBar, DominoStack } from '@/components/ui/DominoBar'
import { TaskCard } from '@/components/tasks/TaskCard'
import { SessionCard } from '@/components/sessions/SessionCard'
import { cn, timeAgo, PRIORITY_DOT } from '@/lib/utils'
import type { DashboardStats, Task, SessionLog, Business } from '@/types'

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
  const fundBiz = stats.businesses.find((b) => b.slug === 'fundamentals')
  const mmapBiz = stats.businesses.find((b) => b.slug === 'marketmap')

  return (
    <div className="space-y-6 max-w-[1400px]">

      {/* ── KPI ROW ─────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard
          label="Total Tasks"
          value={stats.total_tasks}
          sub={`across ${stats.businesses.length} ventures`}
        />
        <KpiCard
          label="Completed"
          value={stats.completed_tasks}
          sub={`${Math.round((stats.completed_tasks / Math.max(stats.total_tasks, 1)) * 100)}% completion rate`}
          valueClass="text-green-400"
        />
        <KpiCard
          label="Blocked"
          value={stats.blocked_tasks}
          sub="needs attention"
          valueClass={stats.blocked_tasks > 0 ? 'text-amber-400' : 'text-green-400'}
        />
        <KpiCard
          label="AI Sessions"
          value={stats.session_count}
          sub="continuity logs"
          valueClass="text-fos-accent"
        />
      </div>

      {/* ── BUSINESS CARDS ──────────────────────── */}
      <SectionLabel>Ventures</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {fundBiz && <BusinessCard biz={fundBiz} />}
        {mmapBiz && <BusinessCard biz={mmapBiz} />}
      </div>

      {/* ── CRITICAL TASKS + LAST SESSION ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Critical tasks (wider) */}
        <div className="lg:col-span-3 bg-fos-bg2 border border-fos-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>🔴 Critical & High Priority</SectionLabel>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-400/10 text-red-400 border border-red-400/30">
              {criticalTasks.filter((t) => t.priority === 'critical').length} critical
            </span>
          </div>
          {criticalTasks.map((task) => (
            <TaskCard key={task.id} task={task} showCategory compact />
          ))}
          {criticalTasks.length === 0 && (
            <p className="text-xs text-fos-text3 font-mono py-4 text-center">
              No critical tasks. 🎉
            </p>
          )}
        </div>

        {/* Last session (narrower) */}
        <div className="lg:col-span-2 bg-fos-bg2 border border-fos-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>◎ Latest Session</SectionLabel>
            <Link
              href="/sessions"
              className="text-[10px] font-mono text-fos-text3 hover:text-fos-accent transition-colors"
            >
              View all →
            </Link>
          </div>
          {sessions[0] ? (
            <SessionCard session={sessions[0]} compact />
          ) : (
            <p className="text-xs text-fos-text3 font-mono py-4">
              No sessions yet. Click "End Session" to log your first.
            </p>
          )}
        </div>
      </div>

      {/* ── PROGRESS OVERVIEW ───────────────────── */}
      <SectionLabel>Formation Progress</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {fundBiz && (
          <div className="bg-fos-bg2 border border-fos-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-bold text-fos-fund uppercase tracking-widest">🏀 FUNdamentals</div>
                <div className="text-[11px] font-mono text-fos-text3 mt-0.5">{fundBiz.task_completed}/{fundBiz.task_total} tasks</div>
              </div>
              <span className="text-[11px] font-mono px-2 py-1 rounded-lg bg-fos-accent/10 text-fos-accent border border-fos-accent/20">
                {fundBiz.overall_completion}% overall
              </span>
            </div>
            <DominoStack items={FUND_PROGRESS} />
          </div>
        )}
        {mmapBiz && (
          <div className="bg-fos-bg2 border border-fos-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-bold text-fos-mmap uppercase tracking-widest">📊 MarketMap</div>
                <div className="text-[11px] font-mono text-fos-text3 mt-0.5">{mmapBiz.task_completed}/{mmapBiz.task_total} tasks</div>
              </div>
              <span className="text-[11px] font-mono px-2 py-1 rounded-lg bg-teal-400/10 text-teal-400 border border-teal-400/20">
                {mmapBiz.overall_completion}% overall
              </span>
            </div>
            <DominoStack items={MMAP_PROGRESS} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Sub-components ────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string
  value: number
  sub: string
  valueClass?: string
}) {
  return (
    <div className="bg-fos-bg2 border border-fos-border rounded-xl p-5 hover:border-fos-border2 transition-colors">
      <div className="text-[11px] font-semibold uppercase tracking-widest text-fos-text3 mb-1">
        {label}
      </div>
      <div className={cn('text-3xl font-black tracking-tight leading-none mt-1', valueClass ?? 'text-fos-text')}>
        {value}
      </div>
      <div className="text-[11px] font-mono text-fos-text3 mt-1.5">{sub}</div>
    </div>
  )
}

function BusinessCard({ biz }: { biz: DashboardStats['businesses'][number] }) {
  const slug = biz.slug
  return (
    <Link
      href={`/business/${slug}/backend`}
      className="group block bg-fos-bg2 border border-fos-border rounded-xl p-5 hover:border-fos-border2 hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
        style={{ background: `linear-gradient(90deg, ${biz.color}, ${biz.color}80)` }}
      />

      <div className="flex items-start justify-between mt-1 mb-3">
        <div>
          <div className="text-xl mb-1">{biz.icon}</div>
          <div className="text-sm font-bold">{biz.name}</div>
          <div className="text-[11px] font-mono text-fos-text3 mt-0.5">
            {biz.task_completed}/{biz.task_total} tasks · {biz.task_blocked} blocked
          </div>
        </div>
        <div className="text-fos-text3 group-hover:text-fos-text transition-colors">→</div>
      </div>

      <DominoBar percent={biz.overall_completion} label="Overall" segments={20} />

      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] font-mono text-fos-text3">
          {biz.last_updated ? `Updated ${timeAgo(biz.last_updated)}` : 'No updates yet'}
        </span>
        {biz.latest_session && (
          <span className="text-[10px] font-mono text-fos-text3 truncate max-w-[200px]">
            Next: {biz.latest_session.recommended_action?.slice(0, 35)}…
          </span>
        )}
      </div>
    </Link>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-bold uppercase tracking-widest text-fos-text3">
        {children}
      </span>
      <div className="flex-1 h-px bg-fos-border" />
    </div>
  )
}

// Static progress data — in production these come from DB aggregates
const FUND_PROGRESS = [
  { label: 'Business Formation', percent: 20 },
  { label: 'Legal & Compliance',  percent: 15 },
  { label: 'Curriculum Dev',      percent: 40 },
  { label: 'Brand & Media',       percent: 60 },
  { label: 'Technology',          percent: 5  },
]

const MMAP_PROGRESS = [
  { label: 'Business Formation',  percent: 50 },
  { label: 'Legal & Compliance',  percent: 10 },
  { label: 'Data Infrastructure', percent: 15 },
  { label: 'AI Systems',          percent: 20 },
  { label: 'UX & Product',        percent: 25 },
]

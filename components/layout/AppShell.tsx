'use client'
// components/layout/AppShell.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/hooks/useStore'
import { EndSessionModal } from '@/components/sessions/EndSessionModal'
import { NewTaskModal } from '@/components/tasks/NewTaskModal'
import type { Business } from '@/types'

interface NavItem {
  label: string
  href: string
  icon: string
  badge?: string
}

const SHARED_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '⬡' },
  { label: 'Timeline',  href: '/timeline',  icon: '⟶' },
  { label: 'AI Sessions', href: '/sessions', icon: '◎' },
]

function bizNav(slug: string): NavItem[] {
  return [
    { label: 'Backend Ops',  href: `/business/${slug}/backend`,   icon: '⊞' },
    { label: 'Product Dev',  href: `/business/${slug}/product`,   icon: '◈' },
    { label: 'Resources',    href: `/business/${slug}/resources`,  icon: '⊟' },
    { label: 'Timeline',     href: `/business/${slug}/timeline`,   icon: '→' },
    { label: 'AI Sessions',  href: `/business/${slug}/sessions`,   icon: '◎' },
  ]
}

interface AppShellProps {
  businesses: Business[]
  children: React.ReactNode
}

export function AppShell({ businesses, children }: AppShellProps) {
  const pathname = usePathname()
  const { endSessionOpen, setEndSessionOpen, newTaskOpen, setNewTaskOpen } = useStore()
  const [collapsed, setCollapsed] = useState(false)

  const fundBiz = businesses.find((b) => b.slug === 'fundamentals')
  const mmapBiz = businesses.find((b) => b.slug === 'marketmap')
  const ksBiz = businesses.find((b) => b.slug === 'keystoneos')

  return (
    <div className="flex h-screen overflow-hidden bg-fos-bg">
      {/* ── SIDEBAR ────────────────────────────────── */}
      <aside
        className={cn(
          'flex flex-col border-r border-fos-border bg-fos-bg2 transition-all duration-200 overflow-y-auto flex-shrink-0',
          collapsed ? 'w-14' : 'w-[220px]'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-fos-border">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fos-accent to-fos-accent2 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            K⚙
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-bold tracking-tight">KeystoneOS</div>
              <div className="text-[10px] text-fos-text3 font-mono mt-0.5">2 ventures active</div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-fos-text3 hover:text-fos-text transition-colors text-xs"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Overview nav */}
        <NavSection label="Overview" collapsed={collapsed}>
          {SHARED_NAV.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} collapsed={collapsed} />
          ))}
        </NavSection>

        {/* FUNdamentals nav */}
        {fundBiz && (
          <NavSection label={collapsed ? '🏀' : 'FUNdamentals'} collapsed={collapsed}>
            {bizNav(fundBiz.slug).map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={pathname === item.href}
                collapsed={collapsed}
                dotColor={fundBiz.color}
              />
            ))}
          </NavSection>
        )}

        {/* MarketMap nav */}
        {mmapBiz && (
          <NavSection label={collapsed ? '📊' : 'MarketMap'} collapsed={collapsed}>
            {bizNav(mmapBiz.slug).map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={pathname === item.href}
                collapsed={collapsed}
                dotColor={mmapBiz.color}
              />
            ))}
          </NavSection>
        )}

        {/* KeystoneOS nav */}
        {ksBiz && (
          <NavSection label={collapsed ? '🔑' : 'KeystoneOS'} collapsed={collapsed}>
            {bizNav(ksBiz.slug).map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={pathname === item.href}
                collapsed={collapsed}
                dotColor={ksBiz.color}
              />
            ))}
          </NavSection>
        )}

        {/* Bottom actions */}
        <div className="mt-auto p-3 border-t border-fos-border space-y-1">
          <button
            onClick={() => setEndSessionOpen(true)}
            className={cn(
              'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium',
              'text-fos-accent hover:bg-fos-accent/10 transition-colors'
            )}
          >
            <span className="text-base">⊕</span>
            {!collapsed && 'End Session'}
          </button>
          <Link
            href="/settings"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-fos-text2 hover:bg-fos-bg3 hover:text-fos-text transition-colors"
          >
            <span>⚙</span>
            {!collapsed && 'Settings'}
          </Link>
        </div>
      </aside>

      {/* ── MAIN ───────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar onEndSession={() => setEndSessionOpen(true)} onNewTask={() => setNewTaskOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-7 animate-fade-in">
          {children}
        </main>
      </div>

      {/* ── MODALS ─────────────────────────────────── */}
      <EndSessionModal
        open={endSessionOpen}
        onClose={() => setEndSessionOpen(false)}
        businesses={businesses}
      />
      <NewTaskModal
        open={newTaskOpen}
        onClose={() => setNewTaskOpen(false)}
        businesses={businesses}
      />
    </div>
  )
}

// ─── Sub-components ────────────────────────────

function NavSection({
  label,
  children,
  collapsed,
}: {
  label: string
  children: React.ReactNode
  collapsed: boolean
}) {
  return (
    <div className="px-3 pt-4 pb-1">
      {!collapsed && (
        <div className="text-[10px] font-semibold tracking-widest text-fos-text3 uppercase px-2 pb-1.5">
          {label}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

function NavLink({
  item,
  active,
  collapsed,
  dotColor,
}: {
  item: NavItem
  active: boolean
  collapsed: boolean
  dotColor?: string
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors',
        active
          ? 'bg-fos-accent/15 text-fos-accent'
          : 'text-fos-text2 hover:bg-fos-bg3 hover:text-fos-text'
      )}
    >
      {dotColor ? (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: dotColor }}
        />
      ) : (
        <span className="text-base leading-none flex-shrink-0">{item.icon}</span>
      )}
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className={cn(
          'ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded',
          active ? 'bg-fos-accent/20 text-fos-accent' : 'bg-fos-bg4 text-fos-text3'
        )}>
          {item.badge}
        </span>
      )}
    </Link>
  )
}

function Topbar({
  onEndSession,
  onNewTask,
}: {
  onEndSession: () => void
  onNewTask: () => void
}) {
  const pathname = usePathname()
  const { availabilityStatus, setAvailabilityStatus, pendingReminders, setPendingReminders } = useStore()
  const [showReminders, setShowReminders] = useState(false)

  // Fetch reminders on mount
  useEffect(() => {
    fetch('/api/reminders')
      .then(r => r.json())
      .then(d => {
         if (d.reminders) setPendingReminders(d.reminders)
      })
      .catch(e => console.error(e))
  }, [setPendingReminders])

  const toggleAvailability = () => {
     setAvailabilityStatus(availabilityStatus === 'available' ? 'away' : 'available')
  }

  // Derive human-readable title from pathname
  const segments = pathname.split('/').filter(Boolean)
  const title = segments[segments.length - 1]
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase()) ?? 'Dashboard'

  return (
    <header className="h-14 flex items-center justify-between px-7 border-b border-fos-border bg-fos-bg2 flex-shrink-0 z-10 relative">
      <div>
        <h1 className="text-sm font-semibold text-fos-text capitalize">{title}</h1>
        <p className="text-[11px] font-mono text-fos-text3 mt-0.5">
          FounderOS / {segments.join(' / ') || 'Overview'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Availability Toggle */}
        <button
          onClick={toggleAvailability}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border",
            availabilityStatus === 'available' 
              ? "bg-green-400/10 text-green-400 border-green-400/20 hover:bg-green-400/20"
              : "bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20"
          )}
        >
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'currentColor' }} />
          {availabilityStatus === 'available' ? 'Available' : 'Away'}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowReminders(!showReminders)}
            className="relative p-1.5 rounded-lg text-fos-text2 hover:text-fos-text hover:bg-fos-bg3 transition-colors"
          >
            <span className="text-lg leading-none">🔔</span>
            {pendingReminders.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-fos-bg2" />
            )}
          </button>
          
          {showReminders && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-fos-bg border border-fos-border rounded-xl shadow-xl p-3 overflow-hidden">
              <h3 className="text-xs font-bold uppercase tracking-widest text-fos-text3 mb-2 px-1">Smart Reminders</h3>
              {pendingReminders.length === 0 ? (
                <p className="text-xs text-fos-text3 font-mono p-1">No pending reminders.</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {pendingReminders.map(r => (
                    <div key={r.id} className="p-2.5 rounded-lg bg-fos-bg2 border border-fos-border2 text-xs">
                      <div className="font-semibold text-fos-text mb-1">
                        {r.task?.title || 'Unknown Task'}
                      </div>
                      <div className="text-[11px] text-fos-text3 mb-2">
                        {new Date(r.reminder_time).toLocaleString()}
                      </div>
                      {r.payload?.notes && (
                        <p className="text-fos-text2 mb-1 line-clamp-2">{r.payload.notes}</p>
                      )}
                      {r.payload?.url && (
                        <a href={r.payload.url} target="_blank" rel="noreferrer" className="text-fos-accent hover:underline block mt-1">
                          View Resource ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-fos-border mx-1" />

        <button
          onClick={onEndSession}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fos-bg3 border border-fos-border text-fos-text2 text-xs font-semibold hover:text-fos-text hover:border-fos-border2 transition-colors"
        >
          ⊕ End Session
        </button>
        <button
          onClick={onNewTask}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fos-accent text-white text-xs font-semibold hover:bg-fos-accent/90 transition-colors"
        >
          + New Task
        </button>
      </div>
    </header>
  )
}

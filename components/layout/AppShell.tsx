'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/hooks/useStore'
import { EndSessionModal } from '@/components/sessions/EndSessionModal'
import { NewTaskModal } from '@/components/tasks/NewTaskModal'
import type { Business } from '@/types'

interface AppShellProps {
  businesses?: Business[]
  children: React.ReactNode
}

export function AppShell({ businesses = [], children }: AppShellProps) {
  const pathname = usePathname()
  const { endSessionOpen, setEndSessionOpen, newTaskOpen, setNewTaskOpen } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { label: 'Timeline', href: '/timeline', icon: 'timeline' },
    { label: 'Tasks', href: '/tasks', icon: 'list_alt' },
    { label: 'Sessions', href: '/sessions', icon: 'stream' },
    { label: 'Resources', href: '/resources', icon: 'folder_open' },
  ]

  return (
    <div className="antialiased min-h-screen flex flex-col md:flex-row overflow-hidden relative w-full">
      <div className="bg-ambient"></div>
      
      {/* Top Navigation (Mobile Only) */}
      <header className="md:hidden flex justify-between items-center px-lg h-16 bg-surface-dim/50 backdrop-blur-md border-b border-white/5 w-full fixed top-0 z-40 transition-all duration-300">
        <div className="flex items-center gap-sm">
          <span 
            className="material-symbols-outlined text-primary cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            menu
          </span>
          <span className="font-headline-md text-headline-md text-on-surface">KeystoneOS</span>
        </div>
        <img 
          alt="User Settings" 
          className="w-8 h-8 rounded-full border border-white/10" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsCFbirxWgryb7BbQEb5g3phmXFSUZUzV8lXc8uAkxGq48B9wYmL-b1z4F955omA_fM5l5IpezxwsEgD0-5QQ6j8FnQnFwVJkX8-8i95D7tTtUI9ctfEE06-5hP2YVu72qPRrFWgiB4MciMgTIoiFwCurWKdIdVd0m1s_wLNoCLpO-tM3b7EcqvrXNQvKe_-0H8Q9gzIr_H_akLRgkttBDaV7aQ7F053Pf274ANkyrjzPHhCc-tRVY"
        />
      </header>

      {/* SideNav (Desktop) */}
      <nav className={cn(
        "flex flex-col w-72 h-full fixed left-0 top-0 bg-surface-container/80 backdrop-blur-xl border-r border-white/10 shadow-xl p-md gap-sm z-50 transition-all",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Brand / Header */}
        <div className="flex flex-col gap-sm mb-lg">
          <div className="flex flex-col items-start gap-md p-md rounded-xl bg-surface-container/40 backdrop-blur-md">
            <div className="w-full flex-shrink-0 overflow-hidden mb-2">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCG4gG6QjKRPP4ntD0bJ9S2VXzR-kA8FQsgeSyMuMj_9J3lUXUVbERMnMifpy5nSH6gN8ln2HhZBNZHhpMsO_eV1bnKjgrq9M2GLzSZfbxQOMxA2963fckyrt_pqgZXGo4IaayDoGmZ-uSH5rbVW0mXlp1zWBp1K3S7beDZ1sycFw7wFp6CVuzSfYYjm2p4ysGmunfhE-CK8RA-0YaAGkm-XrZHjX4Ff30sAI0koSOTbrIglct8McaYjWSHyXnbNzEEQ" alt="KeystoneOS Logo" className="w-full h-auto object-contain" />
            </div>
            <span className="font-label-md text-secondary tracking-widest uppercase">Enterprise OS v2.4.0</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-sm flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname === '/' && link.href === '/dashboard')
            return (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-md px-md py-sm rounded-lg transition-colors scale-98 active:scale-95 duration-200",
                  isActive 
                    ? "text-primary bg-primary/10 border-r-2 border-primary" 
                    : "text-on-surface-variant hover:bg-white/5"
                )}
              >
                <span className={cn("material-symbols-outlined", isActive && "font-variation-settings-'FILL'-1")}>
                  {link.icon}
                </span>
                <span className="font-body-md text-body-md">{link.label}</span>
              </Link>
            )
          })}
          
          <Link 
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-md px-md py-sm rounded-lg transition-colors scale-98 active:scale-95 duration-200 mt-auto",
              pathname === '/settings'
                ? "text-primary bg-primary/10 border-r-2 border-primary" 
                : "text-on-surface-variant hover:bg-white/5"
            )}
          >
            <span className={cn("material-symbols-outlined", pathname === '/settings' && "font-variation-settings-'FILL'-1")}>
              settings
            </span>
            <span className="font-body-md text-body-md">Settings</span>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 px-md">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsCFbirxWgryb7BbQEb5g3phmXFSUZUzV8lXc8uAkxGq48B9wYmL-b1z4F955omA_fM5l5IpezxwsEgD0-5QQ6j8FnQnFwVJkX8-8i95D7tTtUI9ctfEE06-5hP2YVu72qPRrFWgiB4MciMgTIoiFwCurWKdIdVd0m1s_wLNoCLpO-tM3b7EcqvrXNQvKe_-0H8Q9gzIr_H_akLRgkttBDaV7aQ7F053Pf274ANkyrjzPHhCc-tRVY" alt="User" className="w-8 h-8 rounded-full border border-white/10" />
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-on-surface truncate">Sarah Jenkins</p>
            <p className="font-label-sm text-on-surface-variant truncate">Product Lead</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">unfold_more</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 mt-16 md:mt-0 h-[calc(100vh-4rem)] md:h-screen overflow-y-auto overflow-x-hidden relative flex flex-col">
        {children}
      </main>

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

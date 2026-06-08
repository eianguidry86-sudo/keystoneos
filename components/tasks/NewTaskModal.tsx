'use client'
// components/tasks/NewTaskModal.tsx

import { useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import type { Business, TaskPriority } from '@/types'

interface NewTaskModalProps {
  open: boolean
  onClose: () => void
  businesses: Business[]
}

export function NewTaskModal({ open, onClose, businesses }: NewTaskModalProps) {
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    business_id: businesses[0]?.id ?? '',
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    current_blocker: '',
    next_step: '',
    due_date: '',
  })

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    if (!form.title.trim()) return
    startTransition(async () => {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      onClose()
      setForm((prev) => ({ ...prev, title: '', description: '', current_blocker: '', next_step: '' }))
    })
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-fos-bg2 border border-fos-border2 rounded-2xl p-7 w-[500px] max-w-[95vw] shadow-2xl">
        <h2 className="text-lg font-bold mb-1">New Task</h2>
        <p className="text-xs font-mono text-fos-text3 mb-5">Add to your business operations</p>

        <div className="space-y-4">
          {/* Business */}
          <div>
            <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
              Business
            </label>
            <select
              value={form.business_id}
              onChange={(e) => update('business_id', e.target.value)}
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text focus:outline-none focus:border-fos-accent"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
              Task Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. File LLC with Florida DOS"
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text placeholder:text-fos-text3 focus:outline-none focus:border-fos-accent"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
              Priority
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high', 'critical'] as TaskPriority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => update('priority', p)}
                  className={cn(
                    'flex-1 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-colors',
                    form.priority === p
                      ? p === 'critical' ? 'bg-red-400/20 border-red-400 text-red-400'
                        : p === 'high' ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                        : p === 'medium' ? 'bg-blue-400/20 border-blue-400 text-blue-400'
                        : 'bg-fos-bg4 border-fos-border2 text-fos-text'
                      : 'bg-fos-bg3 border-fos-border text-fos-text3 hover:border-fos-border2'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Next step */}
          <div>
            <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
              Next Step
            </label>
            <input
              type="text"
              value={form.next_step}
              onChange={(e) => update('next_step', e.target.value)}
              placeholder="What's the immediate next action?"
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text placeholder:text-fos-text3 focus:outline-none focus:border-fos-accent"
            />
          </div>

          {/* Blocker */}
          <div>
            <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
              Current Blocker <span className="text-fos-text3">(optional)</span>
            </label>
            <input
              type="text"
              value={form.current_blocker}
              onChange={(e) => update('current_blocker', e.target.value)}
              placeholder="What's in the way?"
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text placeholder:text-fos-text3 focus:outline-none focus:border-fos-accent"
            />
          </div>

          {/* Due date */}
          <div>
            <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
              Due Date <span className="text-fos-text3">(optional)</span>
            </label>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => update('due_date', e.target.value)}
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text focus:outline-none focus:border-fos-accent"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-fos-bg3 border border-fos-border text-fos-text2 text-sm font-semibold hover:text-fos-text transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!form.title.trim() || isPending}
            className="px-4 py-2 rounded-lg bg-fos-accent text-white text-sm font-semibold hover:bg-fos-accent/90 disabled:opacity-40 transition-colors"
          >
            {isPending ? 'Saving…' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  )
}

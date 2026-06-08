'use client'
// components/sessions/EndSessionModal.tsx
// The core "AI memory capture" feature.
// Accepts a paste from ChatGPT/Claude or free-form text,
// calls /api/sessions to parse + save, then refreshes dashboard.

import { useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/hooks/useStore'
import type { Business, AISource } from '@/types'

interface EndSessionModalProps {
  open: boolean
  onClose: () => void
  businesses: Business[]
}

const AI_SOURCES: { value: AISource; label: string; icon: string }[] = [
  { value: 'claude',   label: 'Claude',   icon: '◎' },
  { value: 'chatgpt',  label: 'ChatGPT',  icon: '⊕' },
  { value: 'manual',   label: 'Manual',   icon: '✏' },
  { value: 'n8n',      label: 'n8n',      icon: '⟳' },
]

export function EndSessionModal({ open, onClose, businesses }: EndSessionModalProps) {
  const { setLatestSession } = useStore()
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    business_id: businesses[0]?.id ?? '',
    ai_source: 'manual' as AISource,
    raw_input: '',
  })

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSave = () => {
    if (!form.raw_input.trim()) return
    startTransition(async () => {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const session = await res.json()
        setLatestSession(session)
        setSaved(true)
        setTimeout(() => {
          setSaved(false)
          onClose()
          setForm((p) => ({ ...p, raw_input: '' }))
        }, 1500)
      }
    })
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-fos-bg2 border border-fos-border2 rounded-2xl p-7 w-[540px] max-w-[95vw] shadow-2xl">

        {saved ? (
          // Success state
          <div className="text-center py-8">
            <div className="text-4xl mb-4">◎</div>
            <h2 className="text-lg font-bold text-green-400 mb-2">Session Saved</h2>
            <p className="text-sm text-fos-text3 font-mono">
              Dashboard updated. See you next time.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-bold">End Session</h2>
              <button onClick={onClose} className="text-fos-text3 hover:text-fos-text text-lg">✕</button>
            </div>
            <p className="text-xs font-mono text-fos-text3 mb-5">
              Paste AI output or type a summary — we'll structure it automatically.
            </p>

            <div className="space-y-4">
              {/* Business selector */}
              <div>
                <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
                  Business
                </label>
                <div className="flex gap-2">
                  {businesses.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => update('business_id', b.id)}
                      className={cn(
                        'flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-colors text-left',
                        form.business_id === b.id
                          ? 'border-fos-accent/50 text-fos-text'
                          : 'border-fos-border text-fos-text3 hover:border-fos-border2'
                      )}
                      style={form.business_id === b.id ? { background: `${b.color}18` } : undefined}
                    >
                      <span className="mr-1.5">{b.icon}</span>
                      {b.name.split(' ').slice(0, 1).join('')}
                    </button>
                  ))}
                  <button
                    onClick={() => update('business_id', 'both')}
                    className={cn(
                      'flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-colors',
                      form.business_id === 'both'
                        ? 'border-fos-accent bg-fos-accent/10 text-fos-accent'
                        : 'border-fos-border text-fos-text3 hover:border-fos-border2'
                    )}
                  >
                    Both
                  </button>
                </div>
              </div>

              {/* AI source */}
              <div>
                <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
                  Source
                </label>
                <div className="flex gap-2">
                  {AI_SOURCES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => update('ai_source', s.value)}
                      className={cn(
                        'flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center justify-center gap-1',
                        form.ai_source === s.value
                          ? 'border-fos-accent bg-fos-accent/10 text-fos-accent'
                          : 'border-fos-border text-fos-text3 hover:border-fos-border2'
                      )}
                    >
                      <span>{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session text */}
              <div>
                <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
                  Session Notes
                </label>
                <textarea
                  value={form.raw_input}
                  onChange={(e) => update('raw_input', e.target.value)}
                  rows={8}
                  placeholder={`Paste ChatGPT or Claude output here, or type a summary.\n\nExample format:\nCompleted: Updated shooting curriculum for ages 5-7\nPending: Vendor sourcing for facility\nBlocker: Waiting on LLC approval\nNext: Schedule test session`}
                  className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-4 py-3 text-sm text-fos-text placeholder:text-fos-text3 font-mono resize-none focus:outline-none focus:border-fos-accent"
                />
                <p className="text-[10px] text-fos-text3 mt-1.5">
                  Claude will automatically parse Completed / Pending / Blockers / Next Steps from your notes.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-fos-bg3 border border-fos-border text-fos-text2 text-sm font-semibold hover:text-fos-text transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.raw_input.trim() || isPending}
                className="px-5 py-2 rounded-lg bg-fos-accent text-white text-sm font-semibold hover:bg-fos-accent/90 disabled:opacity-40 transition-colors flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <span className="animate-spin inline-block">◌</span> Parsing…
                  </>
                ) : (
                  '◎ Save to Dashboard'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

'use client'
// components/sessions/SessionCard.tsx

import { cn, formatDateTime } from '@/lib/utils'
import type { SessionLog } from '@/types'

const SOURCE_STYLES: Record<string, string> = {
  claude:  'text-fos-accent bg-fos-accent/10 border-fos-accent/30',
  chatgpt: 'text-green-400 bg-green-400/10 border-green-400/30',
  manual:  'text-fos-text3 bg-fos-bg4 border-fos-border',
  n8n:     'text-amber-400 bg-amber-400/10 border-amber-400/30',
}

interface SessionCardProps {
  session: SessionLog
  compact?: boolean
}

export function SessionCard({ session, compact }: SessionCardProps) {
  const sourceStyle = SOURCE_STYLES[session.ai_source] ?? SOURCE_STYLES.manual

  return (
    <div className="bg-fos-bg3 border border-fos-border rounded-xl p-4 hover:border-fos-border2 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {session.business && (
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded border"
              style={{
                color: session.business.color,
                background: `${session.business.color}18`,
                borderColor: `${session.business.color}40`,
              }}
            >
              {session.business.icon} {compact
                ? session.business.name.split(' ')[0]
                : session.business.name}
            </span>
          )}
          <span className={cn('text-[10px] font-mono px-2 py-0.5 rounded border capitalize', sourceStyle)}>
            {session.ai_source}
          </span>
        </div>
        <span className="text-[10px] font-mono text-fos-text3">
          {formatDateTime(session.created_at)}
        </span>
      </div>

      <p className="text-xs text-fos-text2 leading-relaxed mb-3">
        {session.summary}
      </p>

      {!compact && session.blockers.length > 0 && (
        <div className="mb-3">
          {session.blockers.map((b, i) => (
            <div key={i} className="text-[11px] font-mono text-amber-400 flex items-start gap-1.5">
              <span>⚠</span> {b}
            </div>
          ))}
        </div>
      )}

      {session.recommended_action && (
        <div className="bg-fos-accent/8 border border-fos-accent/20 rounded-lg px-3 py-2">
          <p className="text-[11px] font-mono text-fos-accent">
            ↳ {session.recommended_action}
          </p>
        </div>
      )}
    </div>
  )
}

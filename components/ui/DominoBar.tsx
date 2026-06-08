'use client'
// components/ui/DominoBar.tsx
// Segmented "domino style" progress bar as specified in PRD §9.

import { cn, clamp, range } from '@/lib/utils'
import { useState } from 'react'

type DominoColor = 'accent' | 'green' | 'teal' | 'amber' | 'red' | 'blue'

const COLOR_MAP: Record<DominoColor, { filled: string; empty: string }> = {
  accent: { filled: 'bg-fos-accent',  empty: 'bg-fos-bg4' },
  green:  { filled: 'bg-green-400',   empty: 'bg-fos-bg4' },
  teal:   { filled: 'bg-teal-400',    empty: 'bg-fos-bg4' },
  amber:  { filled: 'bg-amber-400',   empty: 'bg-fos-bg4' },
  red:    { filled: 'bg-red-400',     empty: 'bg-fos-bg4' },
  blue:   { filled: 'bg-blue-400',    empty: 'bg-fos-bg4' },
}

/** Maps a 0-100 completion % to the right color automatically */
function autoColor(pct: number): DominoColor {
  if (pct >= 80) return 'green'
  if (pct >= 50) return 'teal'
  if (pct >= 25) return 'accent'
  if (pct >= 10) return 'amber'
  return 'red'
}

interface DominoBarProps {
  /** 0–100 */
  percent: number
  /** Label shown above the bar */
  label?: string
  /** Number of domino segments (default 16) */
  segments?: number
  /** Override auto color selection */
  color?: DominoColor | 'auto'
  /** Show label and percentage text */
  showLabel?: boolean
  /** Additional class names */
  className?: string
  /** Tooltip on hover */
  tooltip?: string
  /** Animate on mount */
  animate?: boolean
}

export function DominoBar({
  percent,
  label,
  segments = 16,
  color = 'auto',
  showLabel = true,
  className,
  tooltip,
  animate = true,
}: DominoBarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const clamped = clamp(percent, 0, 100)
  const filledCount = Math.round((clamped / 100) * segments)
  const resolvedColor = color === 'auto' ? autoColor(clamped) : color
  const { filled, empty } = COLOR_MAP[resolvedColor]

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-xs text-fos-text2 font-medium truncate">{label}</span>
          )}
          <span className="text-xs font-mono text-fos-text3 ml-auto flex-shrink-0">
            {clamped}%
          </span>
        </div>
      )}

      <div
        className="flex gap-[3px] w-full"
        title={tooltip ?? (label ? `${label}: ${clamped}%` : `${clamped}%`)}
      >
        {range(segments).map((i) => {
          const isFilled = i < filledCount
          const isHovered = hoveredIndex !== null && i <= hoveredIndex
          const animDelay = animate ? `${i * 18}ms` : '0ms'

          return (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-sm transition-opacity duration-150 cursor-pointer',
                isFilled ? filled : empty,
                isHovered && !isFilled && 'opacity-40',
                animate && isFilled && 'domino-segment'
              )}
              style={animate ? { animationDelay: animDelay } : undefined}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          )
        })}
      </div>
    </div>
  )
}

/** Stacked list of domino bars for a business overview */
export function DominoStack({
  items,
  className,
}: {
  items: Array<{ label: string; percent: number; color?: DominoColor | 'auto' }>
  className?: string
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => (
        <DominoBar
          key={item.label}
          label={item.label}
          percent={item.percent}
          color={item.color ?? 'auto'}
          segments={16}
        />
      ))}
    </div>
  )
}

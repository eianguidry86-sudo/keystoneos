// lib/utils/index.ts

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'
import type { TaskStatus, TaskPriority, ResourceType } from '@/types'

/** Tailwind class merger */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Relative time: "2 hours ago" */
export function timeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

/** "May 12, 2026" */
export function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy')
}

/** "May 12 · 2:14 PM" */
export function formatDateTime(date: string): string {
  return format(new Date(date), "MMM d · h:mm a")
}

export function getBusinessLogo(name: string): string | null {
  if (name.includes('FUNdamentals')) return '/fundamentals-logo.png'
  if (name.includes('Venture')) return '/venture-logo.png'
  if (name.includes('Market')) return '/market-logo.png'
  if (name.includes('Keystone')) return '/keystone-logo.png'
  return null
}

// ─── Status helpers ────────────────────────────

export const STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  blocked: 'Blocked',
  completed: 'Completed',
  archived: 'Archived',
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  not_started: 'text-fos-text3 bg-fos-bg4 border-fos-border',
  in_progress: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  blocked: 'text-red-400 bg-red-400/10 border-red-400/30',
  completed: 'text-green-400 bg-green-400/10 border-green-400/30',
  archived: 'text-fos-text3 bg-fos-bg3 border-fos-border opacity-50',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: 'text-fos-text3 bg-fos-bg4 border-fos-border',
  medium: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  high: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  critical: 'text-red-400 bg-red-400/10 border-red-400/30',
}

export const PRIORITY_DOT: Record<TaskPriority, string> = {
  low: 'bg-fos-text3',
  medium: 'bg-blue-400',
  high: 'bg-amber-400',
  critical: 'bg-red-400',
}

// ─── Resource helpers ──────────────────────────

export const RESOURCE_ICONS: Record<ResourceType, string> = {
  pdf: '📄',
  youtube: '▶',
  article: '🔗',
  github: '⌥',
  loom: '🎬',
  image: '🖼',
  ai_export: '◎',
  notes: '📝',
  figma: '✦',
}

export const RESOURCE_COLORS: Record<ResourceType, string> = {
  pdf: 'bg-blue-400/15',
  youtube: 'bg-red-400/15',
  article: 'bg-green-400/15',
  github: 'bg-purple-400/15',
  loom: 'bg-pink-400/15',
  image: 'bg-amber-400/15',
  ai_export: 'bg-fos-accent/15',
  notes: 'bg-teal-400/15',
  figma: 'bg-orange-400/15',
}

// ─── Progress helpers ──────────────────────────

/**
 * Calculates overall completion % from a list of tasks.
 * Completed tasks = 100%, others use their completion_percent.
 */
export function calcCompletion(tasks: Array<{ status: TaskStatus; completion_percent: number }>): number {
  if (tasks.length === 0) return 0
  const total = tasks.reduce((sum, t) => {
    return sum + (t.status === 'completed' ? 100 : t.completion_percent)
  }, 0)
  return Math.round(total / tasks.length)
}

/**
 * Groups tasks by status for quick metrics.
 */
export function groupByStatus(tasks: Array<{ status: TaskStatus }>) {
  return tasks.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] ?? 0) + 1
      return acc
    },
    {} as Partial<Record<TaskStatus, number>>
  )
}

/** Clamp a number between min and max */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

/** Generate array of length n */
export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i)
}

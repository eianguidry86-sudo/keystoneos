// lib/hooks/useStore.ts
// Zustand store for lightweight client-side state.
// Does NOT replace Supabase — just caches UI state and optimistic updates.

import { create } from 'zustand'
import type { Business, Task, SessionLog, UserAvailability, TaskReminder } from '@/types'

interface FounderOSStore {
  // Active business selection
  activeBusiness: Business | null
  setActiveBusiness: (b: Business | null) => void

  // Task being edited in sidebar/modal
  editingTask: Task | null
  setEditingTask: (t: Task | null) => void

  // End session modal
  endSessionOpen: boolean
  setEndSessionOpen: (open: boolean) => void

  // New task modal
  newTaskOpen: boolean
  setNewTaskOpen: (open: boolean) => void
  newTaskCategoryId: string | null
  setNewTaskCategoryId: (id: string | null) => void

  // Sidebar collapsed on mobile
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void

  // Latest session (refreshed after save)
  latestSession: SessionLog | null
  setLatestSession: (s: SessionLog | null) => void

  // Optimistic task updates (overrides server data until revalidation)
  taskOverrides: Record<string, Partial<Task>>
  setTaskOverride: (id: string, updates: Partial<Task>) => void
  clearTaskOverride: (id: string) => void

  // Productivity Enhancements
  availabilityStatus: UserAvailability
  setAvailabilityStatus: (status: UserAvailability) => void
  pendingReminders: TaskReminder[]
  setPendingReminders: (reminders: TaskReminder[]) => void
}

export const useStore = create<FounderOSStore>((set) => ({
  activeBusiness: null,
  setActiveBusiness: (b) => set({ activeBusiness: b }),

  editingTask: null,
  setEditingTask: (t) => set({ editingTask: t }),

  endSessionOpen: false,
  setEndSessionOpen: (open) => set({ endSessionOpen: open }),

  newTaskOpen: false,
  setNewTaskOpen: (open) => set({ newTaskOpen: open }),
  newTaskCategoryId: null,
  setNewTaskCategoryId: (id) => set({ newTaskCategoryId: id }),

  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  latestSession: null,
  setLatestSession: (s) => set({ latestSession: s }),

  taskOverrides: {},
  setTaskOverride: (id, updates) =>
    set((state) => ({
      taskOverrides: { ...state.taskOverrides, [id]: { ...state.taskOverrides[id], ...updates } },
    })),
  clearTaskOverride: (id) =>
    set((state) => {
      const next = { ...state.taskOverrides }
      delete next[id]
      return { taskOverrides: next }
    }),

  availabilityStatus: 'available',
  setAvailabilityStatus: (status) => set({ availabilityStatus: status }),
  pendingReminders: [],
  setPendingReminders: (reminders) => set({ pendingReminders: reminders }),
}))

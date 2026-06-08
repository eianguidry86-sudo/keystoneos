'use client'
// components/resources/ResourcesClient.tsx

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RESOURCE_ICONS, RESOURCE_COLORS, formatDateTime } from '@/lib/utils'
import type { Business, Resource, ResourceType } from '@/types'

const TYPE_FILTERS: { value: ResourceType | 'all'; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'pdf',       label: '📄 PDFs' },
  { value: 'youtube',   label: '▶ Videos' },
  { value: 'ai_export', label: '◎ AI Exports' },
  { value: 'article',   label: '🔗 Articles' },
  { value: 'github',    label: '⌥ GitHub' },
  { value: 'notes',     label: '📝 Notes' },
]

interface ResourcesClientProps {
  business: Business
  resources: Resource[]
}

export function ResourcesClient({ business, resources }: ResourcesClientProps) {
  const [filter, setFilter] = useState<ResourceType | 'all'>('all')
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)

  const filtered = resources.filter((r) => {
    const matchType = filter === 'all' || r.resource_type === filter
    const matchSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchType && matchSearch
  })

  return (
    <div className="max-w-[1100px] space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">
            {business.icon} Resource Library
          </h1>
          <p className="text-[11px] font-mono text-fos-text3 mt-0.5">
            {business.name} · {resources.length} resources
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-fos-accent text-white text-xs font-semibold hover:bg-fos-accent/90 transition-colors"
        >
          + Add Resource
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources…"
          className="bg-fos-bg2 border border-fos-border rounded-lg px-3 py-1.5 text-sm text-fos-text placeholder:text-fos-text3 focus:outline-none focus:border-fos-accent w-48"
        />
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value as ResourceType | 'all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
              filter === f.value
                ? 'bg-fos-accent/15 border-fos-accent/50 text-fos-accent'
                : 'bg-fos-bg2 border-fos-border text-fos-text3 hover:text-fos-text hover:border-fos-border2'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-fos-text3 font-mono text-sm">
          No resources yet. Add your first one!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
          {/* Add placeholder */}
          <button
            onClick={() => setAddOpen(true)}
            className="flex flex-col items-center justify-center gap-2 h-32 rounded-xl border border-dashed border-fos-border text-fos-text3 hover:border-fos-border2 hover:text-fos-text2 transition-colors"
          >
            <span className="text-2xl">+</span>
            <span className="text-xs font-mono">Add resource</span>
          </button>
        </div>
      )}

      {addOpen && (
        <AddResourceModal
          businessId={business.id}
          onClose={() => setAddOpen(false)}
        />
      )}
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const icon = RESOURCE_ICONS[resource.resource_type]
  const bgColor = RESOURCE_COLORS[resource.resource_type]

  return (
    <a
      href={resource.url ?? '#'}
      target={resource.url ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="block bg-fos-bg2 border border-fos-border rounded-xl p-4 hover:border-fos-border2 hover:-translate-y-0.5 transition-all group"
    >
      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3', bgColor)}>
        {icon}
      </div>
      <div className="text-sm font-semibold text-fos-text line-clamp-2 mb-1 group-hover:text-white transition-colors">
        {resource.title}
      </div>
      <div className="text-[10px] font-mono text-fos-text3 capitalize mb-2">
        {resource.resource_type.replace('_', ' ')}
      </div>
      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fos-bg3 text-fos-text3 border border-fos-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  )
}

function AddResourceModal({
  businessId,
  onClose,
}: {
  businessId: string
  onClose: () => void
}) {
  const [form, setForm] = useState({
    title: '',
    url: '',
    resource_type: 'article' as ResourceType,
    tags: '',
    description: '',
  })
  const [saving, setSaving] = useState(false)

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }))

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    await fetch('/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        business_id: businessId,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    })
    setSaving(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-fos-bg2 border border-fos-border2 rounded-2xl p-7 w-[460px] max-w-[95vw]">
        <h2 className="text-lg font-bold mb-4">Add Resource</h2>
        <div className="space-y-3">
          <Field label="Title">
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Resource title"
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text focus:outline-none focus:border-fos-accent"
            />
          </Field>
          <Field label="URL">
            <input
              type="url"
              value={form.url}
              onChange={(e) => update('url', e.target.value)}
              placeholder="https://…"
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text focus:outline-none focus:border-fos-accent"
            />
          </Field>
          <Field label="Type">
            <select
              value={form.resource_type}
              onChange={(e) => update('resource_type', e.target.value)}
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text focus:outline-none focus:border-fos-accent"
            >
              {Object.keys(RESOURCE_ICONS).map((t) => (
                <option key={t} value={t}>{t.replace('_', ' ')}</option>
              ))}
            </select>
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update('tags', e.target.value)}
              placeholder="curriculum, legal, reference"
              className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2 text-sm text-fos-text focus:outline-none focus:border-fos-accent"
            />
          </Field>
        </div>
        <div className="flex gap-3 mt-5 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-fos-bg3 border border-fos-border text-fos-text2 text-sm font-semibold hover:text-fos-text transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.title.trim() || saving}
            className="px-4 py-2 rounded-lg bg-fos-accent text-white text-sm font-semibold hover:bg-fos-accent/90 disabled:opacity-40 transition-colors"
          >
            {saving ? 'Saving…' : 'Add Resource'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  )
}

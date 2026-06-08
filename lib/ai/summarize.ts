// lib/ai/summarize.ts
// AI-powered session summarization.
// Parses raw paste from ChatGPT/Claude and structures it into SessionLog fields.
// Falls back to manual parsing if AI call fails (keeps it free-friendly).

import Anthropic from '@anthropic-ai/sdk'
import type { SessionLogCreateInput } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface ParsedSession {
  summary: string
  completed_items: string[]
  pending_items: string[]
  blockers: string[]
  next_steps: string[]
  recommended_action: string
}

const SYSTEM_PROMPT = `You are an AI assistant helping a founder track their work sessions.
Given a raw session note (which may be a ChatGPT or Claude output, or free-form text),
extract and structure the following fields as a JSON object:

{
  "summary": "1-2 sentence overview of what happened this session",
  "completed_items": ["item 1", "item 2"],
  "pending_items": ["item 1", "item 2"],
  "blockers": ["blocker 1"],
  "next_steps": ["step 1", "step 2"],
  "recommended_action": "The single most important next action"
}

Rules:
- Be concise. Each array item should be one clear sentence.
- If a field has no data, return an empty array [].
- recommended_action must always be a non-empty string.
- Return ONLY the JSON object, no markdown, no explanation.`

/**
 * Uses Claude to parse raw session notes into structured data.
 * Falls back to heuristic parsing if the API call fails.
 */
export async function parseSessionWithAI(rawInput: string): Promise<ParsedSession> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: rawInput }],
      system: SYSTEM_PROMPT,
    })

    const text = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('')

    return JSON.parse(text) as ParsedSession
  } catch (err) {
    console.warn('AI parse failed, falling back to heuristic:', err)
    return heuristicParse(rawInput)
  }
}

/**
 * Heuristic parser — works without any API call.
 * Handles common formats from ChatGPT/Claude outputs.
 */
export function heuristicParse(raw: string): ParsedSession {
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean)

  const extract = (keywords: string[]): string[] => {
    const results: string[] = []
    let capturing = false

    for (const line of lines) {
      const lower = line.toLowerCase()
      if (keywords.some((kw) => lower.startsWith(kw))) {
        capturing = true
        // Inline value after colon
        const after = line.split(':').slice(1).join(':').trim()
        if (after) results.push(after)
        continue
      }
      if (capturing) {
        if (line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./)) {
          results.push(line.replace(/^[-•\d.]\s*/, ''))
        } else if (line.includes(':') && !line.startsWith(' ')) {
          capturing = false
        }
      }
    }
    return results
  }

  const completed = extract(['completed:', 'done:', 'finished:'])
  const pending = extract(['pending:', 'in progress:', 'todo:', 'to do:'])
  const blockers = extract(['blocker:', 'blockers:', 'blocked:', 'issue:'])
  const next = extract(['next:', 'next step:', 'next steps:', 'action:'])

  // Build summary from first non-header line or first 2 lines
  const summaryLines = lines.filter(
    (l) => !l.endsWith(':') && l.length > 20
  ).slice(0, 2)

  return {
    summary: summaryLines.join(' ') || raw.slice(0, 200),
    completed_items: completed,
    pending_items: pending,
    blockers: blockers,
    next_steps: next,
    recommended_action: next[0] ?? pending[0] ?? 'Review session notes and identify next priority.',
  }
}

/**
 * Generates a "where I left off" briefing from current task state.
 * Called by n8n or the End Session button to auto-summarize active work.
 */
export async function generateSessionBriefing(params: {
  businessName: string
  activeTasks: Array<{ title: string; status: string; blocker?: string | null }>
  recentlyUpdated: Array<{ title: string; status: string }>
}): Promise<string> {
  const { businessName, activeTasks, recentlyUpdated } = params

  const prompt = `
Generate a concise "where I left off" session summary for ${businessName}.

Recently updated tasks:
${recentlyUpdated.map((t) => `- ${t.title} (${t.status})`).join('\n')}

Active/in-progress tasks:
${activeTasks.map((t) => `- ${t.title}${t.blocker ? ` [BLOCKED: ${t.blocker}]` : ''}`).join('\n')}

Write a 2-3 sentence summary a founder can read in 10 seconds to re-orient themselves.
Focus on momentum, blockers, and the clearest next action.
  `.trim()

  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    })

    return message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('')
  } catch {
    return `Currently working on ${activeTasks[0]?.title ?? 'active tasks'} for ${businessName}. Check task list for full context.`
  }
}

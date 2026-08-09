import fs from 'fs'

const html = fs.readFileSync('_stitch_reference/session-logs.html', 'utf8')
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)
if (!mainMatch) {
  console.error('Could not find main tag')
  process.exit(1)
}

let innerHtml = mainMatch[1]
innerHtml = innerHtml.replace(/class=/g, 'className=')
innerHtml = innerHtml.replace(/for=/g, 'htmlFor=')
innerHtml = innerHtml.replace(/<input([^>]+?)>/g, '<input$1 />')
innerHtml = innerHtml.replace(/<img([^>]+?)>/g, '<img$1 />')
innerHtml = innerHtml.replace(/<!--[\s\S]*?-->/g, '')

const componentString = `
'use client'

import type { Business, SessionLog } from '@/types'

interface SessionsClientProps {
  businesses: Business[]
  sessions: SessionLog[]
}

export function SessionsClient({ businesses, sessions }: SessionsClientProps) {
  return (
    <>
      ${innerHtml}
    </>
  )
}
`

fs.writeFileSync('components/sessions/SessionsClientTemp.tsx', componentString)
console.log('Done')

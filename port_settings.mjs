import fs from 'fs'

const html = fs.readFileSync('_stitch_reference/settings.html', 'utf8')
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
// Fix style inline string to object
innerHtml = innerHtml.replace(/style="width:\s*([^"]+)"/g, "style={{ width: '$1' }}")

const componentString = `
'use client'

import type { Business } from '@/types'

interface SettingsClientProps {
  businesses: Business[]
}

export function SettingsClient({ businesses }: SettingsClientProps) {
  return (
    <>
      ${innerHtml}
    </>
  )
}
`

fs.writeFileSync('components/settings/SettingsClientTemp.tsx', componentString)
console.log('Done')

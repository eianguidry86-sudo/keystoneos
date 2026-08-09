import fs from 'fs'

const html = fs.readFileSync('_stitch_reference/resources.html', 'utf8')
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
// Remove mobile nav from innerHtml if it snuck in (the closing </main> is before the mobile nav though)

const componentString = `
'use client'

import type { Business, Resource } from '@/types'

interface ResourcesClientProps {
  businesses: Business[]
  resources: Resource[]
}

export function ResourcesClient({ businesses, resources }: ResourcesClientProps) {
  return (
    <>
      ${innerHtml}
    </>
  )
}
`

fs.writeFileSync('components/resources/ResourcesClientTemp.tsx', componentString)
console.log('Done')

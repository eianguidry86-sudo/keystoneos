import fs from 'fs'

const html = fs.readFileSync('_stitch_reference/tasks.html', 'utf8')
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)
if (!mainMatch) {
  console.error('Could not find main tag')
  process.exit(1)
}

let innerHtml = mainMatch[1]
// Convert class to className
innerHtml = innerHtml.replace(/class=/g, 'className=')
innerHtml = innerHtml.replace(/for=/g, 'htmlFor=')
innerHtml = innerHtml.replace(/<input([^>]+?)>/g, '<input$1 />')
innerHtml = innerHtml.replace(/<img([^>]+?)>/g, '<img$1 />')
innerHtml = innerHtml.replace(/<!--[\s\S]*?-->/g, '')

const componentString = `
'use client'

import type { Task, Business } from '@/types'

interface TasksClientProps {
  tasks: Task[]
  businesses: Business[]
}

export function TasksClient({ tasks, businesses }: TasksClientProps) {
  return (
    <>
      ${innerHtml}
    </>
  )
}
`

fs.writeFileSync('app/tasks/TasksClientTemp.tsx', componentString)
console.log('Done')

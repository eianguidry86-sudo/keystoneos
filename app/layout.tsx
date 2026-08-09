import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/Providers'

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jb-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KeystoneOS — The Operating System for Multi-Venture Founders',
  description: 'The keystone that holds your ventures together. AI-assisted operations, continuity, and execution tracking.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${jbMono.variable} font-sans bg-background text-on-background antialiased`} style={{ backgroundColor: '#0c1324' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

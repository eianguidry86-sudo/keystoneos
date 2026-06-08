// app/layout.tsx
import type { Metadata } from 'next'
import { Syne, DM_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/Providers'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
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
      <body className={`${syne.variable} ${dmMono.variable} font-sans bg-fos-bg text-fos-text antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

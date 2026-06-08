'use client'
// app/(auth)/login/page.tsx

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [magicSent, setMagicSent] = useState(false)
  const [mode, setMode] = useState<'password' | 'magic'>('password')

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    if (mode === 'magic') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      })
      if (error) setError(error.message)
      else setMagicSent(true)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-fos-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fos-accent to-fos-accent2 flex items-center justify-center text-base font-bold text-white">
            F⚙
          </div>
          <div>
            <div className="font-bold text-lg">FounderOS</div>
            <div className="text-[11px] text-fos-text3 font-mono">AI-Assisted Operating System</div>
          </div>
        </div>

        {magicSent ? (
          <div className="bg-fos-bg2 border border-fos-border rounded-2xl p-8 text-center">
            <div className="text-3xl mb-4">📬</div>
            <h2 className="font-bold text-lg mb-2">Check your email</h2>
            <p className="text-sm text-fos-text3">
              We sent a magic link to <span className="text-fos-text">{email}</span>.
              Click it to sign in.
            </p>
          </div>
        ) : (
          <div className="bg-fos-bg2 border border-fos-border rounded-2xl p-8">
            <h1 className="text-xl font-bold mb-1">Welcome back</h1>
            <p className="text-xs text-fos-text3 font-mono mb-6">Sign in to your operating system</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="you@example.com"
                  className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2.5 text-sm text-fos-text placeholder:text-fos-text3 focus:outline-none focus:border-fos-accent"
                />
              </div>

              {mode === 'password' && (
                <div>
                  <label className="block text-xs font-semibold text-fos-text2 mb-1.5 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="••••••••"
                    className="w-full bg-fos-bg3 border border-fos-border2 rounded-lg px-3 py-2.5 text-sm text-fos-text placeholder:text-fos-text3 focus:outline-none focus:border-fos-accent"
                  />
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400 font-mono">{error}</p>
              )}

              <button
                onClick={handleLogin}
                disabled={loading || !email}
                className="w-full py-2.5 rounded-lg bg-fos-accent text-white font-semibold text-sm hover:bg-fos-accent/90 disabled:opacity-40 transition-colors"
              >
                {loading
                  ? 'Signing in…'
                  : mode === 'magic'
                  ? 'Send Magic Link'
                  : 'Sign In'}
              </button>

              <button
                onClick={() => setMode(mode === 'password' ? 'magic' : 'password')}
                className="w-full text-xs text-fos-text3 hover:text-fos-text2 transition-colors font-mono"
              >
                {mode === 'password'
                  ? 'Use magic link instead →'
                  : 'Use password instead →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

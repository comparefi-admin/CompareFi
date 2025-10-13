'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [debug, setDebug] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setDebug('Starting login...')

    try {
      console.log('🔹 Attempting signInWithPassword', { email })
      const { data, error: signError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('🔹 Supabase response:', { data, signError })
      setDebug(JSON.stringify({ data, signError }, null, 2))

      if (signError) {
        console.error('❌ Sign-in error:', signError)
        setError(signError.message)
        setLoading(false)
        return
      }

      const user = data?.user
      console.log('✅ Authenticated user:', user)

      if (!user) {
        setError('No user object returned.')
        setLoading(false)
        return
      }

      const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID
      console.log('🔸 Admin UID check', { userId: user.id, adminUid })

      // Allow admin login even if email not confirmed
      if (user.id === adminUid) {
        console.log('✅ Admin UID matched! Redirecting...')
        router.push('/admin/dashboard')
        return
      }

      // Email not confirmed
      if (!user.email_confirmed_at) {
        console.warn('⚠️ Email not confirmed for this account')
        await supabase.auth.signOut()
        setError('Email not confirmed.')
      } else {
        console.warn('🚫 Unauthorized account (not admin)')
        await supabase.auth.signOut()
        setError('Unauthorized account.')
      }
    } catch (err) {
      console.error('🔥 Unexpected error:', err)
      setError(err.message || 'Unexpected error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            />
          </div>

          <div className="relative flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-xl shadow hover:bg-emerald-600 transition"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          (Keep this route hidden — don’t share the link anywhere)
        </p>
      </div>
    </div>
  )
}

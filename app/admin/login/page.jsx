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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signError) {
      setError(signError.message)
      setLoading(false)
      return
    }

    const user = data.user

    // Allow admin to log in even if email not confirmed
    if (user?.id === process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push('/admin/dashboard')
    } else if (!user.email_confirmed_at) {
      await supabase.auth.signOut()
      setError('Email not confirmed.')
    } else {
      await supabase.auth.signOut()
      setError('Unauthorized account.')
    }

    setLoading(false)
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
          (Keep this route hidden — don’t link it in navigation)
        </p>
      </div>
    </div>
  )
}

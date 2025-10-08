'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    if (user?.id === process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push('/admin/dashboard')
    } else {
      await supabase.auth.signOut()
      setError('Unauthorized account.')
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 480, margin: '5rem auto', padding: 20 }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        (Keep this route hidden — don’t link it in navigation)
      </p>
    </div>
  )
}
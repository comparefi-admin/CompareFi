'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        router.replace('/admin/login')
        return
      }
      if (data.user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        await supabase.auth.signOut()
        router.replace('/admin/login')
        return
      }
      setUser(data.user)
      setLoading(false)
    }

    verifyUser()
  }, [router])

  if (loading) return <p style={{ padding: 20 }}>Verifying access...</p>

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <p>This is your secure dashboard area.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}


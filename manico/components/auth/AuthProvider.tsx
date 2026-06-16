'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import type { AuthUser } from '@/types/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuthenticated, setUnauthenticated, setLoading } = useAuthStore()

  useEffect(() => {
    const token = document.cookie.match(/(?:^|;\s*)auth-token=([^;]+)/)?.[1]
    if (!token) {
      setUnauthenticated()
      return
    }
    setLoading()
    fetch('/api/v1/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json: { data?: { user: AuthUser }; error?: string }) => {
        if (json.data?.user) {
          setAuthenticated(json.data.user, token)
        } else {
          document.cookie = 'auth-token=; path=/; max-age=0'
          setUnauthenticated()
        }
      })
      .catch(() => setUnauthenticated())
  }, [setAuthenticated, setUnauthenticated, setLoading])

  return <>{children}</>
}

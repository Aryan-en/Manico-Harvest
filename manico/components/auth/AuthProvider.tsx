'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { insforgeBrowser } from '@/lib/insforge-browser'
import type { AuthUser } from '@/types/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuthenticated, setUnauthenticated, setLoading } = useAuthStore()

  useEffect(() => {
    async function init() {
      // Primary path: email/password session via our auth-token cookie
      const token = document.cookie.match(/(?:^|;\s*)auth-token=([^;]+)/)?.[1]

      if (token) {
        setLoading()
        try {
          const res = await fetch('/api/v1/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const json = (await res.json()) as { data?: { user: AuthUser }; error?: string }
          if (json.data?.user) {
            setAuthenticated(json.data.user, token)
            return
          }
        } catch {}
        // Token was invalid/expired — clear it
        document.cookie = 'auth-token=; path=/; max-age=0'
      }

      // Fallback: detect OAuth session via Insforge browser SDK.
      // After signInWithOAuth redirect, the Insforge httpOnly session cookie
      // allows getCurrentUser() to resolve the authenticated user.
      try {
        const { data } = await insforgeBrowser.auth.getCurrentUser()
        if (data?.user) {
          setAuthenticated(data.user as AuthUser, '')
          return
        }
      } catch {}

      setUnauthenticated()
    }

    void init()
  }, [setAuthenticated, setUnauthenticated, setLoading])

  return <>{children}</>
}

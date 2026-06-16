'use client'

import { useAuthStore } from '@/store/auth-store'
import { insforgeBrowser } from '@/lib/insforge-browser'
import type { AuthUser } from '@/types/auth'
import posthog from 'posthog-js'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

function setAuthCookie(token: string) {
  document.cookie = `auth-token=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Strict`
}

function clearAuthCookie() {
  document.cookie = 'auth-token=; path=/; max-age=0'
}

export function useAuth() {
  const store = useAuthStore()

  async function login(email: string, password: string): Promise<void> {
    store.setLoading()
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const json = (await res.json()) as { data?: { user: AuthUser; accessToken: string }; error?: string }
    if (!res.ok) {
      store.setError(json.error ?? 'Login failed')
      throw new Error(json.error ?? 'Login failed')
    }
    const { user, accessToken } = json.data!
    setAuthCookie(accessToken)
    store.setAuthenticated(user, accessToken)
  }

  async function register(
    email: string,
    password: string,
    name?: string,
  ): Promise<{ requireEmailVerification: boolean }> {
    store.setLoading()
    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    const json = (await res.json()) as { data?: { requireEmailVerification?: boolean }; error?: string }
    if (!res.ok) {
      store.setError(json.error ?? 'Registration failed')
      throw new Error(json.error ?? 'Registration failed')
    }
    store.setUnauthenticated()
    return { requireEmailVerification: json.data?.requireEmailVerification ?? false }
  }

  async function logout(): Promise<void> {
    posthog.capture('user_signed_out')
    posthog.reset()
    await fetch('/api/v1/auth/logout', { method: 'POST' })
    clearAuthCookie()
    store.setUnauthenticated()
  }

  async function verifyEmail(email: string, otp: string): Promise<void> {
    const res = await fetch('/api/v1/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })
    const json = (await res.json()) as { data?: { user: AuthUser; accessToken: string }; error?: string }
    if (!res.ok) throw new Error(json.error ?? 'Verification failed')
    const { user, accessToken } = json.data!
    setAuthCookie(accessToken)
    store.setAuthenticated(user, accessToken)
    posthog.identify(email, { email })
    posthog.capture('email_verified', { email })
  }

  async function oauthSignIn(provider: 'google' | 'github'): Promise<void> {
    const additionalParams = provider === 'google' ? { prompt: 'select_account' } : undefined
    const { error } = await insforgeBrowser.auth.signInWithOAuth(provider, {
      redirectTo: `${window.location.origin}/`,
      ...(additionalParams ? { additionalParams } : {}),
    })
    if (error) {
      throw new Error((error as { message?: string }).message ?? 'OAuth sign-in failed')
    }
    // SDK auto-redirects the browser — no further execution
  }

  return { login, register, logout, verifyEmail, oauthSignIn }
}

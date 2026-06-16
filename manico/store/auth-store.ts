import { create } from 'zustand'
import type { AuthUser } from '@/types/auth'

type AuthStore = {
  status: 'idle' | 'loading' | 'unauthenticated' | 'authenticated' | 'error'
  user: AuthUser | null
  accessToken: string | null
  errorMessage: string | null
  setAuthenticated: (user: AuthUser, accessToken: string) => void
  setUnauthenticated: () => void
  setLoading: () => void
  setError: (message: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: 'idle',
  user: null,
  accessToken: null,
  errorMessage: null,

  setAuthenticated: (user, accessToken) =>
    set({ status: 'authenticated', user, accessToken, errorMessage: null }),

  setUnauthenticated: () =>
    set({ status: 'unauthenticated', user: null, accessToken: null, errorMessage: null }),

  setLoading: () => set({ status: 'loading' }),

  setError: (message) => set({ status: 'error', errorMessage: message }),
}))

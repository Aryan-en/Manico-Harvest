export type AuthUser = {
  id: string
  email: string
  emailVerified: boolean
  providers: string[]
  createdAt: string
  updatedAt: string
  profile: {
    name?: string
    avatar_url?: string | null
    [key: string]: unknown
  }
  metadata: Record<string, unknown>
}

export type AuthState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'unauthenticated' }
  | { status: 'authenticated'; user: AuthUser; accessToken: string }
  | { status: 'error'; message: string }

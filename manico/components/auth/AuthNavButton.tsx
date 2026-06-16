'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useAuth } from '@/hooks/use-auth'

export function AuthNavButton() {
  const { status, user } = useAuthStore()
  const { logout } = useAuth()
  const router = useRouter()

  async function handleLogout() {
    await logout()
    router.push('/')
  }

  if (status === 'authenticated' && user) {
    const displayName = (user.profile?.name as string | undefined) ?? user.email.split('@')[0]
    return (
      <div className="hidden lg:flex items-center gap-3 ml-2">
        <span className="flex items-center gap-1.5 text-sm text-nav-link">
          <User size={14} />
          {displayName}
        </span>
        <button
          onClick={handleLogout}
          aria-label="Sign out"
          className="flex items-center gap-1.5 rounded-lg text-sm font-semibold text-nav-link hover:text-inverse transition-colors active:scale-[0.98]"
          style={{
            padding: '8px 14px',
            border: '1px solid rgba(247,236,217,0.25)',
            transitionDuration: 'var(--duration-fast)',
          }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="hidden lg:flex items-center gap-2 ml-2">
      <Link
        href="/sign-in"
        className="text-sm font-medium text-nav-link hover:text-inverse transition-colors"
        style={{ transitionDuration: 'var(--duration-fast)' }}
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="flex items-center rounded-lg text-sm font-semibold bg-accent hover:bg-accent-hover text-inverse active:scale-[0.98] transition-all"
        style={{ padding: '8px 18px', transitionDuration: 'var(--duration-fast)' }}
      >
        Sign Up
      </Link>
    </div>
  )
}

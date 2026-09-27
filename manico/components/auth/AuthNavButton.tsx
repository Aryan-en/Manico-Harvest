'use client'

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
          className="flex items-center gap-1.5 rounded-full text-sm font-semibold text-nav-link hover:text-inverse hover:bg-[rgba(247,236,217,0.06)] transition-all duration-200 active:scale-[0.98]"
          style={{
            padding: '8px 16px',
            border: '1px solid rgba(247,236,217,0.2)',
          }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    )
  }

  return null
}

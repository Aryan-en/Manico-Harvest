'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { RegisterSchema } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import type { z } from 'zod'
import posthog from 'posthog-js'

type FormData = z.infer<typeof RegisterSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [oauthLoading, setOauthLoading] = useState(false)
  const { register: registerUser, oauthSignIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(RegisterSchema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      const result = await registerUser(data.email, data.password, data.name)
      posthog.identify(data.email, { email: data.email, name: data.name ?? undefined })
      posthog.capture('user_signed_up', {
        method: 'email',
        requires_email_verification: result.requireEmailVerification,
      })
      if (result.requireEmailVerification) {
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
      } else {
        router.push('/')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      posthog.captureException(err instanceof Error ? err : new Error(message))
      setServerError(message)
    }
  }

  async function handleGoogle() {
    setServerError(null)
    setOauthLoading(true)
    posthog.capture('oauth_sign_in_initiated', { provider: 'google', page: 'sign_up' })
    try {
      await oauthSignIn('google')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Google sign-in failed')
      setOauthLoading(false)
    }
  }

  const isAnyLoading = isSubmitting || oauthLoading

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl p-8 bg-surface" style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)' }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-brand-primary)' }}>
          Create your account
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Join Manico Harvest today
        </p>

        {serverError && (
          <div
            className="mb-4 rounded-lg px-4 py-3 text-sm"
            style={{ background: 'var(--color-error-bg)', color: 'var(--color-error)', border: '1px solid var(--color-error)' }}
            role="alert"
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="su-name" className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              Name <span style={{ color: 'var(--color-text-secondary)' }}>(optional)</span>
            </label>
            <input
              id="su-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-describedby={errors.name ? 'su-name-error' : undefined}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              style={{
                background: 'var(--color-bg-subtle)',
                border: `1.5px solid ${errors.name ? 'var(--color-error)' : 'var(--color-border)'}`,
                color: 'var(--color-text-primary)',
              }}
              {...register('name')}
            />
            {errors.name && (
              <p id="su-name-error" role="alert" className="text-xs" style={{ color: 'var(--color-error)' }}>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="su-email" className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              Email
            </label>
            <input
              id="su-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby={errors.email ? 'su-email-error' : undefined}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              style={{
                background: 'var(--color-bg-subtle)',
                border: `1.5px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
                color: 'var(--color-text-primary)',
              }}
              {...register('email')}
            />
            {errors.email && (
              <p id="su-email-error" role="alert" className="text-xs" style={{ color: 'var(--color-error)' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="su-password" className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              Password
            </label>
            <div className="relative">
              <input
                id="su-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                aria-describedby={errors.password ? 'su-password-error' : undefined}
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-bg-subtle)',
                  border: `1.5px solid ${errors.password ? 'var(--color-error)' : 'var(--color-border)'}`,
                  color: 'var(--color-text-primary)',
                }}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--color-text-secondary)', transitionDuration: 'var(--duration-fast)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p id="su-password-error" role="alert" className="text-xs" style={{ color: 'var(--color-error)' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isAnyLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            style={{
              background: 'var(--color-brand-accent)',
              color: 'var(--color-bg-base)',
              transitionDuration: 'var(--duration-fast)',
            }}
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>or continue with</span>
          <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={isAnyLoading}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          style={{
            border: '1.5px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            transitionDuration: 'var(--duration-fast)',
          }}
        >
          {oauthLoading ? (
            <Loader2 size={16} className="animate-spin" style={{ color: 'var(--color-text-secondary)' }} />
          ) : (
            <GoogleIcon />
          )}
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link href="/sign-in" className="font-semibold hover:underline" style={{ color: 'var(--color-brand-accent)' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

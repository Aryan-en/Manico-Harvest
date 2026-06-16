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

type FormData = z.infer<typeof RegisterSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { register: registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(RegisterSchema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      const result = await registerUser(data.email, data.password, data.name)
      if (result.requireEmailVerification) {
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
      } else {
        router.push('/')
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-xl bg-surface p-8"
        style={{ boxShadow: 'var(--shadow-xl)' }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Create your account</h1>
        <p className="text-sm text-secondary mb-6">Join Manico Harvest today</p>

        {serverError && (
          <div
            className="mb-4 rounded-lg px-4 py-3 text-sm text-error"
            style={{ background: 'var(--color-error-bg)' }}
            role="alert"
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="su-name" className="text-sm font-medium text-foreground">
              Name <span className="text-secondary">(optional)</span>
            </label>
            <input
              id="su-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-describedby={errors.name ? 'su-name-error' : undefined}
              className="w-full rounded-md bg-subtle px-4 py-3 text-sm text-foreground placeholder:text-disabled transition-colors outline-none"
              style={{
                border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-border)'}`,
              }}
              {...register('name')}
            />
            {errors.name && (
              <p id="su-name-error" role="alert" className="text-sm text-error">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="su-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="su-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby={errors.email ? 'su-email-error' : undefined}
              className="w-full rounded-md bg-subtle px-4 py-3 text-sm text-foreground placeholder:text-disabled transition-colors outline-none"
              style={{
                border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
              }}
              {...register('email')}
            />
            {errors.email && (
              <p id="su-email-error" role="alert" className="text-sm text-error">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="su-password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <input
                id="su-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                aria-describedby={errors.password ? 'su-password-error' : undefined}
                className="w-full rounded-md bg-subtle px-4 py-3 pr-11 text-sm text-foreground placeholder:text-disabled transition-colors outline-none"
                style={{
                  border: `1px solid ${errors.password ? 'var(--color-error)' : 'var(--color-border)'}`,
                }}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p id="su-password-error" role="alert" className="text-sm text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-inverse bg-accent hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          <span className="text-xs text-secondary">or continue with</span>
          <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        </div>

        {/* OAuth */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-foreground hover:bg-subtle transition-colors"
            style={{
              border: '1px solid var(--color-border)',
              transitionDuration: 'var(--duration-fast)',
            }}
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-foreground hover:bg-subtle transition-colors"
            style={{
              border: '1px solid var(--color-border)',
              transitionDuration: 'var(--duration-fast)',
            }}
          >
            <GitHubIcon />
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-secondary">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-medium text-accent hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

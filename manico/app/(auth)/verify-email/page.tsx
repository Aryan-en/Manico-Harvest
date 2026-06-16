'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, MailCheck, RefreshCw } from 'lucide-react'
import { z } from 'zod'
import { useAuth } from '@/hooks/use-auth'
import posthog from 'posthog-js'

const OtpSchema = z.object({ otp: z.string().length(6, 'Enter the 6-digit code') })
type FormData = z.infer<typeof OtpSchema>

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const [serverError, setServerError] = useState<string | null>(null)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const { verifyEmail } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(OtpSchema) })

  async function onSubmit(data: FormData) {
    if (!email) return
    setServerError(null)
    try {
      await verifyEmail(email, data.otp)
      posthog.identify(email, { email })
      posthog.capture('email_verification_completed', { email })
      router.push('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed'
      posthog.captureException(err instanceof Error ? err : new Error(message))
      setServerError(message)
    }
  }

  async function handleResend() {
    if (!email || resendStatus !== 'idle') return
    setResendStatus('sending')
    try {
      await fetch('/api/v1/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setResendStatus('sent')
      // Allow resend again after 60s
      setTimeout(() => setResendStatus('idle'), 60_000)
    } catch {
      setResendStatus('idle')
    }
  }

  if (!email) {
    return (
      <div className="w-full max-w-md text-center">
        <p className="text-secondary mb-4">No email address provided.</p>
        <Link href="/sign-up" className="text-sm font-medium text-accent hover:underline">
          Back to Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-xl bg-surface p-8"
        style={{ boxShadow: 'var(--shadow-xl)' }}
      >
        <div className="flex justify-center mb-4">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full"
            style={{ background: 'var(--color-success-bg)' }}
          >
            <MailCheck size={24} style={{ color: 'var(--color-success)' }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1 text-center">Check your email</h1>
        <p className="text-sm text-secondary mb-6 text-center">
          We sent a 6-digit code to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>

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
          <div className="space-y-1">
            <label htmlFor="ve-otp" className="text-sm font-medium text-foreground">
              Verification code
            </label>
            <input
              id="ve-otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="123456"
              aria-describedby={errors.otp ? 've-otp-error' : undefined}
              className="w-full rounded-md bg-subtle px-4 py-3 text-sm text-foreground placeholder:text-disabled tracking-[0.25em] text-center outline-none transition-colors"
              style={{
                border: `1px solid ${errors.otp ? 'var(--color-error)' : 'var(--color-border)'}`,
              }}
              {...register('otp')}
            />
            {errors.otp && (
              <p id="ve-otp-error" role="alert" className="text-sm text-error">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-inverse bg-accent hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? 'Verifying…' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-secondary mb-2">Didn&apos;t receive it?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendStatus !== 'idle'}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
          >
            <RefreshCw size={14} className={resendStatus === 'sending' ? 'animate-spin' : ''} />
            {resendStatus === 'sent' ? 'Code sent! Check your inbox' : 'Resend code'}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-secondary">
          <Link href="/sign-in" className="font-medium text-accent hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

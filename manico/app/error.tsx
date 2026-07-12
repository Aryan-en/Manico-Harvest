'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'
import posthog from 'posthog-js'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    posthog.captureException(error)
  }, [error])

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg-base)' }}
    >
      <div className="text-center max-w-md">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ background: 'var(--color-error-bg)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-brand-primary)' }}>
          Something went wrong
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          An unexpected error occurred. Try again, or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="w-full sm:w-auto flex items-center justify-center gap-2 font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90"
            style={{
              background: 'var(--color-brand-accent)',
              color: 'var(--color-text-inverse)',
              padding: '13px 28px',
            }}
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto font-semibold rounded-xl transition-all active:scale-[0.98]"
            style={{
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-brand-primary)',
              padding: '12px 28px',
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

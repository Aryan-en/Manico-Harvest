'use client'

import { useState } from 'react'
import { Search, PackageSearch } from 'lucide-react'
import posthog from 'posthog-js'

export function TrackOrderForm() {
  const [searched, setSearched] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    posthog.capture('order_tracked')
    setSearched(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 space-y-1.5">
          <label htmlFor="order-id" className="sr-only">Order number</label>
          <input
            id="order-id"
            type="text"
            required
            placeholder="Order number (e.g. MH-10234)"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            style={{ background: 'var(--color-bg-subtle)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <label htmlFor="order-email" className="sr-only">Email address</label>
          <input
            id="order-email"
            type="email"
            inputMode="email"
            required
            placeholder="Email used at checkout"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            style={{ background: 'var(--color-bg-subtle)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-[0.98] shrink-0"
          style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)' }}
        >
          <Search size={16} aria-hidden="true" />
          Track
        </button>
      </form>

      {searched && (
        <div
          className="flex flex-col items-center text-center gap-3 rounded-2xl p-10 mt-8"
          style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}
        >
          <PackageSearch size={36} style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true" />
          <p className="font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
            No order found with those details
          </p>
          <p className="text-sm max-w-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Double-check your order number and email, or reach out to our support team for help.
          </p>
          <a
            href="/contact"
            className="text-sm font-semibold hover:underline mt-1"
            style={{ color: 'var(--color-brand-accent)' }}
          >
            Contact Support →
          </a>
        </div>
      )}
    </div>
  )
}

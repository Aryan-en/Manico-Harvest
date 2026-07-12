'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'
import posthog from 'posthog-js'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    posthog.capture('contact_form_submitted', {
      subject: formData.get('subject'),
    })
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center text-center gap-3 rounded-2xl p-10"
        style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success)' }}
      >
        <CheckCircle2 size={40} style={{ color: 'var(--color-success)' }} aria-hidden="true" />
        <h3 className="font-bold text-lg" style={{ color: 'var(--color-brand-primary)' }}>
          Message sent!
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Thanks for reaching out. Our team will get back to you within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="cf-name" className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            style={{ background: 'var(--color-bg-subtle)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="cf-email" className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            style={{ background: 'var(--color-bg-subtle)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="cf-subject" className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          Subject
        </label>
        <select
          id="cf-subject"
          name="subject"
          required
          defaultValue=""
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
          style={{ background: 'var(--color-bg-subtle)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-primary)' }}
        >
          <option value="" disabled>Select a topic</option>
          <option value="order">Order Support</option>
          <option value="product">Product Question</option>
          <option value="wholesale">Wholesale Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="cf-message" className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
          style={{ background: 'var(--color-bg-subtle)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-primary)' }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)' }}
      >
        {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

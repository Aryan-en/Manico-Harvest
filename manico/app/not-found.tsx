import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center" style={{ background: 'var(--color-bg-base)' }}>
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-24 text-center animate-fade-in">
          <p
            className="text-7xl sm:text-8xl font-bold mb-4 animate-float"
            style={{ color: 'var(--color-brand-accent)' }}
          >
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--color-brand-primary)' }}>
            This page wandered off the trail
          </h1>
          <p className="text-sm max-w-md mx-auto mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            We couldn&apos;t find what you were looking for. It may have been moved, or the link might be broken.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'var(--color-brand-accent)',
                color: 'var(--color-text-inverse)',
                padding: '13px 28px',
              }}
            >
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto font-semibold rounded-xl transition-all active:scale-[0.98] hover:-translate-y-0.5"
              style={{
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-brand-primary)',
                padding: '12px 28px',
              }}
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

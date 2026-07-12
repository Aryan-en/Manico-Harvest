import type { Metadata } from 'next'
import Link from 'next/link'
import { Sprout } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Blog — Manico Harvest',
  description: 'Recipes, nutrition tips, and stories from the Manico Harvest kitchen — coming soon.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader eyebrow="STORIES & RECIPES" title="The Manico Journal" />
        <section className="py-20 sm:py-28">
          <div className="mx-auto w-full max-w-[560px] px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 animate-float"
              style={{ background: 'var(--color-bg-subtle)' }}
            >
              <Sprout size={28} style={{ color: 'var(--color-brand-accent)' }} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-brand-primary)' }}>
              We&apos;re writing our first stories
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Recipes, nutrition deep-dives, and behind-the-scenes stories from our kitchen are coming
              soon. Subscribe to our newsletter on the homepage to be the first to know.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)', padding: '12px 24px', fontSize: '14px' }}
            >
              Shop Products Instead
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Benefits — Manico Harvest',
  description: 'The science and tradition behind Manico Harvest ingredients — protein, fiber, immunity, and sustained energy.',
}

const BENEFITS = [
  {
    icon: '🌿',
    title: 'Plant-Based Protein',
    description: 'Chana, jowar, and quinoa deliver complete amino acid profiles without the digestive load of whey or synthetic isolates.',
    products: ['Moringa Sattu', 'Mushroom Quinoa Dosa Mix'],
  },
  {
    icon: '🍄',
    title: 'Functional Mushrooms',
    description: 'Oyster mushroom extracts support immune modulation and provide a caffeine-free alternative for sustained mental clarity.',
    products: ['Mushroom Coffee', 'Mushroom Moringa Infusion'],
  },
  {
    icon: '🌾',
    title: 'High Fiber, Low GI',
    description: 'Millets and whole grains slow glucose release, supporting stable energy and better satiety — ideal for diabetic-friendly diets.',
    products: ['Multi Millet Chilla', 'Mushroom Quinoa Dosa Mix'],
  },
  {
    icon: '💧',
    title: 'Caffeine-Free Energy',
    description: 'Chicory root and adaptogenic mushrooms provide a gentle lift without the jitters, crashes, or sleep disruption of coffee.',
    products: ['Mushroom Coffee'],
  },
  {
    icon: '🛡️',
    title: 'Immunity Support',
    description: 'Sea buckthorn and moringa are rich in Vitamin C and antioxidants, supporting the body’s natural immune response.',
    products: ['Mushroom Moringa Infusion'],
  },
  {
    icon: '🧘',
    title: 'Stress & Recovery',
    description: 'Adaptogenic herbs used in Ayurvedic tradition to help the body respond to physical and mental stress more effectively.',
    products: ['Mushroom Moringa Infusion', 'Moringa Sattu'],
  },
]

export default function BenefitsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader
          eyebrow="THE SCIENCE"
          title="Nutrition That Actually Works"
          description="Every ingredient in Manico Harvest products is chosen for a specific functional benefit — not just flavour."
        />

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((benefit, i) => (
                <Reveal
                  key={benefit.title}
                  delay={i * 80}
                  className="flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-base)' }}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-4"
                    style={{ background: 'var(--color-bg-subtle)' }}
                    aria-hidden="true"
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-brand-primary)' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {benefit.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                    {benefit.products.map((p) => (
                      <span
                        key={p}
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-brand-primary)' }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: 'var(--color-brand-primary)' }}>
          <Reveal variant="scale" className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--color-text-inverse)' }}>
              Find the right product for your goals
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)', padding: '13px 28px' }}
            >
              Explore Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}

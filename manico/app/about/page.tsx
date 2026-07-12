import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Our Story — Manico Harvest',
  description: 'How Manico Harvest brings Ayurvedic wisdom and functional foods into the modern kitchen.',
}

const VALUES = [
  {
    title: 'Whole, Traceable Ingredients',
    description: 'Every batch is sourced from farms we know by name — moringa from the Nilgiris, oyster mushrooms grown in controlled Himalayan facilities, millets from smallholder cooperatives.',
  },
  {
    title: 'Clean Label, Always',
    description: 'No artificial preservatives, colours, or flavours. No added sugar. What’s written on the pack is exactly what’s inside — nothing hidden.',
  },
  {
    title: 'Rooted in Tradition',
    description: 'Our recipes draw on centuries of Ayurvedic food science, reimagined for how people actually eat today — fast, functional, and on the go.',
  },
  {
    title: 'Built to Nourish, Not Just Sell',
    description: 'We formulate for real nutritional outcomes — protein density, fiber, sustained energy — not just shelf appeal.',
  },
]

const TIMELINE = [
  { year: '2022', title: 'The idea', text: 'Started in a home kitchen in Bengaluru, reformulating grandmother’s Sattu recipe for modern nutrition needs.' },
  { year: '2023', title: 'First harvest', text: 'Launched Moringa Sattu and Multi Millet Chilla mix to friends and family — sold out in 48 hours.' },
  { year: '2024', title: 'Growing the range', text: 'Introduced Mushroom Coffee and functional mushroom-based drinks, partnering directly with Himalayan growers.' },
  { year: '2026', title: 'Manico Harvest today', text: 'Serving thousands of households across India with five core products — and growing.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader
          eyebrow="OUR STORY"
          title="Ancient Wisdom, Made for Today"
          description="Manico Harvest began with a simple question: why does eating well have to mean choosing between tradition and convenience?"
        />

        {/* Mission */}
        <section className="py-16 sm:py-20">
          <Reveal className="mx-auto w-full max-w-[880px] px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--color-text-primary)', lineHeight: '1.8' }}>
              We&apos;re a small team obsessed with one thing: bringing the functional foods of Ayurvedic
              tradition — moringa, millets, functional mushrooms, basil seeds — into products that fit
              a modern life. No compromises on ingredients. No shortcuts on nutrition. Just real food,
              made simply.
            </p>
          </Reveal>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-20" style={{ background: 'var(--color-bg-subtle)' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--color-brand-accent)' }}>
                WHAT WE STAND FOR
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                Our Values
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((value, i) => (
                <Reveal
                  key={value.title}
                  delay={i * 90}
                  className="flex gap-5 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-base)' }}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm shrink-0"
                    style={{ background: 'var(--color-brand-primary)', color: 'var(--color-text-inverse)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-base mb-1.5" style={{ color: 'var(--color-brand-primary)' }}>
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[880px] px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--color-brand-accent)' }}>
                THE JOURNEY
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                How We Got Here
              </h2>
            </div>
            <div className="relative pl-8">
              <div
                className="absolute left-[9px] top-2 bottom-2 w-px"
                style={{ background: 'var(--color-border)' }}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-10">
                {TIMELINE.map((item) => (
                  <div key={item.year} className="relative">
                    <span
                      className="absolute -left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--color-brand-accent)' }}
                      aria-hidden="true"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-text-inverse)' }} />
                    </span>
                    <p className="text-sm font-bold tracking-wide mb-1" style={{ color: 'var(--color-brand-accent)' }}>
                      {item.year}
                    </p>
                    <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-brand-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ background: 'var(--color-brand-primary)' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--color-text-inverse)' }}>
              Ready to taste the difference?
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)', padding: '13px 28px' }}
            >
              Shop All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

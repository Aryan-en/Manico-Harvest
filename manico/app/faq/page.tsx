import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { FaqAccordion } from '@/components/faq/FaqAccordion'

export const metadata: Metadata = {
  title: 'FAQ — Manico Harvest',
  description: 'Answers to common questions about Manico Harvest products, orders, shipping, and ingredients.',
}

const FAQ_SECTIONS = [
  {
    heading: 'Products & Ingredients',
    items: [
      { question: 'Are your products vegan?', answer: 'Yes — every Manico Harvest product is 100% plant-based, with no animal-derived ingredients.' },
      { question: 'Do your products contain gluten?', answer: 'Most products are made from millets and gluten-free grains. Please check individual product labels for specific allergen information.' },
      { question: 'How should I store the products after opening?', answer: 'Store in a cool, dry place in an airtight container. Refrigeration is not required but can extend freshness for opened packs.' },
      { question: 'What is the shelf life?', answer: 'Unopened products have a shelf life of 9–12 months from the manufacturing date, printed on the pack.' },
    ],
  },
  {
    heading: 'Orders & Payment',
    items: [
      { question: 'What payment methods do you accept?', answer: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets through our secure checkout.' },
      { question: 'Can I modify or cancel my order after placing it?', answer: 'Orders can be modified or cancelled within 2 hours of placement. Contact our support team as soon as possible.' },
      { question: 'Do you offer subscriptions or bulk orders?', answer: 'Yes — reach out via our Contact page for wholesale and recurring order pricing.' },
    ],
  },
  {
    heading: 'Shipping & Delivery',
    items: [
      { question: 'How long does delivery take?', answer: 'Orders are typically delivered within 3–7 business days depending on your location. Metro cities usually see faster delivery.' },
      { question: 'Do you ship internationally?', answer: 'Currently we ship only within India. International shipping is on our roadmap — sign up for our newsletter to be notified.' },
      { question: 'Is shipping free?', answer: 'Yes, on all orders above ₹499. Orders below that threshold have a flat shipping fee calculated at checkout.' },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader
          eyebrow="SUPPORT"
          title="Frequently Asked Questions"
          description="Everything you need to know about our products, orders, and shipping."
        />

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12">
              {FAQ_SECTIONS.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-bold text-xl mb-5" style={{ color: 'var(--color-brand-primary)' }}>
                    {section.heading}
                  </h2>
                  <FaqAccordion items={section.items} />
                </div>
              ))}
            </div>

            <div
              className="mt-12 rounded-2xl p-8 text-center"
              style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-semibold mb-2" style={{ color: 'var(--color-brand-primary)' }}>
                Still have questions?
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Our support team is happy to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90"
                style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)', padding: '11px 22px', fontSize: '14px' }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

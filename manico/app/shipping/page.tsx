import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PolicyLayout, PolicySection } from '@/components/layout/PolicyContent'

export const metadata: Metadata = {
  title: 'Shipping Policy — Manico Harvest',
  description: 'Delivery timelines, shipping charges, and coverage areas for Manico Harvest orders.',
}

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader eyebrow="POLICIES" title="Shipping Policy" />
        <PolicyLayout updatedAt="July 2026">
          <PolicySection title="Delivery Timelines">
            <p>
              Orders are processed within 1–2 business days of confirmation. Once shipped, delivery
              typically takes 3–7 business days depending on your location. Metro cities (Bengaluru,
              Mumbai, Delhi, Chennai, Hyderabad, Pune) usually receive orders faster.
            </p>
          </PolicySection>
          <PolicySection title="Shipping Charges">
            <p>
              Shipping is free on all orders above ₹499. Orders below this threshold carry a flat
              shipping fee of ₹49, calculated automatically at checkout.
            </p>
          </PolicySection>
          <PolicySection title="Coverage Areas">
            <p>
              We currently ship to all serviceable pin codes across India via our logistics partners.
              International shipping is not yet available but is on our roadmap.
            </p>
          </PolicySection>
          <PolicySection title="Order Tracking">
            <p>
              Once your order ships, you&apos;ll receive a tracking link via email and SMS. You can also
              check your order status anytime from the{' '}
              <a href="/track" className="font-medium hover:underline" style={{ color: 'var(--color-brand-accent)' }}>
                Track Order
              </a>{' '}
              page.
            </p>
          </PolicySection>
        </PolicyLayout>
      </main>
      <Footer />
    </>
  )
}

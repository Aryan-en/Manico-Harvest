import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PolicyLayout, PolicySection } from '@/components/layout/PolicyContent'

export const metadata: Metadata = {
  title: 'Returns & Refunds — Manico Harvest',
  description: 'Our return, replacement, and refund policy for Manico Harvest orders.',
}

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader eyebrow="POLICIES" title="Returns & Refunds" />
        <PolicyLayout updatedAt="July 2026">
          <PolicySection title="7-Day Return Window">
            <p>
              Since our products are consumables, we accept returns only for items that arrive damaged,
              defective, or incorrect — within 7 days of delivery. Please retain the original packaging
              for any return request.
            </p>
          </PolicySection>
          <PolicySection title="How to Request a Return">
            <p>
              Contact our support team at hello@manicoharvest.com with your order number and photos of
              the issue. We&apos;ll respond within 1–2 business days with next steps.
            </p>
          </PolicySection>
          <PolicySection title="Refunds">
            <p>
              Approved refunds are processed to your original payment method within 5–7 business days.
              You&apos;ll receive an email confirmation once the refund is initiated.
            </p>
          </PolicySection>
          <PolicySection title="Non-Returnable Items">
            <p>
              For hygiene and safety reasons, opened food products cannot be returned unless defective.
              Sale items and products purchased with a discount code are final sale unless damaged in transit.
            </p>
          </PolicySection>
        </PolicyLayout>
      </main>
      <Footer />
    </>
  )
}

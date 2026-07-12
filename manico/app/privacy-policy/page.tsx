import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PolicyLayout, PolicySection } from '@/components/layout/PolicyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy — Manico Harvest',
  description: 'How Manico Harvest collects, uses, and protects your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader eyebrow="LEGAL" title="Privacy Policy" />
        <PolicyLayout updatedAt="July 2026">
          <PolicySection title="Information We Collect">
            <p>
              We collect information you provide directly — name, email, shipping address, and payment
              details — when you create an account or place an order. We also collect usage data
              (pages visited, products viewed) to improve our storefront experience.
            </p>
          </PolicySection>
          <PolicySection title="How We Use Your Information">
            <p>
              Your information is used to process orders, provide customer support, send order updates,
              and — with your consent — share product news and offers. We never sell your personal data
              to third parties.
            </p>
          </PolicySection>
          <PolicySection title="Data Security">
            <p>
              Payment information is processed securely through PCI-compliant payment processors. We do
              not store full card details on our servers. Account passwords are encrypted using
              industry-standard hashing.
            </p>
          </PolicySection>
          <PolicySection title="Your Rights">
            <p>
              You can request access to, correction of, or deletion of your personal data at any time by
              contacting hello@manicoharvest.com. You may also unsubscribe from marketing emails using
              the link in any email we send.
            </p>
          </PolicySection>
          <PolicySection title="Cookies">
            <p>
              We use cookies and similar technologies to keep you signed in, remember your cart, and
              understand how visitors use our site through analytics tools.
            </p>
          </PolicySection>
        </PolicyLayout>
      </main>
      <Footer />
    </>
  )
}

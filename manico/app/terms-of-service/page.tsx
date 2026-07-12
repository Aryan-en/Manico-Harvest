import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PolicyLayout, PolicySection } from '@/components/layout/PolicyContent'

export const metadata: Metadata = {
  title: 'Terms of Service — Manico Harvest',
  description: 'The terms and conditions governing your use of Manico Harvest and its products.',
}

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader eyebrow="LEGAL" title="Terms of Service" />
        <PolicyLayout updatedAt="July 2026">
          <PolicySection title="Acceptance of Terms">
            <p>
              By accessing or using the Manico Harvest website and placing an order, you agree to be
              bound by these Terms of Service and our Privacy Policy.
            </p>
          </PolicySection>
          <PolicySection title="Orders & Pricing">
            <p>
              All prices are listed in Indian Rupees (₹) and are subject to change without notice. We
              reserve the right to refuse or cancel any order at our discretion, including in cases of
              suspected fraud or pricing errors.
            </p>
          </PolicySection>
          <PolicySection title="Product Information">
            <p>
              We make every effort to ensure product descriptions, images, and nutritional information
              are accurate. Actual packaging may vary slightly. Always check the label for the most
              current ingredient and allergen information.
            </p>
          </PolicySection>
          <PolicySection title="Account Responsibility">
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and
              for all activity that occurs under your account.
            </p>
          </PolicySection>
          <PolicySection title="Limitation of Liability">
            <p>
              Manico Harvest is not liable for any indirect, incidental, or consequential damages
              arising from the use of our products or website, to the fullest extent permitted by law.
            </p>
          </PolicySection>
          <PolicySection title="Governing Law">
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts in Bengaluru, Karnataka.
            </p>
          </PolicySection>
        </PolicyLayout>
      </main>
      <Footer />
    </>
  )
}

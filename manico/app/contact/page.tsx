import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Manico Harvest',
  description: 'Get in touch with Manico Harvest — order support, product questions, and wholesale inquiries.',
}

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hello@manicoharvest.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Studio', value: 'Bengaluru, Karnataka, India' },
  { icon: Clock, label: 'Support Hours', value: 'Mon–Sat, 10am – 6pm IST' },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader
          eyebrow="GET IN TOUCH"
          title="We'd Love to Hear From You"
          description="Questions about an order, a product, or a wholesale partnership? Reach out — we typically reply within 1–2 business days."
        />

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Contact info */}
              <div className="w-full lg:w-80 shrink-0">
                <h2 className="font-bold text-lg mb-6" style={{ color: 'var(--color-brand-primary)' }}>
                  Contact Details
                </h2>
                <div className="flex flex-col gap-5">
                  {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                        style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-brand-accent)' }}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                          {label}
                        </p>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div
                className="flex-1 rounded-2xl p-6 sm:p-8"
                style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

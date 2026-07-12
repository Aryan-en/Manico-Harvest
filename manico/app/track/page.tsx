import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { TrackOrderForm } from '@/components/track/TrackOrderForm'

export const metadata: Metadata = {
  title: 'Track Order — Manico Harvest',
  description: 'Track the status of your Manico Harvest order.',
}

export default function TrackOrderPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader
          eyebrow="ORDER STATUS"
          title="Track Your Order"
          description="Enter your order number and the email you used at checkout to see the latest status."
        />
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[640px] px-4 sm:px-6 lg:px-8 animate-fade-in">
            <TrackOrderForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

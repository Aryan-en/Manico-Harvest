import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function PDPLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
            {/* Image skeleton */}
            <div
              className="w-full lg:w-1/2 rounded-2xl"
              style={{ aspectRatio: '1/1', background: 'var(--color-bg-subtle)' }}
            />
            {/* Details skeleton */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="h-3 w-24 rounded" style={{ background: 'var(--color-bg-subtle)' }} />
              <div className="h-10 w-3/4 rounded" style={{ background: 'var(--color-bg-subtle)' }} />
              <div className="h-5 w-full rounded" style={{ background: 'var(--color-bg-subtle)' }} />
              <div className="h-5 w-2/3 rounded" style={{ background: 'var(--color-bg-subtle)' }} />
              <div className="flex gap-2 mt-2">
                <div className="h-4 w-24 rounded" style={{ background: 'var(--color-bg-subtle)' }} />
                <div className="h-4 w-24 rounded" style={{ background: 'var(--color-bg-subtle)' }} />
              </div>
              <div className="h-12 w-full rounded-xl mt-4" style={{ background: 'var(--color-bg-subtle)' }} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

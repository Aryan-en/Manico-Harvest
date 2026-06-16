import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'

export default function ShopLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        {/* Page Header Skeleton */}
        <div className="py-12" style={{ background: 'var(--color-brand-primary)' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="h-3 w-24 rounded mb-3 animate-pulse" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <div className="h-9 w-64 rounded animate-pulse mb-3" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <div className="h-4 w-80 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Sidebar skeleton */}
            <div className="w-full lg:w-64 shrink-0 space-y-3">
              <div className="h-10 rounded-xl animate-pulse" style={{ background: 'var(--color-bg-subtle)' }} />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-9 rounded-lg animate-pulse" style={{ background: 'var(--color-bg-subtle)' }} />
              ))}
            </div>
            {/* Grid skeleton */}
            <div className="flex-1 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

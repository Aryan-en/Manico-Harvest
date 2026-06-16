import type { ReactElement } from 'react'
import Link from 'next/link'
import { insforge } from '@/lib/insforge'
import type { Product } from '@/types/product'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'

async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await insforge.database
    .from('products')
    .select('*, product_tags(tag), categories(id, name, slug)')
    .eq('is_active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error || !data) return []
  return data as unknown as Product[]
}

export async function FeaturedProducts(): Promise<ReactElement> {
  const products = await getFeaturedProducts()

  return (
    <section className="py-20" style={{ background: 'var(--color-bg-base)' }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--color-brand-accent)' }}>
            OUR PRODUCTS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-brand-primary)' }}>
            Functional Foods for
            <br className="hidden sm:block" /> Real Nourishment
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Thoughtfully crafted with wholesome, clean ingredients — no fillers, no compromises.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <ProductCardSkeleton featured />
            <ProductCardSkeleton featured />
          </div>
        ) : (
          <>
            {/* Top row — up to 2 featured products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {products.slice(0, 2).map((product) => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>

            {/* Bottom row — remaining products */}
            {products.length > 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {products.slice(2).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90"
            style={{
              background: 'var(--color-brand-primary)',
              color: 'var(--color-text-inverse)',
              padding: '13px 28px',
              transitionDuration: 'var(--duration-fast)',
            }}
          >
            View Full Shop
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}

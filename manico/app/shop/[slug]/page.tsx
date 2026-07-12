import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { insforge } from '@/lib/insforge'
import type { Product } from '@/types/product'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { ProductCard } from '@/components/product/ProductCard'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Reveal } from '@/components/motion/Reveal'
import type { Metadata } from 'next'

type Params = { params: Promise<{ slug: string }> }

async function getProduct(slug: string): Promise<Product | null> {
  const { data } = await insforge.database
    .from('products')
    .select('*, product_tags(tag), categories(id, name, slug)')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  return data as unknown as Product | null
}

async function getRelated(categoryId: string | null, currentId: string): Promise<Product[]> {
  if (!categoryId) return []
  const { data } = await insforge.database
    .from('products')
    .select('*, product_tags(tag), categories(id, name, slug)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', currentId)
    .limit(4)

  return (data ?? []) as unknown as Product[]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found — Manico Harvest' }

  return {
    title: `${product.name} — Manico Harvest`,
    description: product.tagline ?? product.description ?? `Buy ${product.name} from Manico Harvest`,
    openGraph: {
      title: product.name,
      description: product.tagline ?? '',
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
  }
}

export default async function PDPPage({ params }: Params) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const related = await getRelated(product.category_id, product.id)

  const inStock = product.stock > 0

  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        {/* Breadcrumb */}
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb" style={{ color: 'var(--color-text-secondary)' }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" className="hover:underline">Shop</Link>
            {product.categories && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={`/shop?category=${product.categories.slug}`} className="hover:underline">
                  {product.categories.name}
                </Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--color-text-primary)' }}>{product.name}</span>
          </nav>
        </div>

        {/* Product section */}
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div
                className="group relative w-full rounded-2xl overflow-hidden animate-scale-in"
                style={{
                  aspectRatio: '1/1',
                  background: 'linear-gradient(145deg, #f5ead6 0%, var(--color-bg-base) 100%)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {product.badge && (
                  <span
                    className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                    style={{
                      background: product.badge_variant === 'green'
                        ? 'var(--color-brand-primary)'
                        : 'var(--color-brand-accent)',
                      color: 'var(--color-text-inverse)',
                    }}
                  >
                    {product.badge}
                  </span>
                )}
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain p-8 transition-transform group-hover:scale-105"
                    style={{ transitionDuration: 'var(--duration-slow)' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ color: 'var(--color-border-strong)' }} aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2 flex flex-col animate-fade-in" style={{ animationDelay: '100ms' }}>
              {product.categories && (
                <Link
                  href={`/shop?category=${product.categories.slug}`}
                  className="text-xs font-bold tracking-widest uppercase mb-3 hover:underline"
                  style={{ color: 'var(--color-brand-accent)' }}
                >
                  {product.categories.name}
                </Link>
              )}

              <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight" style={{ color: 'var(--color-brand-primary)' }}>
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.tagline}
                </p>
              )}

              {/* Benefits */}
              {product.product_tags && product.product_tags.length > 0 && (
                <ul className="flex flex-col gap-2 mb-6">
                  {product.product_tags.map(({ tag }) => (
                    <li key={tag} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                        style={{ background: 'var(--color-brand-accent)' }}
                        aria-hidden="true"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {product.description && (
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.description}
                </p>
              )}

              {/* Price + Weight */}
              <div
                className="flex items-center gap-6 py-4 mb-6"
                style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
              >
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>Price</p>
                  <p className="text-4xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                    ₹{product.price}
                  </p>
                </div>
                {product.weight && (
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>Net Weight</p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--color-brand-primary)' }}>{product.weight}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>Availability</p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: inStock ? 'var(--color-success)' : 'var(--color-error)' }}
                  >
                    {inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </p>
                </div>
              </div>

              {/* Add to Cart */}
              {inStock ? (
                <AddToCartButton
                  product={{
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: Number(product.price),
                    image_url: product.image_url,
                    weight: product.weight,
                  }}
                  showQuantityPicker
                />
              ) : (
                <button
                  disabled
                  className="w-full py-4 rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed"
                  style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)', border: '1.5px solid var(--color-border)' }}
                >
                  Out of Stock
                </button>
              )}

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { icon: '🚚', label: 'Free Shipping', sub: 'Above ₹499' },
                  { icon: '🌿', label: 'No Fillers', sub: 'Clean ingredients' },
                  { icon: '✅', label: 'Easy Returns', sub: '7 day policy' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-brand-primary)' }}>{item.label}</p>
                    <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <Reveal as="h2" className="text-2xl font-bold mb-8" style={{ color: 'var(--color-brand-primary)' }}>
                You Might Also Like
              </Reveal>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={i * 80}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

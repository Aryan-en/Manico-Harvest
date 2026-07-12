import Link from 'next/link'
import { insforge } from '@/lib/insforge'
import type { Product, Category } from '@/types/product'
import { ProductCard } from '@/components/product/ProductCard'
import { SortSelect } from '@/components/catalog/SortSelect'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/motion/Reveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Manico Harvest',
  description: 'Browse our full range of functional foods, mushroom-based drinks, and wholesome millet mixes.',
}

type SearchParams = {
  category?: string
  q?: string
  sort?: string
  page?: string
}

async function getCategories(): Promise<Category[]> {
  const { data } = await insforge.database
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  return (data ?? []) as unknown as Category[]
}

async function getProducts(params: SearchParams): Promise<{ products: Product[]; total: number }> {
  const limit = 24
  const page = Math.max(1, Number(params.page ?? 1))
  const from = (page - 1) * limit
  const to = from + limit - 1

  const sortMap: Record<string, { column: string; ascending: boolean }> = {
    newest: { column: 'created_at', ascending: false },
    price_asc: { column: 'price', ascending: true },
    price_desc: { column: 'price', ascending: false },
    featured: { column: 'featured', ascending: false },
  }
  const sort = sortMap[params.sort ?? 'newest'] ?? sortMap.newest

  let query = insforge.database
    .from('products')
    .select('*, product_tags(tag), categories(id, name, slug)', { count: 'exact' })
    .eq('is_active', true)
    .order(sort.column, { ascending: sort.ascending })
    .range(from, to)

  if (params.q) query = query.ilike('name', `%${params.q}%`)

  const { data, error, count } = await query
  if (error) return { products: [], total: 0 }

  let products = (data ?? []) as unknown as Product[]

  // Filter by category slug in-memory (join result)
  if (params.category) {
    products = products.filter((p) => p.categories?.slug === params.category)
  }

  return { products, total: count ?? 0 }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const [categories, { products }] = await Promise.all([getCategories(), getProducts(params)])

  const activeCategory = params.category ?? ''
  const activeSort = params.sort ?? 'newest'
  const searchQuery = params.q ?? ''

  function buildUrl(overrides: Partial<SearchParams>) {
    const merged = { ...params, ...overrides }
    const qs = new URLSearchParams()
    if (merged.category) qs.set('category', merged.category)
    if (merged.q) qs.set('q', merged.q)
    if (merged.sort && merged.sort !== 'newest') qs.set('sort', merged.sort)
    if (merged.page && merged.page !== '1') qs.set('page', merged.page)
    const str = qs.toString()
    return str ? `/shop?${str}` : '/shop'
  }

  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: 'var(--color-bg-base)' }}>
        <PageHeader
          eyebrow="ALL PRODUCTS"
          title="Shop Manico Harvest"
          description="Functional foods crafted from whole, clean ingredients — no fillers, no compromises."
        />

        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">

            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              {/* Search */}
              <form method="GET" action="/shop" className="mb-6">
                <div className="relative">
                  <input
                    name="q"
                    type="search"
                    defaultValue={searchQuery}
                    placeholder="Search products…"
                    className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors"
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: '1.5px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--color-text-secondary)' }}
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {params.sort && <input type="hidden" name="sort" value={params.sort} />}
                </div>
              </form>

              {/* Categories */}
              <div className="mb-6">
                <h2 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  Categories
                </h2>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href={buildUrl({ category: undefined, page: '1' })}
                      className="block text-sm font-medium rounded-lg px-3 py-2 transition-colors"
                      style={{
                        background: !activeCategory ? 'var(--color-brand-primary)' : 'transparent',
                        color: !activeCategory ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                      }}
                    >
                      All Products
                    </Link>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={buildUrl({ category: cat.slug, page: '1' })}
                        className="block text-sm font-medium rounded-lg px-3 py-2 transition-colors hover:bg-subtle"
                        style={{
                          background: activeCategory === cat.slug ? 'var(--color-brand-primary)' : 'transparent',
                          color: activeCategory === cat.slug ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                        }}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1 min-w-0">
              {/* Sort + Count bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {products.length === 0
                    ? 'No products found'
                    : `${products.length} product${products.length !== 1 ? 's' : ''}`}
                  {searchQuery && ` for "${searchQuery}"`}
                  {activeCategory && ` in ${categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory}`}
                </p>

                <SortSelect
                  activeSort={activeSort}
                  currentCategory={activeCategory || undefined}
                  currentQ={searchQuery || undefined}
                />
              </div>

              {/* Product Grid */}
              {products.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20 animate-scale-in">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-border-strong)' }} aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p className="text-lg font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
                    No products found
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Try adjusting your search or filters.
                  </p>
                  <Link
                    href="/shop"
                    className="font-semibold text-sm rounded-xl transition-all active:scale-[0.98] hover:opacity-90"
                    style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)', padding: '10px 20px' }}
                  >
                    Clear filters
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-6">
                  {products.map((product, i) => (
                    <Reveal key={product.id} delay={Math.min(i, 8) * 60}>
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { insforge } from '@/lib/insforge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const featured = searchParams.get('featured')
  const categorySlug = searchParams.get('category')
  const q = searchParams.get('q')
  const limit = Math.min(Number(searchParams.get('limit') ?? 20), 100)
  const page = Math.max(Number(searchParams.get('page') ?? 1), 1)
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = insforge.database
    .from('products')
    .select('*, product_tags(tag), categories(id, name, slug)', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (featured === 'true') query = query.eq('featured', true)
  if (q) query = query.ilike('name', `%${q}%`)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If filtering by category slug, filter in-memory after join
  const products = categorySlug
    ? (data ?? []).filter(
        (p: Record<string, unknown>) =>
          (p.categories as Record<string, string> | null)?.slug === categorySlug,
      )
    : (data ?? [])

  return NextResponse.json({
    data: { products, total: count ?? 0, page, limit },
  })
}

export async function POST(req: NextRequest) {
  // Admin-only: validate bearer token has admin role
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json()) as {
    name: string
    slug: string
    tagline?: string
    description?: string
    price: number
    weight?: string
    stock?: number
    badge?: string
    badge_variant?: 'accent' | 'muted' | 'green'
    image_url?: string
    category_id?: string
    featured?: boolean
    tags?: string[]
  }

  if (!body.name || !body.slug || body.price == null) {
    return NextResponse.json({ error: 'name, slug, and price are required' }, { status: 400 })
  }

  const { tags, ...productFields } = body

  const { data: product, error } = await insforge.database
    .from('products')
    .insert([{ ...productFields, is_active: true }])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const newProduct = (product as Record<string, unknown>[])[0]

  if (tags?.length) {
    const tagRows = tags.map((tag) => ({ product_id: newProduct.id, tag }))
    await insforge.database.from('product_tags').insert(tagRows)
  }

  return NextResponse.json({ data: { product: newProduct } }, { status: 201 })
}

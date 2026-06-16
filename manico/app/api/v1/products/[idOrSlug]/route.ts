import { NextRequest, NextResponse } from 'next/server'
import { insforge } from '@/lib/insforge'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ idOrSlug: string }> },
) {
  const { idOrSlug } = await params

  const isUuid = UUID_RE.test(idOrSlug)
  const query = insforge.database
    .from('products')
    .select('*, product_tags(tag), categories(id, name, slug)')
    .eq('is_active', true)

  const { data, error } = await (isUuid ? query.eq('id', idOrSlug) : query.eq('slug', idOrSlug))
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

  return NextResponse.json({ data: { product: data } })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ idOrSlug: string }> },
) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { idOrSlug } = await params
  const body = (await req.json()) as Record<string, unknown>
  const { tags, ...fields } = body as { tags?: string[]; [k: string]: unknown }

  // Update product fields
  const { data, error } = await insforge.database
    .from('products')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', idOrSlug)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Replace tags if provided
  if (tags !== undefined) {
    await insforge.database.from('product_tags').delete().eq('product_id', idOrSlug)
    if (tags.length) {
      await insforge.database
        .from('product_tags')
        .insert(tags.map((tag) => ({ product_id: idOrSlug, tag })))
    }
  }

  return NextResponse.json({ data: { product: (data as Record<string, unknown>[])[0] } })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ idOrSlug: string }> },
) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { idOrSlug } = await params

  const { error } = await insforge.database
    .from('products')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', idOrSlug)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data: { message: 'Product deactivated' } })
}

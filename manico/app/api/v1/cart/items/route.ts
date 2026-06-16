import { NextRequest, NextResponse } from 'next/server'
import { insforge } from '@/lib/insforge'
import { decodeJwtPayload, isTokenExpired } from '@/lib/auth/decode-jwt'

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.slice(7)
  if (!token || isTokenExpired(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const payload = decodeJwtPayload(token)
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const body = (await req.json()) as { product_id: string; quantity?: number }
  if (!body.product_id) {
    return NextResponse.json({ error: 'product_id is required' }, { status: 400 })
  }
  const qty = Math.max(1, body.quantity ?? 1)

  // Check if item already exists (unique index on user_id + product_id)
  const { data: existing } = await insforge.database
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', payload.sub)
    .eq('product_id', body.product_id)
    .maybeSingle()

  if (existing) {
    const { data, error } = await insforge.database
      .from('cart_items')
      .update({ quantity: (existing as { id: string; quantity: number }).quantity + qty, updated_at: new Date().toISOString() })
      .eq('id', (existing as { id: string; quantity: number }).id)
      .select()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data: { item: (data as unknown[])[0] } })
  }

  const { data, error } = await insforge.database
    .from('cart_items')
    .insert([{ user_id: payload.sub, product_id: body.product_id, quantity: qty }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data: { item: (data as unknown[])[0] } }, { status: 201 })
}

import { NextRequest, NextResponse } from 'next/server'
import { insforge } from '@/lib/insforge'
import { decodeJwtPayload, isTokenExpired } from '@/lib/auth/decode-jwt'

type Params = { params: Promise<{ itemId: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const token = req.headers.get('authorization')?.slice(7)
  if (!token || isTokenExpired(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const payload = decodeJwtPayload(token)
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { itemId } = await params
  const body = (await req.json()) as { quantity: number }
  if (!body.quantity || body.quantity < 1) {
    return NextResponse.json({ error: 'quantity must be ≥ 1' }, { status: 400 })
  }

  const { data, error } = await insforge.database
    .from('cart_items')
    .update({ quantity: body.quantity, updated_at: new Date().toISOString() })
    .eq('id', itemId)
    .eq('user_id', payload.sub)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!(data as unknown[])?.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data: { item: (data as unknown[])[0] } })
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const token = req.headers.get('authorization')?.slice(7)
  if (!token || isTokenExpired(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const payload = decodeJwtPayload(token)
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { itemId } = await params

  const { error } = await insforge.database
    .from('cart_items')
    .delete()
    .eq('id', itemId)
    .eq('user_id', payload.sub)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}

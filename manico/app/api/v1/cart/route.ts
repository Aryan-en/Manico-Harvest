import { NextRequest, NextResponse } from 'next/server'
import { insforge } from '@/lib/insforge'
import { decodeJwtPayload, isTokenExpired } from '@/lib/auth/decode-jwt'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.slice(7)
  if (!token || isTokenExpired(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const payload = decodeJwtPayload(token)
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { data, error } = await insforge.database
    .from('cart_items')
    .select('*, products(id, name, slug, price, image_url, weight, stock)')
    .eq('user_id', payload.sub)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data: { items: data ?? [] } })
}

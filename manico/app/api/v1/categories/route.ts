import { NextRequest, NextResponse } from 'next/server'
import { insforge } from '@/lib/insforge'

export async function GET() {
  const { data, error } = await insforge.database
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data: { categories: data ?? [] } })
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json()) as {
    name: string
    slug: string
    description?: string
    image_url?: string
    sort_order?: number
  }

  if (!body.name || !body.slug) {
    return NextResponse.json({ error: 'name and slug are required' }, { status: 400 })
  }

  const { data, error } = await insforge.database
    .from('categories')
    .insert([body])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data: { category: (data as Record<string, unknown>[])[0] } }, { status: 201 })
}

import { insforge } from '@/lib/insforge'

export async function POST(): Promise<Response> {
  const { error } = await insforge.auth.signOut()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ data: null })
}

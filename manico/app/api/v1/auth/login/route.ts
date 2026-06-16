import { insforge } from '@/lib/insforge'
import { LoginSchema } from '@/lib/validations/auth'

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  const result = LoginSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }

  const { data, error } = await insforge.auth.signInWithPassword(result.data)

  if (error) {
    return Response.json({ error: error.message }, { status: (error as { statusCode?: number }).statusCode ?? 401 })
  }

  return Response.json({ data })
}

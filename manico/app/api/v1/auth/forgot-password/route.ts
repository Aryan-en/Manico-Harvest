import { insforge } from '@/lib/insforge'
import { ForgotPasswordSchema } from '@/lib/validations/auth'

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  const result = ForgotPasswordSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }

  const { data, error } = await insforge.auth.sendResetPasswordEmail(result.data)

  if (error) {
    return Response.json({ error: error.message }, { status: (error as { statusCode?: number }).statusCode ?? 400 })
  }

  return Response.json({ data })
}

import { insforge } from '@/lib/insforge'
import { ResetPasswordSchema } from '@/lib/validations/auth'

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  const result = ResetPasswordSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }

  const { newPassword, token } = result.data
  const { data, error } = await insforge.auth.resetPassword({ newPassword, otp: token })

  if (error) {
    return Response.json({ error: error.message }, { status: (error as { statusCode?: number }).statusCode ?? 400 })
  }

  return Response.json({ data })
}

import { decodeJwtPayload, isTokenExpired } from '@/lib/auth/decode-jwt'

export async function GET(req: Request): Promise<Response> {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (isTokenExpired(token)) {
    return Response.json({ error: 'Token expired' }, { status: 401 })
  }

  const payload = decodeJwtPayload(token)
  if (!payload) {
    return Response.json({ error: 'Invalid token' }, { status: 401 })
  }

  return Response.json({
    data: {
      user: { id: payload.sub, email: payload.email, role: payload.role },
    },
  })
}

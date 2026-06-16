import { decodeJwtPayload, isTokenExpired } from '@/lib/auth/decode-jwt'
import { insforge } from '@/lib/insforge'
import type { AuthUser } from '@/types/auth'

export async function GET(req: Request): Promise<Response> {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (isTokenExpired(token)) return Response.json({ error: 'Token expired' }, { status: 401 })

  const payload = decodeJwtPayload(token)
  if (!payload) return Response.json({ error: 'Invalid token' }, { status: 401 })

  // Fetch full profile from Insforge so the client gets name/avatar on page reload.
  // Cast to Record because the SDK's TS types don't match the documented flat JSON shape.
  const { data: rawProfile } = await insforge.auth.getProfile(payload.sub)
  const profile = rawProfile as Record<string, unknown> | null

  const user: AuthUser = {
    id: payload.sub,
    email: payload.email,
    emailVerified: true,
    providers: ['email'],
    createdAt: (profile?.createdAt as string | undefined) ?? '',
    updatedAt: (profile?.updatedAt as string | undefined) ?? '',
    profile: {
      name: (profile?.name as string | undefined) ?? undefined,
      avatar_url: (profile?.avatar_url as string | undefined) ?? null,
    },
    metadata: {},
  }

  return Response.json({ data: { user } })
}

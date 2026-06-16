type JwtPayload = {
  sub: string
  email: string
  role: string
  exp?: number
  iat?: number
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const raw = token.split('.')[1]
    // atob is available in Node 16+ and all browsers
    return JSON.parse(atob(raw)) as JwtPayload
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token)
  if (!payload?.exp) return false
  return Math.floor(Date.now() / 1000) > payload.exp
}

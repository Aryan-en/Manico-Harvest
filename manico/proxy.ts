import { NextRequest, NextResponse } from 'next/server'
import { isTokenExpired } from '@/lib/auth/decode-jwt'

const PROTECTED = ['/admin', '/account']
const AUTH_ONLY = ['/sign-in', '/sign-up', '/verify-email']

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('auth-token')?.value

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p))

  if (isProtected && (!token || isTokenExpired(token))) {
    const url = req.nextUrl.clone()
    url.pathname = '/sign-in'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthOnly && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/sign-in', '/sign-up', '/verify-email'],
}

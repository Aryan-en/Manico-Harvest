import { createClient } from '@insforge/sdk'

// Browser-side client — uses NEXT_PUBLIC env vars inlined at build time.
// Used only for operations that require browser context: OAuth redirects,
// getCurrentUser() with Insforge httpOnly session cookie, etc.
export const insforgeBrowser = createClient({
  baseUrl: 'https://zz2f58ia.ap-southeast.insforge.app',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
})

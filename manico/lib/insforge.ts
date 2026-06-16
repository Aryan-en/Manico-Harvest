import { createClient } from '@insforge/sdk'

export const insforge = createClient({
  baseUrl: process.env.INSFORGE_PROJECT_URL!.trim(),
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!.trim(),
})

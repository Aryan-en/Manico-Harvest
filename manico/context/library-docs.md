# Library Docs

## Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.x | Full-stack framework — App Router, RSC, Route Handlers |
| `react` | 19.x | UI library |
| `react-dom` | 19.x | DOM renderer |
| `typescript` | 5.x | Static typing |

---

## Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 4.x | Utility-first CSS |
| `@tailwindcss/forms` | latest | Form element resets |
| `clsx` | latest | Conditional class merging |
| `tailwind-merge` | latest | Tailwind class conflict resolution |

```ts
// Canonical cn() utility — use everywhere
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Icons

| Package | Version | Purpose |
|---------|---------|---------|
| `lucide-react` | latest | Icon library — tree-shakeable SVG icons |

```tsx
// Usage — import only what is needed
import { ShoppingCart, Heart, Search, ChevronRight } from "lucide-react"

<ShoppingCart size={20} strokeWidth={1.5} className="text-foreground" />
```

**Icon size convention:**
- Nav/button: `size={20}`
- Inline text: `size={16}`
- Feature/hero: `size={24}`

---

## Animation

| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | 11.x | Declarative animation — page transitions, micro-interactions |

```tsx
// Usage patterns
import { motion, AnimatePresence } from "framer-motion"

// Fade in
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>

// Cart drawer slide
<motion.aside
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ type: "spring", damping: 30, stiffness: 300 }}
>

// Staggered list
const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }
```

**Rule:** Wrap exit animations in `AnimatePresence`. Duration ≤ 250ms for micro-interactions.

---

## Data Fetching

| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | 1.x | HTTP client for client-side API calls |
| `@tanstack/react-query` | 5.x | Server state, caching, background sync |

```ts
// Axios instance — lib/api/client.ts
import axios from "axios"

export const apiClient = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,  // sends HttpOnly cookie for refresh token
})

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await apiClient.post("/auth/refresh")
      return apiClient.request(error.config)
    }
    return Promise.reject(error)
  }
)
```

```ts
// React Query usage
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const { data: products, isLoading } = useQuery({
  queryKey: ["products", { category, sort }],
  queryFn: () => apiClient.get("/products").then(r => r.data),
})
```

---

## ORM

| Package | Version | Purpose |
|---------|---------|---------|
| `prisma` | 5.x | Schema management, migrations |
| `@prisma/client` | 5.x | Type-safe DB queries |

```ts
// lib/db/client.ts — singleton for Next.js hot reload
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient({ log: ["error"] })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
```

---

## Validation

| Package | Version | Purpose |
|---------|---------|---------|
| `zod` | 3.x | Schema validation — API boundaries, forms |

---

## Forms

| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | 7.x | Performant form state |
| `@hookform/resolvers` | latest | Zod integration for RHF |

---

## State

| Package | Version | Purpose |
|---------|---------|---------|
| `zustand` | 5.x | Minimal client-side global state |

---

## Payments

| Package | Version | Purpose |
|---------|---------|---------|
| `stripe` | latest | Server-side Stripe SDK |
| `@stripe/react-stripe-js` | latest | Client-side PaymentElement |
| `@stripe/stripe-js` | latest | Stripe.js loader |

---

## Email

| Package | Version | Purpose |
|---------|---------|---------|
| `resend` | latest | Transactional email |
| `@react-email/components` | latest | Email templates as React components |

---

## Media

| Package | Version | Purpose |
|---------|---------|---------|
| `next/image` | (built-in) | Optimized image delivery |
| `cloudinary` | latest | Upload SDK — product image management |

---

## Dev & Tooling

| Package | Purpose |
|---------|---------|
| `vitest` | Unit tests |
| `@testing-library/react` | Component tests |
| `playwright` | E2E tests |
| `@next/bundle-analyzer` | Bundle size audit |
| `husky` | Git hooks |
| `lint-staged` | Run linters on staged files only |

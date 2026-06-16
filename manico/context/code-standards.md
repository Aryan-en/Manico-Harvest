# Code Standards — Insforge Style

## Principles

| Principle | Rule |
|-----------|------|
| **Modular** | One concern per file. No god-modules. Max 300 LOC per file — split if exceeded. |
| **DRY** | Abstract only when 3+ identical patterns exist. No premature abstraction. |
| **Functional** | Prefer pure functions. Avoid mutation. No class components. |
| **Typed** | `strict: true`. No `any`. Explicit return types on all exported functions. |
| **Minimal** | No unused imports, dead code, or speculative features. Ship what's needed. |

---

## TypeScript

```ts
// REQUIRED: explicit return types on exports
export function getProduct(slug: string): Promise<Product | null> { }

// REQUIRED: type all API responses
type ApiResponse<T> = { data: T; error: null } | { data: null; error: string }

// FORBIDDEN: any, @ts-ignore without explanation
// FORBIDDEN: type assertions via `as` except at API boundaries
// REQUIRED: use `satisfies` for config objects
const config = { ... } satisfies StoreConfig

// REQUIRED: discriminated unions over optional fields
type CartState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; items: CartItem[] }
```

---

## React / Next.js Components

```tsx
// File naming: PascalCase for components, kebab-case for utilities
// ProductCard.tsx ✓   productCard.tsx ✗

// REQUIRED: destructure props inline with explicit types
type ProductCardProps = {
  product: Product
  onAddToCart: (variantId: string) => void
  priority?: boolean
}

export function ProductCard({ product, onAddToCart, priority = false }: ProductCardProps) {
  // ...
}

// FORBIDDEN: default exports for components
// export default function ProductCard() ✗
// export function ProductCard() ✓

// REQUIRED: use Server Components by default
// Mark 'use client' only when: event handlers, hooks, browser APIs needed

// REQUIRED: loading.tsx and error.tsx for every route segment
```

---

## File & Folder Structure

```
app/
  (store)/           # customer-facing routes (route group)
    page.tsx
    products/
      [slug]/
        page.tsx
        loading.tsx
        error.tsx
  (admin)/           # admin routes (route group)
  api/               # Route Handlers
    v1/
      products/
        route.ts
components/
  ui/                # Primitive shared components (Button, Input, etc.)
  layout/            # Navbar, Footer, Sidebar
  product/           # Domain components (ProductCard, VariantPicker)
  cart/              # CartDrawer, CartItem
  checkout/          # CheckoutForm, OrderSummary
lib/
  api/               # API client functions (axios wrappers)
  db/                # Prisma client singleton
  auth/              # JWT utilities
  utils/             # Pure utility functions
  validations/       # Zod schemas
types/
  index.ts           # Re-exports all domain types
  api.ts             # Request/response types
  db.ts              # DB model types (inferred from Prisma)
hooks/               # Custom React hooks
store/               # Zustand stores
```

---

## API Routes (Route Handlers)

```ts
// REQUIRED: validate all inputs with Zod at boundary
import { z } from "zod"

const CreateProductSchema = z.object({
  name: z.string().min(1).max(120),
  price: z.number().positive(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
})

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  const result = CreateProductSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  // ...
}

// REQUIRED: always return typed ApiResponse<T>
// REQUIRED: 400 for validation, 401 for unauth, 403 for forbidden, 404 for not found, 500 for unexpected
```

---

## State Management

- **Server state:** React Query (TanStack Query) — no manual fetch/loading/error state.
- **Client-only global state:** Zustand — one store per domain (cart, ui, auth).
- **Form state:** React Hook Form + Zod resolver.
- **URL state:** `useSearchParams` for filters/sort — no client state for URL-reflected values.

---

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Component | PascalCase | `ProductCard` |
| Hook | camelCase + `use` prefix | `useCartStore` |
| Utility | camelCase | `formatPrice` |
| Type/Interface | PascalCase | `CartItem` |
| Constant | SCREAMING_SNAKE | `MAX_CART_ITEMS` |
| API route | kebab-case | `/api/v1/discount-codes` |
| DB table | snake_case | `order_items` |
| CSS class | Tailwind utility classes only — no custom CSS unless token-driven |

---

## Comments

Write comments only for non-obvious logic: hidden constraints, workarounds, invariants.

```ts
// FORBIDDEN:
// This function gets the product by slug
export function getProductBySlug(slug: string) { }

// REQUIRED (example of acceptable comment):
// Stripe requires amount in smallest currency unit (cents)
const amount = Math.round(price * 100)
```

---

## Git Conventions

```
feat(cart): add quantity controls to CartDrawer
fix(checkout): prevent double submission on slow network
perf(pdp): lazy-load variant images below fold
chore(deps): update Prisma to 5.x
```

- Branch: `feat/cart-quantity`, `fix/checkout-double-submit`
- No commits to `main` directly. PR required.
- Squash merge to maintain linear history.

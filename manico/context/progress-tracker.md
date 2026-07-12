# Progress Tracker

## Phase Status

| Phase | Name | Status | Started | Completed |
|-------|------|--------|---------|-----------|
| 1 | Environment & Foundation | `in-progress` | 2026-06-10 | — |
| 2 | Data Layer & API Scaffold | `in-progress` | 2026-06-10 | — |
| 3 | Storefront UI | `in-progress` | 2026-06-10 | — |
| 4 | Checkout & Payments | `not-started` | — | — |
| 5 | Admin Dashboard | `not-started` | — | — |
| 6 | Polish, SEO & Deploy | `not-started` | — | — |

**Status values:** `not-started` · `in-progress` · `blocked` · `complete`

---

## Phase 1 — Environment & Foundation

| Task | Status | Notes |
|------|--------|-------|
| Init Next.js 15 (App Router, TypeScript strict) | `complete` | Next.js 16.2.9 bootstrapped with App Router, strict TypeScript. |
| Configure ESLint (flat config), Prettier, Husky | `not-started` | |
| Setup Tailwind CSS v4 with design token config | `complete` | `app/globals.css` defines Tailwind v4 theme tokens from `context/ui-tokens.md`; Manico Harvest brand colors applied (rgb 219/81/0, 247/236/217, 42/70/16). |
| Configure path aliases | `complete` | `@/*` → `./*` configured in `tsconfig.json`. |
| Insforge SDK installed + client singleton configured | `complete` | `lib/insforge.ts`; `NEXT_PUBLIC_INSFORGE_URL` + `NEXT_PUBLIC_INSFORGE_ANON_KEY` in `.env.local`. |
| Fix Next.js version (9.3.3 → 16.2.9) | `complete` | `package.json` corrected; `npm install` resolved to 16.2.9. |
| Docker Compose: local MySQL for dev | `not-started` | Not needed — Insforge is the backend. Keeping row for reference. |
| GitHub repo + branch protection | `not-started` | |
| Vercel project link + env var setup | `not-started` | |
| Sentry DSN configured | `not-started` | |

---

## Phase 2 — Data Layer & API Scaffold

| Task | Status | Notes |
|------|--------|-------|
| Insforge DB schema: all tables, relations | `not-started` | Replaces Prisma schema. Use `mcp__insforge__run-raw-sql` + `get-table-schema` for management. |
| Seed script: admin user, sample products | `not-started` | Via `mcp__insforge__bulk-upsert` or Insforge dashboard. |
| Auth API: `/login`, `/logout`, `/verify-email`, `/me` | `complete` | 8 route handlers under `app/api/v1/auth/`. Insforge SDK wraps all auth ops. See below. |
| JWT middleware + role guard utilities | `complete` | `proxy.ts` protects `/admin` + `/account`; `lib/auth/decode-jwt.ts` for token decode/expiry. |
| Auth Zustand store | `complete` | `store/auth-store.ts` — status, user, accessToken in client memory. |
| Auth UI: Sign In / Sign Up / Verify Email pages | `complete` | `app/(auth)/sign-in`, `sign-up`, `verify-email`. RHF + Zod, inline errors, show/hide password, OAuth wired. |
| AuthNavButton in Navbar | `complete` | `components/auth/AuthNavButton.tsx` — shows Sign In + Sign Up links; switches to user name + Sign Out when authenticated. |
| AuthProvider in root layout | `complete` | `components/auth/AuthProvider.tsx` — initializes from cookie (email/password) + `getCurrentUser()` fallback (OAuth). |
| OAuth Google + GitHub | `complete` | `lib/insforge-browser.ts` browser client; `oauthSignIn()` in `use-auth.ts`; Loader spinners on buttons. |
| Insforge DB schema: all tables, relations | `complete` | 7 tables created via `run-raw-sql`: `categories`, `products`, `product_tags`, `cart_items`, `orders`, `order_items`, `discount_codes`. |
| Seed script: admin user, sample products | `complete` | 3 categories, 5 products, 15 product tags inserted via `run-raw-sql`. |
| Products API: full CRUD | `complete` | `app/api/v1/products/route.ts` (GET list + POST); `app/api/v1/products/[idOrSlug]/route.ts` (GET by slug/id, PATCH, DELETE). Supports `?featured`, `?category`, `?q`, pagination. |
| Categories API: full CRUD | `complete` | `app/api/v1/categories/route.ts` (GET, POST); `app/api/v1/categories/[id]/route.ts` (PATCH, DELETE). |
| Cart API: full CRUD | `complete` | `app/api/v1/cart/route.ts` (GET); `app/api/v1/cart/items/route.ts` (POST add/upsert); `app/api/v1/cart/items/[itemId]/route.ts` (PATCH qty, DELETE). Requires auth token. |
| Variants API: size/color variant model | `not-started` | |
| Unit tests: auth utils, JWT helpers | `not-started` | |

---

## Phase 3 — Storefront UI

| Task | Status | Notes |
|------|--------|-------|
| Shared layout: Navbar, Footer, MobileMenu | `complete` | `components/layout/Navbar.tsx`, `Footer.tsx`, `NavbarMobileMenu.tsx` (client). Announcement bar, sticky nav, desktop+mobile nav. |
| Home page: hero, featured products, category strips | `complete` | `app/page.tsx` composes HeroSection, TrustBar, FeaturedProducts, WhySection, Testimonials, Newsletter. Builds static, passes TS. |
| Catalog page: product grid, filter sidebar, sort | `complete` | `app/shop/page.tsx` — Server Component, category filter sidebar, sort control, search, product grid. `app/shop/loading.tsx` skeleton. |
| Product Detail Page (PDP) | `complete` | `app/shop/[slug]/page.tsx` — Server Component, generateMetadata, qty picker, related products, trust signals. `app/shop/[slug]/loading.tsx` skeleton. |
| Cart — Zustand store + CartDrawer | `complete` | `store/cart-store.ts` (Zustand + localStorage persist); `components/cart/CartDrawer.tsx` slide-in drawer; `components/cart/CartItem.tsx`; `components/layout/NavbarCartButton.tsx` with live badge count. |
| Search: debounced client + server route | `complete` | `components/layout/NavbarSearch.tsx` — modal search overlay, submits to `/shop?q=`. Reuses existing products API `?q=` filter. Not debounced (submit-based, not live-as-you-type). |
| Loading skeletons for all async routes | `complete` | `components/product/ProductCardSkeleton.tsx`; loading.tsx for /shop and /shop/[slug]. |
| Error boundaries + 404 / 500 pages | `complete` | `app/not-found.tsx` (404), `app/error.tsx` (global error boundary, client component, captures to PostHog). |
| Responsive: 320px → 1440px | `in-progress` | Mobile-first Tailwind classes used throughout; not yet audited at all breakpoints. |
| Info pages: About, Benefits, Contact, FAQ | `complete` | `app/about`, `app/benefits`, `app/contact` (with `ContactForm`), `app/faq` (with `FaqAccordion`). Fixes previously broken Navbar links. |
| Policy pages: Shipping, Returns, Privacy, Terms | `complete` | `app/shipping`, `app/returns`, `app/privacy-policy`, `app/terms-of-service`. Shared `components/layout/PolicyContent.tsx`. Fixes previously broken Footer links. |
| Track Order + Blog placeholder | `complete` | `app/track` (form, graceful "not found" state — no orders table wired yet); `app/blog` ("coming soon" empty state). |
| Mobile nav: auth state (sign in/out) | `complete` | `NavbarMobileMenu.tsx` — previously had no way to sign in/out on mobile since `AuthNavButton` is `hidden lg:flex`. Now shows Sign In/Sign Up or user name + Sign Out. |
| Site-wide animation system | `complete` | Dependency-free scroll-reveal via `hooks/use-in-view.ts` (IntersectionObserver) + `components/motion/Reveal.tsx`; CSS keyframes/utilities in `globals.css` (`animate-fade-in`, `animate-scale-in`, `animate-float`, `animate-shimmer`). Fully respects `prefers-reduced-motion` (disables all animation/transition durations). Applied across Home, Shop, PDP, About, Benefits, Contact, FAQ, Recipes, policy pages, 404/error pages, cart drawer, mobile nav drawer, search modal. Loading skeletons upgraded from `animate-pulse` to shimmer sweep. Next.js 16's native View Transitions API (`experimental.viewTransition`) was evaluated but not enabled — still experimental and too high-risk to flip globally without per-route visual regression testing. |

---

## Phase 4 — Checkout & Payments

| Task | Status | Notes |
|------|--------|-------|
| Guest checkout form | `not-started` | |
| Stripe PaymentElement integration | `not-started` | |
| `POST /api/v1/cart/checkout` → PaymentIntent | `not-started` | |
| Stripe webhook handler | `not-started` | |
| Order record creation on successful payment | `not-started` | |
| Stock decrement on order confirmation | `not-started` | |
| Resend: order confirmation email template | `not-started` | |
| Order confirmation page | `not-started` | |
| Discount code input + server-side validation | `not-started` | |

---

## Phase 5 — Admin Dashboard

| Task | Status | Notes |
|------|--------|-------|
| Admin layout: sidebar nav, role guard | `not-started` | |
| Products manager: CRUD + image upload | `not-started` | |
| Orders manager: list + status update | `not-started` | |
| Customers list: read-only, search | `not-started` | |
| Analytics overview: revenue, orders, top products | `not-started` | |
| Discount codes: CRUD, usage limits, expiry | `not-started` | |
| Settings: store name, contact, shipping rates | `not-started` | |

---

## Phase 6 — Polish, SEO & Deploy

| Task | Status | Notes |
|------|--------|-------|
| Metadata API: dynamic title/description | `not-started` | |
| OG image generation | `not-started` | |
| `sitemap.xml` + `robots.txt` | `not-started` | |
| JSON-LD structured data | `not-started` | |
| Image optimization audit | `not-started` | |
| Bundle analysis + size reduction | `not-started` | |
| Core Web Vitals audit (LCP, CLS, INP) | `not-started` | |
| Rate limiting on auth + checkout | `not-started` | |
| E2E smoke tests (Playwright) | `not-started` | |
| Production deploy to Vercel | `not-started` | |
| DNS + custom domain | `not-started` | |
| Post-deploy monitoring: Sentry alert rules | `not-started` | |

---

## Component Build Status

| Component | Phase | Status | Notes |
|-----------|-------|--------|-------|
| `Button` | 3 | `not-started` | |
| `Input` | 3 | `not-started` | |
| `Textarea` | 3 | `not-started` | |
| `Select` | 3 | `not-started` | |
| `Checkbox` | 3 | `not-started` | |
| `Badge` | 3 | `not-started` | |
| `Skeleton` | 3 | `not-started` | |
| `Spinner` | 3 | `not-started` | |
| `EmptyState` | 3 | `not-started` | |
| `Navbar` | 3 | `complete` | `components/layout/Navbar.tsx` — Server Component, announcement bar + sticky nav. |
| `BrandLogo` | 3 | `complete` | `components/layout/BrandLogo.tsx` — cropped emblem from `fav.jpeg` with live Manico Harvest wordmark text. |
| `Footer` | 3 | `complete` | `components/layout/Footer.tsx` — links, socials, copyright. |
| `MobileMenu` | 3 | `complete` | `components/layout/NavbarMobileMenu.tsx` — Client Component, slide-in drawer. |
| `ProductCard` | 3 | `complete` | `components/product/ProductCard.tsx` — Server Component, badge, image, tags, AddToCartButton. |
| `ProductGrid` | 3 | `complete` | Inline grid in /shop and /shop/[slug] pages. |
| `ProductCardSkeleton` | 3 | `complete` | `components/product/ProductCardSkeleton.tsx` — animate-pulse skeleton matching card layout. |
| `AddToCartButton` | 3 | `complete` | `components/product/AddToCartButton.tsx` — client component, qty picker, loading/success states, DB sync for auth users. |
| `VariantPicker` | 3 | `not-started` | |
| `ProductImageGallery` | 3 | `not-started` | |
| `CartDrawer` | 3 | `complete` | `components/cart/CartDrawer.tsx` — slide-in from right, focus trap, Escape key, empty state. |
| `CartItem` | 3 | `complete` | `components/cart/CartItem.tsx` — qty controls, remove, DB sync for auth users. |
| `CartSummary` | 3 | `complete` | Inline in CartDrawer footer — subtotal, item count, checkout CTA. |
| `CheckoutForm` | 4 | `not-started` | |
| `OrderSummary` | 4 | `not-started` | |

---

## API Endpoint Status

| Endpoint | Method | Phase | Status |
|----------|--------|-------|--------|
| `/api/v1/auth/login` | POST | 2 | `complete` |
| `/api/v1/auth/logout` | POST | 2 | `complete` |
| `/api/v1/auth/register` | POST | 2 | `complete` |
| `/api/v1/auth/me` | GET | 2 | `complete` |
| `/api/v1/auth/verify-email` | POST | 2 | `complete` |
| `/api/v1/auth/resend-verification` | POST | 2 | `complete` |
| `/api/v1/auth/forgot-password` | POST | 2 | `complete` |
| `/api/v1/auth/exchange-reset-token` | POST | 2 | `complete` |
| `/api/v1/auth/reset-password` | POST | 2 | `complete` |
| `/api/v1/products` | GET | 2 | `complete` |
| `/api/v1/products/:slug` | GET | 2 | `complete` |
| `/api/v1/products` | POST | 2 | `complete` |
| `/api/v1/products/:id` | PATCH | 2 | `complete` |
| `/api/v1/products/:id` | DELETE | 2 | `complete` |
| `/api/v1/categories` | GET/POST/PATCH/DELETE | 2 | `complete` |
| `/api/v1/cart` | GET | 3 | `complete` |
| `/api/v1/cart/items` | POST | 3 | `complete` |
| `/api/v1/cart/items/:itemId` | PATCH/DELETE | 3 | `complete` |
| `/api/v1/cart/checkout` | POST | 4 | `not-started` |
| `/api/v1/webhooks/stripe` | POST | 4 | `not-started` |
| `/api/v1/orders` | GET | 4 | `not-started` |
| `/api/v1/orders/:id` | GET/PATCH | 4 | `not-started` |
| `/api/v1/discount-codes` | GET/POST/PATCH/DELETE | 5 | `not-started` |
| `/api/v1/admin/products` | GET/POST/PATCH/DELETE | 5 | `not-started` |
| `/api/v1/admin/orders` | GET/PATCH | 5 | `not-started` |
| `/api/v1/admin/analytics` | GET | 5 | `not-started` |

---

## Blockers

> Log active blockers here. Remove when resolved.

| # | Description | Phase | Raised | Resolved |
|---|-------------|-------|--------|----------|
| — | — | — | — | — |

---

## Decisions Log

> Record non-obvious decisions made during build. Prevents re-litigating.

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-10 | Tailwind v4 configured CSS-first in `app/globals.css` | Local Next 16 docs confirm `@tailwindcss/postcss` + `@import "tailwindcss"`; project tokens are exposed through `@theme` and base CSS variables. |
| 2026-06-10 | Brand colors overridden to Manico Harvest theme | `rgb(42,70,16)` = `#2A4610` brand-primary (green), `rgb(219,81,0)` = `#DB5100` brand-accent (orange), `rgb(247,236,217)` = `#F7ECD9` bg-base (cream). All aliases updated in @theme so Tailwind utility classes (`bg-primary`, `bg-accent`, `bg-base`) resolve correctly. |
| 2026-06-10 | Event handlers forbidden in Server Components | Next.js App Router RSC constraint: `onMouseEnter`/`onMouseLeave` must not be props on elements in Server Components. Used Tailwind `hover:` utilities (`hover:bg-accent-hover`, `hover:text-inverse`) instead. `Newsletter.tsx` marked `'use client'` for form state. |
| 2026-06-10 | `app/fav.jpeg` reused as brand logo and app icon | Next app icon docs support JPEG through `app/icon.jpeg`; shared `BrandLogo` keeps the same asset across navbar, mobile menu, and footer. |
| 2026-06-10 | Brand logo renders emblem only with text wordmark | Cropping the image to the circular emblem removes the white rectangular spacing from the source asset while keeping “Manico Harvest” readable as live text. |
| 2026-06-10 | Replaced Prisma/PlanetScale with Insforge BaaS | User confirmed Insforge as backend platform. Removes Prisma, MySQL, Docker Compose from the stack. Insforge SDK (`@insforge/sdk`) handles DB, auth, storage, and AI. |
| 2026-06-10 | Auth uses Insforge SDK server-side via route handler proxy | Route handlers at `/api/v1/auth/*` wrap the Insforge SDK. Access token returned to client; stored in Zustand (memory) + `auth-token` cookie for middleware. Refresh token handled by Insforge httpOnly cookie on direct SDK calls. |
| 2026-06-10 | Fixed Next.js version from 9.3.3 → 16.2.9 | `package.json` had `^9.3.3` (wrong); `.next` artifacts and `eslint-config-next@16.2.9` confirmed 16 was the intended version. |
| 2026-06-16 | OAuth uses browser-side Insforge client | `lib/insforge-browser.ts` uses hardcoded backend URL + `NEXT_PUBLIC_INSFORGE_ANON_KEY`. `AuthProvider` falls back to `getCurrentUser()` for OAuth sessions after email/password check fails. |
| 2026-06-16 | Products DELETE is soft-delete (is_active=false) | Preserves order history FK references. Admin can re-activate via PATCH. |
| 2026-06-16 | Products API accepts slug or UUID in `[idOrSlug]` | UUID regex check determines filter column — no separate slug endpoint needed. |

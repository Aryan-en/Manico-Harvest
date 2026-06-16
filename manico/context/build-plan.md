# Build Plan

## Phase Overview

| Phase | Name | Duration |
|-------|------|----------|
| 1 | Environment & Foundation | Week 1 |
| 2 | Data Layer & API Scaffold | Week 2 |
| 3 | Storefront UI | Week 3–4 |
| 4 | Checkout & Payments | Week 5–6 |
| 5 | Admin Dashboard | Week 7–8 |
| 6 | Polish, SEO & Deploy | Week 9–12 |

---

## Phase 1 — Environment & Foundation

**Goal:** Reproducible dev environment, version control, CI skeleton.

- [ ] Init Next.js 15 (App Router, TypeScript strict)
- [ ] Configure ESLint (flat config), Prettier, Husky pre-commit
- [ ] Setup Tailwind CSS v4 with design token config
- [ ] Configure path aliases (`@/components`, `@/lib`, `@/types`)
- [ ] Prisma init → connect PlanetScale → push schema v0
- [ ] Docker Compose: local MySQL for dev
- [ ] GitHub repo + branch protection (main, develop)
- [ ] Vercel project link + env var setup
- [ ] Sentry DSN configured in Next.js + Node

**Exit Criteria:** `pnpm dev` runs with DB connection. Lint passes on commit.

---

## Phase 2 — Data Layer & API Scaffold

**Goal:** Full DB schema, auth endpoints, base CRUD.

- [ ] Prisma schema: all tables, relations, indexes
- [ ] Seed script: admin user, sample products, categories
- [ ] Auth API: `/login`, `/logout`, `/refresh`, `/me`
- [ ] JWT middleware + role guard utilities
- [ ] Products API: `GET /products`, `GET /products/:slug`, `POST`, `PATCH`, `DELETE`
- [ ] Categories API: full CRUD
- [ ] Variants API: size/color variant model
- [ ] Unit tests: auth utils, JWT helpers (Vitest)

**Exit Criteria:** All endpoints return correct status codes. Postman collection passes.

---

## Phase 3 — Storefront UI

**Goal:** Customer-facing pages, cart state, responsive.

- [ ] Shared layout: Navbar, Footer, MobileMenu
- [ ] Home page: hero, featured products, category strips
- [ ] Catalog page: product grid, filter sidebar, sort controls
- [ ] Product Detail Page (PDP): images, variant picker, add-to-cart
- [ ] Cart — Zustand store, CartDrawer component
- [ ] Search: debounced client search + server route
- [ ] Loading skeletons for all async routes
- [ ] Error boundaries + 404 / 500 pages
- [ ] Responsive: 320px → 1440px

**Exit Criteria:** Lighthouse mobile score ≥ 80. Cart persists on refresh (localStorage).

---

## Phase 4 — Checkout & Payments

**Goal:** End-to-end purchase flow, order creation, email confirmation.

- [ ] Guest checkout form (address, contact)
- [ ] Stripe PaymentElement integration
- [ ] `POST /api/v1/cart/checkout` → PaymentIntent
- [ ] Stripe webhook handler: `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Order record creation on successful payment
- [ ] Stock decrement on order confirmation
- [ ] Resend: order confirmation email template
- [ ] Order confirmation page (`/order/[id]`)
- [ ] Discount code input + server-side validation

**Exit Criteria:** Test card completes order. Webhook creates DB record. Email received.

---

## Phase 5 — Admin Dashboard

**Goal:** Creator can manage all content and operations.

- [ ] Admin layout: sidebar nav, protected by role guard
- [ ] Products manager: list, create, edit, delete, image upload
- [ ] Orders manager: list, status update (pending → fulfilled → shipped)
- [ ] Customers list: read-only, search
- [ ] Analytics overview: revenue, orders, top products (7d / 30d)
- [ ] Discount codes: CRUD, usage limits, expiry
- [ ] Settings: store name, contact email, shipping rates

**Exit Criteria:** Admin can publish a new product in < 2 minutes from login.

---

## Phase 6 — Polish, SEO & Deploy

**Goal:** Production-ready performance, discoverability, monitoring.

- [ ] Metadata API: dynamic title/description per page
- [ ] OG image generation (Next.js ImageResponse)
- [ ] `sitemap.xml` + `robots.txt` generation (route handlers)
- [ ] JSON-LD structured data (Product, BreadcrumbList)
- [ ] Image optimization: WebP/AVIF, explicit `width`/`height`, priority flags
- [ ] Bundle analysis (`@next/bundle-analyzer`)
- [ ] Core Web Vitals audit — fix LCP, CLS, INP regressions
- [ ] Rate limiting on auth + checkout endpoints
- [ ] E2E smoke tests (Playwright): browse → cart → checkout happy path
- [ ] Production deploy to Vercel
- [ ] DNS + custom domain
- [ ] Post-deploy monitoring: Sentry alert rules

**Exit Criteria:** CWV pass. Zero Sentry errors on smoke test. Checkout completes in prod.

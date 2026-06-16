# Project Overview

## Core Mission
Direct-to-consumer personal brand e-commerce platform. Creator sells own digital/physical products without marketplace intermediaries. Full ownership of storefront, customer data, and checkout flow.

---

## User Personas

### Creator (Admin)
- **Goal:** Publish products, manage orders, track revenue, update content without dev involvement.
- **Actions:** CRUD products, view dashboard analytics, process fulfillments, manage discount codes, configure shipping.
- **Pain Points:** Dependency on Shopify/Gumroad fees, no brand control on third-party platforms.

### Customer (Buyer)
- **Goal:** Discover, evaluate, and purchase products with minimal friction.
- **Actions:** Browse catalog, filter/search, add to cart, checkout (guest or account), track orders.
- **Pain Points:** Slow storefronts, broken mobile flows, forced account creation.

---

## 3-Month Roadmap

### Month 1 — Foundation
| Week | Deliverable |
|------|-------------|
| 1 | Monorepo setup, DB schema, auth (JWT + refresh tokens) |
| 2 | Product CRUD API + admin dashboard scaffold |
| 3 | Storefront — catalog, PDP, cart state |
| 4 | Checkout flow (guest + account), Stripe integration |

### Month 2 — Core Commerce
| Week | Deliverable |
|------|-------------|
| 5 | Order management, fulfillment status, email notifications |
| 6 | Search, filters, category taxonomy |
| 7 | Customer accounts — order history, saved addresses |
| 8 | Discount codes, basic promotions engine |

### Month 3 — Polish & Launch
| Week | Deliverable |
|------|-------------|
| 9  | Performance audit — LCP, CLS, INP targets |
| 10 | SEO — metadata, OG tags, sitemap, structured data |
| 11 | Analytics integration, error monitoring (Sentry) |
| 12 | Production deploy, smoke tests, launch |

---

## Success Metrics
- Checkout conversion ≥ 3%
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Admin publish-to-live cycle < 2 min

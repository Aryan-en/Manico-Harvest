# Architecture

## System Diagram

```
┌─────────────────────────────────────────────────────┐
│                     CLIENT LAYER                    │
│  Browser / Mobile Browser                           │
│  Next.js App Router (RSC + Client Components)       │
└───────────────┬─────────────────────────────────────┘
                │ HTTP / WebSocket
┌───────────────▼─────────────────────────────────────┐
│                   NEXT.JS SERVER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ App Router   │  │ Route        │  │ Middleware │ │
│  │ (Pages/RSC)  │  │ Handlers     │  │ (Auth JWT) │ │
│  └──────────────┘  └──────┬───────┘  └───────────┘ │
└─────────────────────────┬─┘───────────────────────── ┘
                          │ Internal API Calls
┌─────────────────────────▼───────────────────────────┐
│                   NODE.JS API LAYER                 │
│  Express / Hono  (REST — /api/v1/*)                 │
│  ┌───────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Products  │ │ Orders   │ │ Auth / Users      │   │
│  │ Router    │ │ Router   │ │ Router            │   │
│  └───────────┘ └──────────┘ └──────────────────┘   │
│  ┌───────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Cart      │ │ Payments │ │ Admin             │   │
│  │ Router    │ │ Router   │ │ Router            │   │
│  └───────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────┬───────────────────────────┘
                          │ Prisma ORM
┌─────────────────────────▼───────────────────────────┐
│                     MySQL (PlanetScale / RDS)        │
│  users · products · variants · orders · order_items │
│  carts · cart_items · addresses · discount_codes    │
└─────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼──────────────┐
          ▼               ▼              ▼
     Stripe API     Resend (Email)   Cloudinary
     (Payments)    (Transactional)   (Media CDN)
```

---

## Data Flow

### Storefront Page Load (SSR/RSC)
```
Browser → Next.js Server Component
  → fetch("/api/v1/products") [server-side, no client round-trip]
  → Node API → Prisma → MySQL
  → Returns hydrated HTML to browser
```

### Checkout Flow
```
Client: POST /api/v1/cart/checkout
  → Node API validates cart + stock
  → Stripe PaymentIntent created
  → Client: Stripe.confirmPayment()
  → Stripe webhook → POST /api/v1/webhooks/stripe
  → Order record written to MySQL
  → Resend: order confirmation email
```

### Admin Mutation
```
Admin Client → POST /api/v1/admin/products
  [Authorization: Bearer <access_token>]
  → Middleware: verifyJWT()
  → verifyRole("admin")
  → Controller → Prisma → MySQL
```

---

## Auth Strategy (JWT)

| Token | Storage | TTL | Purpose |
|-------|---------|-----|---------|
| Access Token | Memory (JS var) | 15 min | API authorization |
| Refresh Token | HttpOnly cookie | 7 days | Rotate access token |

### Flow
```
POST /api/v1/auth/login
  → bcrypt.compare(password, hash)
  → issue: { accessToken, refreshToken }
  → accessToken → client memory
  → refreshToken → Set-Cookie (HttpOnly, Secure, SameSite=Strict)

POST /api/v1/auth/refresh
  → read refreshToken from cookie
  → verify JWT signature + expiry
  → issue new accessToken

POST /api/v1/auth/logout
  → clear cookie server-side
  → client discards accessToken from memory
```

### Middleware Guard
```ts
// Applied to all /api/v1/admin/* and /api/v1/account/* routes
verifyJWT → decode → attach req.user → next()
// Role check applied per-router:
requireRole("admin") | requireRole("customer")
```

---

## Infrastructure

| Service | Provider |
|---------|----------|
| Hosting | Vercel (Next.js) |
| API | Vercel Functions or Railway |
| Database | PlanetScale (MySQL) |
| Media | Cloudinary |
| Email | Resend |
| Payments | Stripe |
| Monitoring | Sentry |
| Analytics | Vercel Analytics + custom events |

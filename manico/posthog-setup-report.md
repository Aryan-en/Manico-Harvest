# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Manico Harvest. Here is a summary of what was set up:

- **`instrumentation-client.ts`** — PostHog JS is initialised here using `posthog.init()`. This file is auto-loaded by Next.js 15.3+ on every client render, so no provider or wrapper component is needed.
- **`next.config.ts`** — Reverse-proxy rewrites added for `/ingest/*` routing requests through the app server to `eu.i.posthog.com`, preventing ad-blockers from dropping analytics data.
- **`lib/posthog-server.ts`** — Singleton `posthog-node` client for server-side event capture in API routes.
- **`app/(auth)/sign-up/page.tsx`** — Captures `user_signed_up` + calls `posthog.identify()` on successful registration; captures `oauth_sign_in_initiated` when Google OAuth is started; captures exceptions on auth errors.
- **`app/(auth)/sign-in/page.tsx`** — Captures `user_signed_in` + calls `posthog.identify()` on successful login; captures `oauth_sign_in_initiated`; captures `forgot_password_clicked`; captures exceptions on auth errors.
- **`app/(auth)/verify-email/page.tsx`** — Captures `email_verification_completed` + calls `posthog.identify()` after OTP verification; captures exceptions on failure.
- **`hooks/use-auth.ts`** — Captures `user_signed_out` and calls `posthog.reset()` on logout.
- **`components/home/Newsletter.tsx`** — Captures `newsletter_subscribed` on form submission.
- **`components/home/FeaturedProducts.tsx`** — Captures `add_to_cart_clicked` (with product name, slug, price, badge) and `view_full_shop_clicked` on their respective CTAs.
- **`components/home/HeroSection.tsx`** — Converted to a Client Component to capture `shop_all_products_clicked` on the hero CTA.
- **`app/api/v1/auth/register/route.ts`** — Server-side `user_registered` event + `posthog.identify()` on successful registration.
- **`app/api/v1/auth/login/route.ts`** — Server-side `user_logged_in` event + `posthog.identify()` on successful login.

## Events

| Event | Description | File |
|---|---|---|
| `user_signed_up` | User successfully created a new account via email/password | `app/(auth)/sign-up/page.tsx` |
| `user_signed_in` | User successfully signed in via email/password | `app/(auth)/sign-in/page.tsx` |
| `oauth_sign_in_initiated` | User initiated Google OAuth sign-in flow | `app/(auth)/sign-in/page.tsx`, `app/(auth)/sign-up/page.tsx` |
| `user_signed_out` | User signed out of their account | `hooks/use-auth.ts` |
| `email_verification_completed` | User successfully verified their email address with OTP | `app/(auth)/verify-email/page.tsx` |
| `newsletter_subscribed` | User submitted their email to subscribe to the newsletter | `components/home/Newsletter.tsx` |
| `add_to_cart_clicked` | User clicked Add to Cart on a product card | `components/home/FeaturedProducts.tsx` |
| `shop_all_products_clicked` | User clicked the Shop All Products CTA in the hero section | `components/home/HeroSection.tsx` |
| `view_full_shop_clicked` | User clicked View Full Shop CTA at the bottom of featured products | `components/home/FeaturedProducts.tsx` |
| `forgot_password_clicked` | User clicked the Forgot password? link | `app/(auth)/sign-in/page.tsx` |
| `user_registered` | Server-side: new user account successfully created via register API | `app/api/v1/auth/register/route.ts` |
| `user_logged_in` | Server-side: user successfully authenticated via login API | `app/api/v1/auth/login/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behaviour, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://eu.posthog.com/project/203277/dashboard/752110)
- **New Sign-ups**: [https://eu.posthog.com/project/203277/insights/7wQyoDSW](https://eu.posthog.com/project/203277/insights/7wQyoDSW)
- **Sign-ins over time**: [https://eu.posthog.com/project/203277/insights/hDm2UlXO](https://eu.posthog.com/project/203277/insights/hDm2UlXO)
- **Add to Cart clicks**: [https://eu.posthog.com/project/203277/insights/Qkqy3Nph](https://eu.posthog.com/project/203277/insights/Qkqy3Nph)
- **Newsletter subscriptions**: [https://eu.posthog.com/project/203277/insights/gjFdRfZr](https://eu.posthog.com/project/203277/insights/gjFdRfZr)
- **Sign-up to email verification funnel**: [https://eu.posthog.com/project/203277/insights/13SeLnMG](https://eu.posthog.com/project/203277/insights/13SeLnMG)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — `AuthProvider` currently identifies users on app load via the `/api/v1/auth/me` response, but you should verify this runs `posthog.identify()` for returning sessions so they are not left on anonymous distinct IDs.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

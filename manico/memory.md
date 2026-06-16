# Memory — Manico Harvest Foundation And Branding

Last updated: 2026-06-10 17:26 IST

## What was built

- Set up `app/globals.css` with Tailwind v4 CSS-first theme tokens from `context/ui-tokens.md`, including semantic color aliases, typography, spacing, radius, shadows, transitions, and base document styles.
- Added `app/icon.jpeg` from `app/fav.jpeg` so Next.js emits the JPEG app icon route for the browser tab/app icon.
- Added `components/layout/BrandLogo.tsx` as the shared Manico Harvest logo component.
- Updated `components/layout/Navbar.tsx`, `components/layout/NavbarMobileMenu.tsx`, and `components/layout/Footer.tsx` to use `BrandLogo`.
- Revised `BrandLogo` to crop `fav.jpeg` to the circular emblem only and render “Manico” / “Harvest” as live text beside it, removing the white rectangular spacing from the source image.
- Updated `context/ui-registry.md` with the global theme surface and imprinted `BrandLogo`.
- Updated `context/progress-tracker.md` with Tailwind token setup, `BrandLogo`, and related decisions.

## Decisions made

- Tailwind v4 setup follows the installed Next 16 docs: `@tailwindcss/postcss` in `postcss.config.mjs` and `@import "tailwindcss"` in `app/globals.css`.
- `app/fav.jpeg` remains the source brand asset; `app/icon.jpeg` is a copied convention file for Next app icon generation.
- Brand logo should not display the full rectangular source image in nav/footer. It should show only the cropped emblem plus live text.
- Internal logo links use `next/link` to satisfy Next lint rules.
- `BrandLogo` is decorative internally (`alt=""`, `aria-hidden="true"`); parent links provide the accessible label.

## Problems solved

- Build failures during verification were caused by sandboxed `next/font` Google Fonts fetches, not by app code. `npm run build` passes when network approval is granted.
- Next app icon convention requires JPEG icons to be named `icon.jpeg`; `favicon` itself is `.ico` only.
- The visible white spacing around the logo came from rendering the full source image in a wide container. Cropping the image to the emblem and rendering the wordmark as text fixed it.
- Lint flagged root navigation with raw `<a href="/">`; switching touched root links to `Link` resolved it.

## Current state

- `npm run lint` passes.
- `npm run build` passes with network approval for Google Fonts.
- Next build output includes `/icon.jpeg`.
- The repo appears untracked from this directory according to `git status --short` (`?? ./` from parent context), so `git diff` is not useful for file-level review here.
- Active UI work exists beyond foundation branding: home components such as `WhySection.tsx`, `TrustBar.tsx`, `Testimonials.tsx`, and `Newsletter.tsx` are present.

## Next session starts with

- Run `/remember restore`, then continue polishing the home page UI, starting with the currently active `components/home/WhySection.tsx`.
- If doing more UI work, read `context/ui-registry.md` first and run `/imprint` after any new or changed component.
- Consider replacing external Google font dependency with a local/font-safe setup later if repeated sandboxed builds are slowing development.

## Open questions

- Whether `BrandLogo` crop scale and object position should be visually tuned in-browser after screenshot review.
- Whether the current home page components should be audited for raw color values or non-token styling before more sections are added.

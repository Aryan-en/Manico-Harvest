# UI Rules

## Loading States

### Rules
1. Every async operation must render a loading state — no blank screens.
2. Use skeleton screens (not spinners) for content that has a known layout.
3. Spinner only for indeterminate operations (form submission, file upload).
4. Skeleton must match the exact shape of the loaded content (same height, width proportions).

### Patterns

```tsx
// Page-level loading: app/(store)/products/loading.tsx
export default function Loading() {
  return <ProductGridSkeleton count={12} />
}

// Skeleton component
function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-subtle rounded-lg aspect-[3/4] w-full" />
      <div className="mt-3 h-4 bg-subtle rounded w-3/4" />
      <div className="mt-2 h-4 bg-subtle rounded w-1/3" />
    </div>
  )
}

// Button loading state
<Button disabled={isPending}>
  {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
  {isPending ? "Processing..." : "Add to Cart"}
</Button>
```

### Loading State Duration Rules
- < 300ms: No loading indicator (perceived as instant).
- 300ms–1s: Skeleton or inline spinner.
- > 1s: Skeleton + optional progress context ("Loading 24 products…").

---

## Error Handling Patterns

### Hierarchy
```
Network Error → Toast (non-blocking, retry action)
Validation Error → Inline field message (never toast)
API Error 4xx → Inline contextual message near the triggering element
API Error 5xx → Error boundary fallback UI
Not Found → Dedicated 404 page
```

### Inline Validation
```tsx
// Field-level — always below the input
<div className="space-y-1">
  <Input {...register("email")} aria-describedby="email-error" />
  {errors.email && (
    <p id="email-error" role="alert" className="text-error text-sm">
      {errors.email.message}
    </p>
  )}
</div>
```

### Toast Notifications
```ts
// Non-blocking feedback for async operations
// Success: auto-dismiss 3s
// Error: auto-dismiss 5s + manual dismiss
// Warning: manual dismiss only

toast.success("Added to cart")
toast.error("Payment failed. Please try again.", { duration: 5000 })
```

### Error Boundary (Route Segment)
```tsx
// app/(store)/products/[slug]/error.tsx
"use client"
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-20">
      <p className="text-secondary">Something went wrong loading this product.</p>
      <Button onClick={reset} variant="outline">Try again</Button>
    </div>
  )
}
```

### Empty States
```tsx
// Every list/grid must handle empty
{products.length === 0 && (
  <EmptyState
    icon={<ShoppingBag />}
    title="No products found"
    description="Try adjusting your filters."
    action={<Button onClick={clearFilters}>Clear filters</Button>}
  />
)}
```

---

## Mobile-First Breakpoints

All styles written mobile-first. Desktop overrides via `sm:`, `md:`, `lg:`, `xl:`.

| Breakpoint | Width | Target |
|------------|-------|--------|
| (default) | 0px+ | Mobile — 320px minimum |
| `sm` | 640px+ | Large mobile / small tablet |
| `md` | 768px+ | Tablet portrait |
| `lg` | 1024px+ | Desktop |
| `xl` | 1280px+ | Wide desktop |
| `2xl` | 1536px+ | Ultra-wide (max-width container only) |

### Container

```tsx
// Max width: 1280px, centered, horizontal padding responsive
<div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
```

### Grid Patterns

```tsx
// Product grid
<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 lg:gap-6">

// Two-column page layout (content + sidebar)
<div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
  <main className="flex-1 min-w-0">  {/* min-w-0 prevents flex overflow */}
  <aside className="w-full lg:w-80 shrink-0">
```

### Typography Responsive

```tsx
// Hero heading
<h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">

// Section heading
<h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
```

---

## Interaction States

Every interactive element must have all four states defined:

| State | Requirement |
|-------|-------------|
| Default | Base appearance |
| Hover | Visual feedback — color/shadow shift |
| Focus | Visible focus ring (outline, not box-shadow) — 2px, offset 2px, brand accent color |
| Disabled | `opacity-50 cursor-not-allowed pointer-events-none` |
| Active/Pressed | Scale down `scale-[0.98]` or darken 10% |

```tsx
// Focus ring utility
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E94560] focus-visible:ring-offset-2"
```

---

## Accessibility Rules

- All images: meaningful `alt` text or `alt=""` for decorative.
- All icon-only buttons: `aria-label`.
- All form inputs: `<label>` associated via `htmlFor`/`id`.
- Modals/Drawers: trap focus, `role="dialog"`, `aria-modal="true"`.
- Color alone never conveys meaning — pair with icon or text.
- Minimum tap target: 44×44px (mobile).
- Contrast ratio: 4.5:1 minimum for body text, 3:1 for large text.

---

## Animation Rules

- Respect `prefers-reduced-motion`:

```tsx
// In Framer Motion
<motion.div
  animate={{ opacity: 1 }}
  initial={{ opacity: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
>
```

- No animation on critical path (blocking paint).
- Page transitions: max 300ms.
- Micro-interactions: max 150ms.
- Never animate `width`/`height` — animate `scale` or `max-height` instead.

---

## Form UX Rules

1. Inline validation on blur, not on each keystroke.
2. Submit button disabled while form is invalid or submitting.
3. On submit error: scroll to first error field.
4. Never clear filled fields on submission error.
5. Password fields: always include show/hide toggle.
6. Phone/card fields: use appropriate `inputmode` attribute.

```tsx
<input inputMode="numeric" pattern="[0-9]*" />  // numeric keyboard on mobile
<input inputMode="email" />  // email keyboard on mobile
```

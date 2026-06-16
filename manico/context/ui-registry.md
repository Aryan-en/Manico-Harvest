# UI Registry — Shared Component Inventory

## Component Map

| Component | Path | Type | Status |
|-----------|------|------|--------|
| `Button` | `components/ui/Button.tsx` | Primitive | Required |
| `Input` | `components/ui/Input.tsx` | Primitive | Required |
| `Textarea` | `components/ui/Textarea.tsx` | Primitive | Required |
| `Select` | `components/ui/Select.tsx` | Primitive | Required |
| `Checkbox` | `components/ui/Checkbox.tsx` | Primitive | Required |
| `Badge` | `components/ui/Badge.tsx` | Primitive | Required |
| `Skeleton` | `components/ui/Skeleton.tsx` | Primitive | Required |
| `Spinner` | `components/ui/Spinner.tsx` | Primitive | Required |
| `EmptyState` | `components/ui/EmptyState.tsx` | Primitive | Required |
| `Navbar` | `components/layout/Navbar.tsx` | Layout | Required |
| `BrandLogo` | `components/layout/BrandLogo.tsx` | Layout | Complete |
| `Footer` | `components/layout/Footer.tsx` | Layout | Required |
| `MobileMenu` | `components/layout/MobileMenu.tsx` | Layout | Required |
| `ProductCard` | `components/product/ProductCard.tsx` | Domain | Required |
| `ProductGrid` | `components/product/ProductGrid.tsx` | Domain | Required |
| `ProductCardSkeleton` | `components/product/ProductCardSkeleton.tsx` | Domain | Required |
| `VariantPicker` | `components/product/VariantPicker.tsx` | Domain | Required |
| `ProductImageGallery` | `components/product/ProductImageGallery.tsx` | Domain | Required |
| `CartDrawer` | `components/cart/CartDrawer.tsx` | Domain | Required |
| `CartItem` | `components/cart/CartItem.tsx` | Domain | Required |
| `CartSummary` | `components/cart/CartSummary.tsx` | Domain | Required |
| `CheckoutForm` | `components/checkout/CheckoutForm.tsx` | Domain | Required |
| `OrderSummary` | `components/checkout/OrderSummary.tsx` | Domain | Required |

---

## Foundation Map

| Surface | Path | Type | Status |
|---------|------|------|--------|
| `GlobalTheme` | `app/globals.css` | Design Tokens | Complete |

---

## Foundation Specs

### `GlobalTheme`

- Tailwind v4 is imported with `@import "tailwindcss"`.
- Project colors, type, spacing, radius, shadow, and transition defaults are defined in `@theme`.
- Semantic CSS variables for container spacing, input/button padding, z-index, duration, and easing live on `:root`.
- Base document styles set token-backed page background, foreground, font families, selection colors, and visible focus outlines.
- Tailwind-friendly semantic aliases are available for token-backed utility classes such as `bg-base`, `bg-surface`, `bg-subtle`, `text-foreground`, `text-secondary`, `text-inverse`, `border-border`, and `bg-accent`.

---

## Component Specs

### `Button`

```tsx
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"
type ButtonSize = "sm" | "md" | "lg" | "icon"

type ButtonProps = {
  variant?: ButtonVariant     // default: "primary"
  size?: ButtonSize           // default: "md"
  loading?: boolean           // shows spinner, disables interaction
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>
```

**Variant styles:**
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| `primary` | `#1A1A2E` | `#FFFFFF` | none |
| `secondary` | `#F4F4F2` | `#1A1A1A` | none |
| `outline` | transparent | `#1A1A1A` | `#E4E4E0` |
| `ghost` | transparent | `#1A1A1A` | none |
| `destructive` | `#DC2626` | `#FFFFFF` | none |
| `link` | none | `#E94560` | none, underline on hover |

---

### `Input`

```tsx
type InputProps = {
  label?: string
  error?: string
  helperText?: string
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
  fullWidth?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>
```

**States:** default · focus (ring accent) · error (ring error, error message below) · disabled · read-only

---

### `Navbar`

**Sections:**
- Left: Logo (links to `/`)
- Center: Navigation links — Shop, Collections, About (hidden mobile, visible `lg:`)
- Right: Search icon, Wishlist icon, Account icon, Cart icon (with item count badge)
- Mobile: Hamburger icon → `MobileMenu` drawer

**Behavior:**
- Sticky (`position: sticky; top: 0; z-index: 200`)
- Backdrop blur on scroll (add `backdrop-blur-sm bg-white/90` after `scrollY > 10`)
- Cart icon shows badge with item count when cart has items (badge: `#E94560` background)

```tsx
type NavbarProps = {
  transparent?: boolean   // for hero sections where navbar overlays image
}
```

---

### `BrandLogo`

File: `components/layout/BrandLogo.tsx`
Last updated: 2026-06-10

| Property | Class |
| -------- | ----- |
| Background | mark uses `bg-base` |
| Border | none |
| Border radius | mark uses `rounded-full` |
| Text — primary | `text-inverse font-bold tracking-wide` |
| Text — secondary | `text-accent font-semibold tracking-wide` |
| Spacing | `gap-2.5` |
| Hover state | none |
| Shadow | `shadow-sm` |
| Accent usage | `text-accent` for Harvest wordmark |

**Pattern notes:**
Use `BrandLogo` anywhere the Manico Harvest brand mark appears in navigation or footer chrome. Crop `fav.jpeg` to the emblem only inside the circular mark, then render the Manico Harvest wordmark as live text beside it. Let the parent link provide the accessible label.

---

### `MobileMenu`

- Full-screen overlay drawer (slides from left)
- Contains: Logo, nav links, account link, close button
- Closes on: close button click, backdrop click, route change, Escape key
- Framer Motion: `x: "-100%" → 0`, spring animation

---

### `ProductCard`

```tsx
type ProductCardProps = {
  product: {
    id: string
    name: string
    slug: string
    price: number
    compareAtPrice?: number   // shows sale badge if set and > price
    images: { url: string; alt: string }[]
    isNew?: boolean
    isSoldOut?: boolean
  }
  onAddToCart?: (productId: string) => void
  priority?: boolean          // passed to next/image priority prop
  showQuickAdd?: boolean      // show "Quick Add" button on hover
}
```

**Layout:**
- Image: `aspect-[3/4]`, `object-cover`, hover scales image 1.05 (`transition-transform duration-300`)
- Badges: Top-left — `NEW` (brand primary), `SALE` (accent), `SOLD OUT` (neutral)
- Info: Product name (`text-base font-medium`), Price (`text-md font-semibold`), compare-at price (strikethrough, `text-secondary`)
- Quick Add: Appears on hover overlay (desktop only), hidden on mobile

---

### `ProductGrid`

```tsx
type ProductGridProps = {
  products: ProductCardProps["product"][]
  loading?: boolean           // renders skeletons when true
  skeletonCount?: number      // default: 8
  columns?: 2 | 3 | 4        // default responsive: 2/3/4
}
```

---

### `VariantPicker`

```tsx
type Variant = {
  id: string
  label: string               // "S", "M", "L" or "Red", "Blue"
  available: boolean
  type: "size" | "color"
  colorHex?: string           // only for type="color"
}

type VariantPickerProps = {
  variants: Variant[]
  selected: string | null
  onChange: (variantId: string) => void
  type: "size" | "color"
}
```

**Size variant:** Pill buttons. Selected: filled brand primary. Unavailable: strikethrough, disabled, 50% opacity.

**Color variant:** Circular swatches (32×32px). Selected: ring offset accent. Unavailable: diagonal line overlay.

---

### `ProductImageGallery`

- Main image: large, `aspect-[3/4]`, click to open lightbox
- Thumbnails: horizontal scroll strip below main image
- Mobile: swipe gesture (Framer Motion drag)
- Active thumbnail: accent border ring

```tsx
type ProductImageGalleryProps = {
  images: { url: string; alt: string }[]
  priority?: boolean
}
```

---

### `CartDrawer`

- Slides from right (`x: "100%" → 0`)
- Backdrop: semi-transparent overlay closes drawer on click
- Structure: Header (title + close button) · Scrollable item list · Footer (subtotal + CTA)
- Empty state: Bag icon, "Your cart is empty", "Continue Shopping" link
- Footer: Subtotal, "Checkout" button (primary, full-width), "Continue Shopping" link
- Quantity controls: `-` / `+` buttons, inline number display
- Remove item: Trash icon button

```tsx
type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}
```

---

### `CartItem`

```tsx
type CartItemProps = {
  item: {
    id: string
    product: { name: string; image: string; slug: string }
    variant: { label: string }
    price: number
    quantity: number
  }
  onRemove: (itemId: string) => void
  onQuantityChange: (itemId: string, quantity: number) => void
}
```

---

### `Badge`

```tsx
type BadgeVariant = "default" | "success" | "error" | "warning" | "info" | "new" | "sale"

type BadgeProps = {
  variant?: BadgeVariant
  size?: "sm" | "md"
  children: React.ReactNode
}
```

---

### `Skeleton`

```tsx
type SkeletonProps = {
  className?: string     // pass width, height, border-radius via className
  count?: number         // renders N stacked skeletons
}

// Usage
<Skeleton className="h-4 w-3/4 rounded" />
<Skeleton className="aspect-[3/4] w-full rounded-lg" />
```

Animation: `animate-pulse` (Tailwind). Background: `--color-bg-subtle`.

---

### `EmptyState`

```tsx
type EmptyStateProps = {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}
```

Layout: centered, icon (48×48, secondary color), title (`text-lg font-semibold`), description (`text-secondary`), optional action button.

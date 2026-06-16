# UI Tokens — Design System Constants

## Color Palette

### Brand

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-primary` | `#1A1A2E` | Primary CTA backgrounds, key headings |
| `--color-brand-accent` | `#E94560` | Highlights, badges, sale tags, focus rings |
| `--color-brand-accent-hover` | `#C73652` | Accent hover state |
| `--color-brand-muted` | `#16213E` | Secondary surfaces, nav background |

### Neutral

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-base` | `#FAFAF9` | Page background |
| `--color-bg-surface` | `#FFFFFF` | Cards, modals, drawers |
| `--color-bg-subtle` | `#F4F4F2` | Input backgrounds, zebra rows |
| `--color-bg-overlay` | `rgba(0,0,0,0.48)` | Modal backdrops |
| `--color-border` | `#E4E4E0` | Default borders |
| `--color-border-strong` | `#C8C8C2` | Emphasized borders, dividers |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#1A1A1A` | Body copy, headings |
| `--color-text-secondary` | `#6B6B6B` | Meta info, captions, helper text |
| `--color-text-disabled` | `#A8A8A8` | Disabled states |
| `--color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--color-text-accent` | `#E94560` | Links, accent text |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#16A34A` | Stock available, payment success |
| `--color-success-bg` | `#DCFCE7` | Success alert background |
| `--color-error` | `#DC2626` | Validation errors, payment failure |
| `--color-error-bg` | `#FEE2E2` | Error alert background |
| `--color-warning` | `#D97706` | Low stock warning |
| `--color-warning-bg` | `#FEF3C7` | Warning alert background |
| `--color-info` | `#2563EB` | Informational states |
| `--color-info-bg` | `#DBEAFE` | Info alert background |

---

## Spacing Scale

Base unit: `4px`

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| `--space-0` | `0px` | `p-0` / `m-0` |
| `--space-1` | `4px` | `p-1` / `m-1` |
| `--space-2` | `8px` | `p-2` / `m-2` |
| `--space-3` | `12px` | `p-3` / `m-3` |
| `--space-4` | `16px` | `p-4` / `m-4` |
| `--space-5` | `20px` | `p-5` / `m-5` |
| `--space-6` | `24px` | `p-6` / `m-6` |
| `--space-8` | `32px` | `p-8` / `m-8` |
| `--space-10` | `40px` | `p-10` / `m-10` |
| `--space-12` | `48px` | `p-12` / `m-12` |
| `--space-16` | `64px` | `p-16` / `m-16` |
| `--space-20` | `80px` | `p-20` / `m-20` |
| `--space-24` | `96px` | `p-24` / `m-24` |

### Semantic Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-section` | `80px` | Vertical section padding |
| `--space-container-x` | `24px` (mobile) / `48px` (desktop) | Horizontal container padding |
| `--space-card` | `24px` | Card internal padding |
| `--space-input` | `12px 16px` | Input padding (y x) |
| `--space-button-sm` | `8px 16px` | Small button padding |
| `--space-button-md` | `12px 24px` | Default button padding |
| `--space-button-lg` | `16px 32px` | Large button padding |

---

## Typography Scale

Font stack:
- **Headings:** `Inter, system-ui, sans-serif` — weight 600/700
- **Body:** `Inter, system-ui, sans-serif` — weight 400/500
- **Mono:** `JetBrains Mono, monospace` — code, SKUs, prices

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | `11px` | `1.4` | 400 | Labels, badges |
| `--text-sm` | `13px` | `1.5` | 400 | Meta, captions, helper text |
| `--text-base` | `15px` | `1.6` | 400 | Body copy |
| `--text-md` | `16px` | `1.6` | 500 | Emphasized body |
| `--text-lg` | `18px` | `1.5` | 500 | Card titles, subheadings |
| `--text-xl` | `20px` | `1.4` | 600 | Section headings |
| `--text-2xl` | `24px` | `1.3` | 600 | Page subheadings |
| `--text-3xl` | `30px` | `1.25` | 700 | Page headings |
| `--text-4xl` | `36px` | `1.2` | 700 | Hero headings (mobile) |
| `--text-5xl` | `48px` | `1.1` | 700 | Hero headings (desktop) |
| `--text-6xl` | `60px` | `1.05` | 800 | Oversized display text |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Tags, badges, small chips |
| `--radius-md` | `8px` | Inputs, buttons |
| `--radius-lg` | `12px` | Cards |
| `--radius-xl` | `16px` | Modal, sheet containers |
| `--radius-2xl` | `24px` | Floating elements, pill-style cards |
| `--radius-full` | `9999px` | Pills, avatar circles |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Input focus, subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06)` | Cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Dropdowns, popovers |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.12), 0 8px 10px rgba(0,0,0,0.06)` | Modals, drawers |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | `0` | Default stacking |
| `--z-raised` | `10` | Cards on hover |
| `--z-dropdown` | `100` | Dropdowns, tooltips |
| `--z-sticky` | `200` | Sticky navbar |
| `--z-drawer` | `300` | Cart drawer, mobile menu |
| `--z-modal` | `400` | Modals, dialogs |
| `--z-toast` | `500` | Toast notifications |
| `--z-overlay` | `999` | Full-screen overlays |

---

## Animation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `100ms` | Hover states, color transitions |
| `--duration-base` | `200ms` | UI element transitions |
| `--duration-slow` | `300ms` | Page transitions, drawer slide |
| `--duration-slowest` | `500ms` | Skeleton shimmer, complex sequences |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy micro-interactions |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Enter animations |

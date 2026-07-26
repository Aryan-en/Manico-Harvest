# Rain Run Haldwani 2026 — event photos

Photos from Manico Harvest's first public exhibition (19 July 2026), rendered on `/about`
by `components/about/FirstEventStory.tsx`.

## In use

| File | Photo | Dimensions | Where it appears |
|---|---|---|---|
| `announcement-poster.jpg` | Cream/green "Hey Haldwani!" poster | 620×906 | Hero, beside opening narrative |
| `stall-athletes.jpg` | Full team plus athletes behind the stall | 914×804 | Gallery |
| `moringa-sattu.jpg` | Founder holding the Moringa Sattu pouch | 602×806 | Gallery |
| `founder-backdrop.jpg` | Founder at the 23 Tri Club backdrop | 632×874 | Gallery |
| `young-runner.jpg` | Founder with the young medal-winning runner | 590×826 | Gallery |
| `hamper-group.jpg` | Hamper presented to a group of athletes | 604×534 | Gallery |
| `product-lineup.jpg` | All five products on the table | 614×624 | Gallery |
| `family-stall.jpg` | Father, uncle and founder behind the stall | 614×758 | Gallery |
| `finish-arch.jpg` | Founder under the Rain Run finish arch | 600×542 | Gallery |
| `hamper-stage.jpg` | Hamper presented on stage | 928×820 | "Healthy Hampers" section |
| `family-team.jpg` | Father, uncle, brother and founder together | 910×986 | "The Backbone" section |

## Available but unused

Kept in the repo in case they're wanted later — not currently referenced:

| File | Photo | Why unused |
|---|---|---|
| `poster-hydration-partner.jpg` | Blue sponsor-logos poster | Mostly other brands' logos |
| `poster-rain-run.jpg` | "Rain Run 4 Edition" poster | 23 Tri Club branding, not ours |
| `product-lineup-rain.png` | Product lineup shot in heavier rain | Near-duplicate of `product-lineup.jpg` |

To add one, append an entry to the `GALLERY` array in `FirstEventStory.tsx` with its real
pixel `w`/`h` — the masonry layout uses intrinsic dimensions, so no crop math is needed.

## Notes

- The gallery is a **CSS masonry layout** (`columns-*` + `break-inside-avoid`). Every photo
  keeps its natural aspect ratio — nothing is cropped, so no faces get cut off.
- `width`/`height` on each `<Image>` must match the real file dimensions. They reserve exact
  layout space and prevent cumulative layout shift.
- If you replace a photo with one of different dimensions, **update `w`/`h` in the component**
  to match, or the layout will shift as it loads.
- `next/image` serves optimised WebP/AVIF at request time; these source files are the originals.

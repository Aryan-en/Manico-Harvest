# Rain Run Haldwani 2026 — event photos

Drop the event photos into this folder using **exactly these filenames**. They are
referenced by `components/about/FirstEventStory.tsx` and rendered on `/about`.

| Filename | Photo to use | Rendered as |
|---|---|---|
| `announcement-poster.jpg` | The cream/green Manico Harvest poster — *"Hey Haldwani! Come explore a range of healthy & easy to make Breakfast & Drinks"* | Hero, portrait 3:4 |
| `stall-athletes.jpg` | Wide group shot — full team plus athletes/runners standing behind the stall | Gallery, wide 16:10 |
| `moringa-sattu.jpg` | Founder holding up the Moringa Sattu pouch | Gallery, portrait 3:4 |
| `founder-backdrop.jpg` | Founder beside the 23 Tri Club / Shivalik International School backdrop | Gallery, portrait 3:4 |
| `young-runner.jpg` | Founder with the young boy runner wearing medals | Gallery, portrait 3:4 |
| `finish-arch.jpg` | Founder under the Rain Run Haldwani / PSP Hospital finish arch | Gallery, portrait 3:4 |
| `hamper-group.jpg` | Group of six presenting the hamper in front of the Dainik Jagran backdrop | Gallery, wide 16:10 |
| `product-lineup.jpg` | Founder seated behind all five products laid out on the table | Gallery, wide 16:10 |
| `hamper-stage.jpg` | Hamper being presented on stage to the woman in the yellow 23 Tri Club tee | "Healthy Hampers" section, 4:3 |
| `family-stall.jpg` | The three of you at the stall — father, uncle and founder in the white polos | "The Backbone" section, 4:3 |

## Notes

- **All ten are required** — any missing file renders as a broken image on `/about`.
- `.jpg` extension is expected. If your files are `.jpeg` or `.png`, either rename them
  or update the paths in `FirstEventStory.tsx`.
- Images are cropped with `object-cover`, so the subject should be reasonably centred.
  The portrait slots (3:4) crop the sides; the wide slots (16:10) crop top and bottom.
- Compress before committing — aim for **under ~400 KB each**. `next/image` will
  serve optimised WebP/AVIF variants, but the source file still ships in the repo.

## Photos not currently used

Three images from the original set aren't referenced, to keep the gallery tight:

- The blue *"Hydration Partner"* sponsor-logos poster
- The *"Rain Run 4 Edition"* event poster (23 Tri Club branding)
- The duplicate product-lineup shot taken in the rain

Add them by appending entries to the `GALLERY` array in `FirstEventStory.tsx`
(keep each row's `lg:col-span-*` values adding up to 12).

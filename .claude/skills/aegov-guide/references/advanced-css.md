# Advanced CSS guideline

Go beyond basic Tailwind utilities with nuanced CSS that is progressively enhanced, RTL-aware, device-adaptive, and accessible.

## Rules

- Use **TailwindCSS as the utility-first framework**, but experienced developers should adopt advanced CSS techniques beyond basic utilities.
- Use **`@supports` feature queries** for progressive enhancement with graceful fallbacks — e.g. wrap Grid in `@supports (display: grid)` (Tailwind: `supports-[display:grid]:grid`).
- Use **orientation media queries** (portrait/landscape), not just width breakpoints — important for tablets, kiosks, public terminals (Tailwind: `portrait:… landscape:…`).
- Provide the exact **`.sr-only`** pattern to hide content visually while exposing it to AT:
  ```css
  .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
  ```
- Use **contextual media queries:** hide non-essential UI in print (`print:hidden`); respond to display resolution and user preferences (dark mode, high contrast).
- Use **input-modality detection** — apply hover styles only where supported: `@media (hover: hover) and (pointer: fine) { … }` — to avoid broken hover behavior on touch devices.
- Use **CSS logical properties instead of directional ones** for RTL: replace `margin-left`/`padding-right` with `padding-inline-start`, `margin-inline-end`, etc. (Tailwind: `ps-4 pe-6`) — they auto-adapt to text direction.
- All CSS must work **across devices, languages, and assistive technologies** to serve UAE's bilingual (Arabic/English) user base.

## Common violations to flag

- Directional properties (`margin-left`, `padding-right`, `text-align: left`) instead of logical/inline equivalents — breaks RTL/Arabic layouts.
- Modern CSS (Grid, etc.) applied without `@supports` fallbacks.
- Hover-dependent interactions without `(hover: hover)`/`(pointer: fine)` guards — broken on touch.
- Custom visually-hidden implementations that also hide from screen readers (use the provided `.sr-only`), or `display:none` where AT-exposed content is needed.
- No `print:`/print-media handling; heavy UI printed unnecessarily.
- Ignoring orientation and user-preference (dark mode / high contrast) media queries on kiosk/public interfaces.

**Source:** https://designsystem.gov.ae/guidelines/advanced-css

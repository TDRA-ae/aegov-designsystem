# Layout guideline

Build with a mobile-first, containerized, breakpoint-driven grid rather than one full-page wrapper.

## Rules

- **5 standard breakpoints (min-widths):** `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.
- **Per-breakpoint container margin / inner width:** 1536 → 28px / 1480px; 1280 → 20px / 1240px; 1024 → 22px / 980px; 768 → 14px / 740px; ≤640 → 10px margin, 100% fluid.
- At **640px and below**, containers are 100% fluid (full device width).
- **Default grid = 6 columns** (each 1/6 ≈ 16.33% of container).
- Alternative grids: 4-column (25%), 3-column (33.33%), 12-column (only for large screens where 1/6 or 1/4 is inadequate).
- **Column gutter:** 24px on larger screens; may reduce on mobile for aesthetics.
- **Spacing scale:** 2px increments up to the 16px/1rem base; 4px increments from 16px to 48px; keep proportional ratios (16px = 2× 8px).
- Design **mobile-first**, starting at **320px** minimum, fluid until 640px.
- **Do** build the page as multiple separate section containers for better width management.
- **Don't** wrap the entire website in a single container.
- **Don't** use fluid (full-width) containers for a full corporate website — acceptable only for campaign sites or specific sections such as heroes.

## Common violations to flag

- A single top-level container wrapping the whole page.
- Non-standard breakpoints or container/margin widths that don't match the table.
- Fixed-width (non-fluid) layouts below 640px, or full-fluid layouts across an entire corporate site.
- Gutters other than 24px on desktop without justification.
- Ad-hoc spacing values that break the 2px/4px increment scale.
- Grids other than 3/4/6/12 columns.

**Source:** https://designsystem.gov.ae/guidelines/layout

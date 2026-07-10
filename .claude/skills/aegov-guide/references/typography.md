# Typography guideline

The UAE DLS type system as implemented in `@aegov/design-system` — Roboto/Inter (EN) and Noto Kufi Arabic/Alexandria (AR), fixed size + line-height tokens, and readability rules aligned to WCAG.

> **Source of truth:** these values are taken from the design system's code
> (`src/styles/tailwind.css` `@theme`, `src/global/global.css`, and the
> `aegov-title` / `aegov-text` components) — not the marketing site, whose
> published numbers differ. Trust the tokens below.

## Fonts

- **English:** body **Roboto**, headings **Inter**.
- **Arabic (RTL):** body **Noto Kufi Arabic**, headings **Alexandria** (applied automatically under `[dir="rtl"]`).
- Fallback stacks (verbatim from the theme):
  - `--font-roboto: 'Roboto', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
  - `--font-inter: 'Inter', ui-sans-serif, system-ui, sans-serif`
  - `--font-notokufi: 'Noto Kufi Arabic', ui-sans-serif, sans-serif`
  - `--font-alexandria: 'Alexandria', ui-sans-serif, system-ui, sans-serif`
- Base body: `text-base` (16px), color `aeblack-800` on light / `whitely-100` on dark.

## Size + line-height tokens

Each size token ships a paired line-height. **Body / text scale:**

| Token | Size | Line-height |
| --- | --- | --- |
| `text-xs` | 0.75rem / 12px | 1.4 |
| `text-sm` | 0.875rem / 14px | 1.4 |
| `text-base` | 1rem / 16px | 1.5 |
| `text-lg` | 1.125rem / 18px | 1.5 |
| `text-xl` | 1.25rem / 20px | 1.35 |
| `text-2xl` | 1.5rem / 24px | 1.35 |
| `text-3xl` | 1.875rem / 30px | 1.35 |

**Heading scale** — a minor-third (1.2 ratio) modular scale, rounded to even px:

| Token | Size | Line-height |
| --- | --- | --- |
| `text-display` | 3.625rem / 58px | 1.2 |
| `text-h1` | 3rem / 48px | 1.2 |
| `text-h2` | 2.5rem / 40px | 1.2 |
| `text-h3` | 2.125rem / 34px | 1.25 |
| `text-h4` | 1.75rem / 28px | 1.3 |
| `text-h5` | 1.5rem / 24px | 1.3 |
| `text-h6` | 1.25rem / 20px | 1.3 |

## Weights

- No custom weight tokens are defined; the standard Tailwind ladder applies: extralight 200, light 300, normal 400 (body default), medium 500, semibold 600, bold 700, extrabold 800.
- **Semantic heading elements** (`global.css`) default to: `h1`/`h2`/`h3` → **extrabold (800)**; `h4`/`h5` → **bold (700)**; `h6` → **semibold (600)**.
- The **`aegov-title`** component defaults to **bold (700)** in Inter (Alexandria in RTL), regardless of chosen `size`.

## Rules

- Use the size tokens above — do not hand-pick arbitrary `font-size`/`line-height` values.
- Keep body line-height as shipped (`text-base`/`text-lg` = 1.5); this satisfies WCAG 1.4.12 for main paragraph content.
- WCAG 1.4.12 spacing targets still apply: line-height ≥1.5× for body, paragraph margin 2×, word spacing ≥0.16×, letter spacing 0.12× of font size.
- Left-align English body (RTL bodies get `leading-relaxed` on `p`); center only for hero/display headlines.
- Keep a consistent heading hierarchy; start content blocks with a heading; never skip heading levels.
- Line length: keep roughly **60–100 characters** per line for readable body copy.
- Minimum base font size **1rem** for body reading text unless a specific context demands smaller.
- Don't: **never justify text** (EN or AR); no underline on non-hyperlink text; no paragraph indentation; don't load font weights the page never uses.

## Common violations to flag

- Font sizes / line-heights that don't match the token table (e.g. an H1 at anything other than 48px, or body at 1.35 line-height).
- Heading elements whose weight departs from the shipped ladder (h1–h3 extrabold, h4–h5 bold, h6 semibold) without reason.
- Justified paragraph text (forbidden in both scripts).
- Underlined text that is not a link.
- Wrong Arabic font (not Noto Kufi Arabic body / Alexandria headings) in RTL contexts.
- Base reading text below 1rem, or line length well over ~100 characters.
- Hardcoded `px`/`rem` typography instead of the design tokens.

**Source (codebase):** `src/styles/tailwind.css` (`@theme` size + font tokens), `src/global/global.css` (body + heading defaults), `src/components/aegov-title`, `src/components/aegov-text`.

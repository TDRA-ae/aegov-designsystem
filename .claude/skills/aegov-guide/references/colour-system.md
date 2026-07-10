# Colour system guideline

Establishes the mandated federal core palette (gold/red/green/black), a supporting palette, semantic colour mapping, and WCAG-based contrast rules.

## Rules

- **Core palette (federal identity):** AEGold `#92722A` (components) / `#B68A35` (branding); AERed `#EA4F49` (500); AEGreen `#4A9D5C` (500); AEBlack `#232528` (800, text) / `#1B1D21` (900).
- Ministries **must not** change the core colour swatch; authorities may adapt to their own brand colour.
- **Supporting palette (secondary/content):** Tech Blue `#043DFF` (600), Sea Blue `#0090D4` (600), Camel Yellow `#F29F0E` (500), Desert Orange `#EB5F24` (500), Fuchsia `#D946EF` (500), Slate `#475569` (600).
- **Semantic mapping:** Success = AEGreen; Error = AERed; Warning = Camel Yellow / Desert Orange; Information = Tech Blue / Sea Blue.
- **AEGold `#B68A35` cannot be a component background** — use `#92722A` instead.
- **Contrast (WCAG 2.1 AA, mandatory):** ≥4.5:1 for normal text, ≥3:1 for large text and graphics.
- **Approved text combinations:** AEBlack-800 `#232528` on white; white `#FCFCFC` on AEBlack-900 `#1B1D21`; white `#FFFFFF` on AEGold-600 `#92722A`.
- **Gradients:** use colours from the **same tonality** (shades 950–50). Recommended: subtle `.from-primary-400 .to-primary-600`; light `.from-primary-50 .to-primary-200`; dark `.from-primary-500 .to-primary-900`.
- **Background patterns:** contrast must exceed 4.5:1 and be **max 8% darker** than the section background.
- Add custom colours as **new tokens** (Tailwind v4) — do not replace existing tokens.
- Don't: reduce contrast below WCAG; use off-brand combinations; **pair opposite palette colours** (e.g. AEGreen with AEGold); use background patterns on homepages (except the pre-footer section).

## Common violations to flag

- Text/background contrast under 4.5:1 (normal) or 3:1 (large/graphics).
- AEGold `#B68A35` used as a component/background fill instead of `#92722A`.
- Wrong semantic colour (e.g. red for success, or a non-AEGreen success state).
- Core palette swatches altered on ministry sites.
- Opposite-palette pairings (AEGreen + AEGold).
- Gradients mixing colours across different tonalities.
- Background patterns on a homepage (outside pre-footer), or patterns >8% darker than the section.
- Overriding/replacing existing design tokens instead of adding new ones.

**Source:** https://designsystem.gov.ae/guidelines/colour-system

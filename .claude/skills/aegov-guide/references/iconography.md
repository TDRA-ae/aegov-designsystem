# Iconography guideline

Standardizes on Phosphor Icons with defined stroke weights, sizes, shapes, and contrast to keep icon usage consistent and accessible.

## Rules

- **Library:** Phosphor Icons (1,512 base icons; variants: Thin, Light, Regular, Bold, Filled, Duotone).
- **Default stroke width:** 2pt (`stroke-width="16"`). Icon stroke/weight must **correspond to the font weight** in use.
- **Format:** SVG preferred (performance + crispness); SVG in `<img>` acceptable if necessary.
- **Sizes:** 20×20, 24×24, 28×28, 40×40, 56×56, 80×80 px. **Minimum 24px** (WCAG 2.2 AA); 20×20 only sparingly / when necessary. For 18px font, use **28×28**.
- **State icons:** 48×48, usually bold stroke. Empty-state icons may go up to **80×80**.
- **Contrast:** icon-to-background at least **3:1**.
- **Approved colour combinations:** white on dark (bg-aeblack-900), white on primary-600, primary on white, black on white.
- **Shapes:** square, rounded-corner, or circular **only**. Irregular/blob shapes not allowed.
- **Duotone:** secondary layer opacity **40%** (lighter shade); recommended for dark mode; two-tone encouraged with secondary palette colours in small sections.
- Use icons for: components, navigation, headers/links, footers, status indicators, empty states, accessibility support.
- Don't overuse icons — overuse creates distracting, overwhelming interfaces.

## Common violations to flag

- Icons from a non-Phosphor library (inconsistent style).
- Icon smaller than 24px (except a deliberate, justified 20px use).
- Icon stroke weight not matching adjacent text/font weight.
- Icon/background contrast below 3:1.
- Irregular or blob-shaped icon containers (non square/rounded/circular).
- State icons not at 48×48 / bold, or empty-state icons oversized beyond 80×80.
- Duotone secondary layer not at 40% opacity.
- Raster icons where SVG should be used.
- Excessive icon density cluttering the UI.

**Source:** https://designsystem.gov.ae/guidelines/iconography

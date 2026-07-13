---
name: aegov-guidelines
description: Build compliant web applications following UAE Design System guidelines and standards. Use this skill to check against the guidelines and ensure compoenets are following the guidelines listed. Use this skill when the user is asking to build a new component, create component, or asking to check if a component is following the guidelines.
license: Complete terms in LICENSE.md
---

# UAE Design System Guidelines

## Typography guidelines
Operational rules for typography compliance with the UAE Design System. Includes WCAG 2.2 cross-references where the design system mandates a specific accessibility behavior.

### Quick decisions
 
| Situation | Rule |
| --- | --- |
| Body text font for (EN) | Roboto |
| Heading/Title font for (EN) | Inter |
| Body text font for (AR) | Noto Kufi Arabic |
| Heading/Title font for (AR) | Alexandria |
| Default body size | 16px / 1rem (never go below unless context demands it) |
| Default heading weight | `font-extrabold` (800) |
| Default body weight | `font-normal` (400) |
| Default body line-height | 1.5 (WCAG 1.4.12) |
| Default text alignment | Left (EN) / Right (AR) — never justify |
| Line length | 60–100 characters (~60% of container width) |

### Required fallback stacks
 
The design system mandates these exact fallback declarations. Use them verbatim — do not substitute.
 
**LTR (English):**
 
```css
body {
  font-family: "Roboto", -apple-system, BlinkMacSystemFont,
               system-ui, 'Ubuntu', 'Fira Sans',
               sans-serif;
}
```
 
**RTL (Arabic):**
 
```css
body {
  font-family: "Noto Kufi Arabic", sans-serif;
}
```
 
If the primary typeface fails to load, the OS-level fallback must trigger so the page never falls through to a generic serif.

### Text spacing
 
The design system explicitly aligns with WCAG 2.2 Success Criterion 1.4.12. All four conditions must be met:
 
| Property | Minimum value |
| --- | --- |
| `line-height` | 1.5× font size |
| Paragraph margin (after) | 2× font size |
| `word-spacing` | 0.16× font size |
| `letter-spacing` | 0.12× font size |
 
**What's automatic vs. manual:**
 
- **Automatic** (baked into Roboto / Noto Kufi Arabic): word-spacing, letter-spacing.
- **Automatic** (baked into the design system's content classes): line-height.
- **Manual** (Claude must add this when generating layouts): paragraph margin (2× font size after each `<p>`).

**Tolerance:** Line-height may be adjusted ±20% for aesthetic reasons, but never below 1.5× for body content.
 
### Heading spacing
 
Headings (`<h1>`–`<h4>`) use larger sizes and may use **tighter** line-heights than 1.5×. Rule of thumb: as font size increases, line-height decreases — but **never below 1rem**.
 
Worked examples from the design system:
 
| Heading | Font size | Suggested line-height |
| --- | --- | --- |
| `<h1>` | 62px | ~1.125rem |
| `<h3>` | 40px | ~1.325rem |
 
### Block spacing
 
Spacing between text blocks (margins, padding) must adapt responsively — reduce on smaller breakpoints. Cross-reference the design system's layout/grid guidance for breakpoint-specific values.

### Hierarchy pattern
 
The canonical content block structure:
 
1. **Heading** (level chosen by document position, not by visual weight).
2. **Optional support text** — an excerpt or strong supporting line directly under the heading.
3. **Body paragraphs.**
4. **Sub-heading** (one level lower) for further division within the same block.
5. Repeat.
Headings communicate document structure; pick the level by where the content sits in the outline, not by the size you want it to render at. Adjust appearance via class (`text-h2`, `text-h3`, etc.) on the correct semantic tag.

### Things to avoid in Typography
- Pair high-contrast sizes (e.g., a hero display next to `text-xs` body) — keep size jumps logical.
- Justify text in either English or Arabic — it slows reading speed.
- Underline text that isn't a hyperlink or text button — it confuses link affordance.
- Indent paragraphs with spaces or tabs — vertical rhythm carries paragraph separation.
- Use the H1 Display size outside of large hero/banner contexts.
- Use `<h1>`–`<h6>` for visual sizing alone — the level reflects document structure, not appearance. Adjust size with classes.

### WCAG 2.2 cross-reference

The typography rules above intersect with these WCAG 2.2 success criteria. When auditing typography, verify all of these:


| WCAG SC | Level | Where it applies in typography |
| --- | --- | --- |
| 1.3.1 Info and Relationships | A | Heading levels reflect structure, not visual size |
| 1.4.4 Resize Text | AA | Use `rem`/`em`; layout must hold up to 200% zoom |
| 1.4.8 Visual Presentation | AAA | Line length 60–100 chars, no justification, line-height ≥1.5 |
| 1.4.10 Reflow | AA | Responsive type at 320 CSS px without 2D scrolling |
| 1.4.12 Text Spacing | AA | line-height 1.5×, paragraph margin 2×, word 0.16×, letter 0.12× |
| 3.1.2 Language of Parts | AA | Inline language switches use `lang` attribute |

---

## Colour system guidelines

Operational rules for colour compliance with the UAE Design System, with explicit WCAG 2.2 cross-references.

### Quick decisions
 
| Situation | Rule |
| --- | --- |
| Brand colour at 600 slot | `primary-600` |
| Default body text | `text-aeblack-800` (`#232528`) on white/whitely background |
| Min contrast — normal text | **4.5:1** (WCAG 1.4.3 AA) |
| Min contrast — large text (≥18pt or ≥14pt bold) | **3:1** (WCAG 1.4.3 AA) |
| Min contrast — UI components, focus indicators, icons | **3:1** (WCAG 1.4.11 AA) |
| Min contrast — background pattern vs. content | **4.5:1** (design system rule) |
| Background pattern darkness vs. section background | ≤ 8% darker (design system rule) |
| Gradient tonal range | Same palette only (cross-palette only with neutral pairing) |
| Ministry palette change | **Forbidden** (no exceptions) |
| Authority palette change | Allowed — primary may be swapped, full 50–950 scale required |
| Custom colour | Always **add**, never replace |
| Min target size for interactive elements | **24×24 CSS px** (WCAG 2.5.8 AA) |
| Focus indicator contrast | **3:1** against adjacent colours (WCAG 2.4.11 AA) |

### The core palette
 
The core palette represents **strength** and is approved by the UAE Cabinet Office for federal use. Each colour ships as an 11-step scale (`50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`).

#### AEGold (primary brand)
 
| Step | Hex |
| --- | --- |
| 50 | `#F9F7ED` |
| 100 | `#F2ECCF` |
| 200 | `#E6D7A2` |
| 300 | `#D7BC6D` |
| 400 | `#CBA344` |
| 500 | `#B68A35` |
| 600 | `#92722A` |
| 700 | `#7C5E24` |
| 800 | `#6C4527` |
| 900 | `#5D3B26` |
| 950 | `#361E12` |

**Primary brand colour:** By default this is set to AEGold. This means the complete swatch of 50 - 950 for primary color is set as default to the 50 - 950 range of AEGold. The primary brand colour may be swapped out for an Authority palette colour, but the full 50–950 scale must be included — no cherry-picking individual steps.

#### Approved background neutrals
 
| Family | Approved shades |
| --- | --- |
| Whitely | `50` `#FFFFFF` · `100` `#FCFCFC` · `200` `#F7F7F7` · `300` `#F2F2F2` |
| Slate | `50` `#F8FAFC` · `100` `#F1F5F9` · `200` `#E2E8F0` · `300` `#CBD5E1` |
| AEBlack | `50` `#F7F7F7` · `100` `#E1E3E5` · `200` `#C3C6CB` · `300` `#9EA2A9` |

#### Text colour

The four pairings below are the design system's reference combinations. Any other pairing must be verified against WCAG 2.2 1.4.3 before use.

| Pairing | Foreground | Background |
| --- | --- | --- |
| AEBlack on White | `text-aeblack-800` `#232528` | `bg-whitely-100` `#FCFCFC` |
| White on AEBlack | `text-whitely-100` `#FCFCFC` | `bg-aeblack-900` `#1B1D21` |
| White on Primary | `text-whitely-50` `#FFFFFF` | `bg-primary-600` `#92722A` |
| Primary on light Primary | `text-primary-700` `#7C5E24` | `bg-primary-50` `#F9F7ED` |

> **Default for body copy:** `text-aeblack-800` on a whitely background.

#### Custom palettes (Tailwind CSS v4)
 
The design system uses Tailwind CSS v4. **All colour tokens go in CSS via the `@theme` directive** — there is no `tailwind.config.js`.

> ⚠️ Replacing `--color-primary-*` propagates immediately to every component and block in the design system. Always regression-test components after a primary swap.


### WCAG 2.2 — colour-relevant criteria

| SC | Level | Requirement | Where it applies |
| --- | --- | --- | --- |
| **1.4.1 Use of Colour** | A | Information conveyed by colour must also be conveyed another way | Form errors, status indicators, charts, link states |
| **1.4.3 Contrast (Minimum)** | AA | 4.5:1 normal text, 3:1 large text (≥18pt or ≥14pt bold) | All text |
| **1.4.11 Non-text Contrast** | AA | 3:1 for UI component states, focus indicators, meaningful graphics | Buttons, inputs, icons, chart bars |
| **2.4.7 Focus Visible** | AA | Keyboard focus indicator must be visible | Every interactive element |
| **2.4.11 Focus Not Obscured (Minimum)** | AA | When focused, an element must not be **entirely** hidden by author-created content (sticky headers, cookie banners, modals) | Audit z-index and sticky overlays — they often share colour with focus rings and mask them |

> **Deprecated in 2.2:** SC 4.1.1 Parsing was removed. Don't reference it in new audits.
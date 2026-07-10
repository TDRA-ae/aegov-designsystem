---
name: aegov-guide
description: Check and guide UI, code, and content against the official UAE Design System guidelines (typography, colour, imagery, iconography, layout, content, actions, accessibility, front-end development, advanced CSS). Use this skill WHENEVER you review, audit, or build anything for a UAE Design System / aegov / designsystem.gov.ae project and want to know whether it complies with the published guidelines — or when the user asks to check compliance, follow the guidelines, or make something guideline-compliant. Its default mode is advisory: it ANALYZES and reports conflicts rather than silently overriding what the user asked for. It only takes priority and rewrites code when the user explicitly asks to enforce the guidelines.
license: See LICENSE.md
---

# AEGOV Guide — the UAE Design System guidelines

This skill carries the operational rules distilled from the ten official guideline
pages at [designsystem.gov.ae/guidelines](https://designsystem.gov.ae/guidelines).
Its purpose is to **guide** — to tell the user how their work compares to the
published standard — not to quietly impose the standard on top of their intent.

## Behavioural contract — read this first

The single most important thing about this skill is **how** it applies. Follow this
exactly; it defines the difference between helping and hijacking.

1. **Analyze is the primary job. Action is secondary.** Your first output is always
   an assessment: does the work match the guidelines? Where does it diverge?
   Producing or changing code comes second, and only as described below.

2. **Guide, don't override (default mode).** When the user asks for something that
   conflicts with a guideline, **do not silently "fix" it to match the guideline.**
   Do what the user asked, and separately **report the conflict** (see the report
   format below) so they can decide. The user's stated intent wins by default —
   your job is to make sure they're informed, not to overrule them.

3. **Comply on explicit request (priority mode).** When the user explicitly asks to
   *follow*, *enforce*, *apply*, or *comply with* the guidelines — e.g. "make this
   compliant," "build this per the aegov guidelines," "fix it to match the design
   system" — then the guidelines **take priority** and you apply the rules directly
   in the code you produce. Still note any place you had to make a judgement call.

4. **When unsure which mode you're in, stay advisory and ask.** If it's ambiguous
   whether the user wants enforcement or just a build, default to analyze + report,
   and offer: "I can apply these fixes if you'd like."

## When conflicts exist — the report format

Whenever the work diverges from a guideline, surface it as a compact report. Use
this structure so it's skimmable and actionable:

```
## Guideline check — <what was reviewed>

Result: <Compliant | N conflicts found | Not applicable>

### Conflicts
1. **<Guideline area> — <short title>**
   - Guideline: <the specific rule, quoted or paraphrased>
   - Found: <what the code/design actually does>
   - Impact: <why it matters — a11y, brand, RTL, contrast, etc.>
   - Suggested fix: <the minimal change to comply>
   - Source: <the guideline page>

### Notes / judgement calls
- <anything ambiguous, or where the guidelines themselves conflict>
```

Keep it proportional: a one-line "Compliant — no conflicts found against
typography, colour, and actions guidelines" is the right answer when nothing is
wrong. Don't manufacture conflicts to seem thorough.

## The ten guidelines — what each covers and where to look

Read the relevant reference file(s) before assessing that dimension. Don't assess
from memory — the specific values (sizes, ratios, breakpoints) matter.

| Area | Check for | Reference |
| --- | --- | --- |
| **Typography** | Fonts (Roboto/Inter, Noto Kufi/Alexandria), 1.333 scale, line-height ≥1.5, never justify, ≤5 weights | [references/typography.md](references/typography.md) |
| **Colour system** | Core palette integrity, semantic mapping, WCAG contrast, AEGold usage, no opposite-palette pairing | [references/colour-system.md](references/colour-system.md) |
| **Imagery** | Human/realistic, approved aspect ratios, natural blur, overlay %, WebP + srcset | [references/imagery.md](references/imagery.md) |
| **Iconography** | Phosphor icons, ≥24px, stroke matches font weight, 3:1 contrast, allowed shapes | [references/iconography.md](references/iconography.md) |
| **Layout** | 5 breakpoints, container widths, 6/4/3/12 grids, 24px gutters, spacing scale, section containers not one wrapper | [references/layout.md](references/layout.md) |
| **Content** | British/Oxford English, sentence case, plain language, formal nav labels, no "e-services" | [references/content.md](references/content.md) |
| **Actions** | One solid primary per context, priority ladder, ≤4-word verb labels, FAB rules | [references/actions.md](references/actions.md) |
| **Accessibility** | WCAG AA, visible focus, keyboard-only, 175% zoom, alt text, WebVTT captions | [references/accessibility.md](references/accessibility.md) |
| **Front-end dev** | Perf budgets (LCP/FCP/TTI), code-splitting, semantic HTML, component architecture, bilingual | [references/frontend-development.md](references/frontend-development.md) |
| **Advanced CSS** | Logical properties for RTL, `@supports` fallbacks, `.sr-only`, hover/orientation queries | [references/advanced-css.md](references/advanced-css.md) |

## How to run a check

1. **Scope it.** Which guideline dimensions are relevant to what you're looking at?
   (A form → content, actions, accessibility, colour. A hero → imagery, typography,
   layout.) Only assess what applies.
2. **Read the reference(s)** for those dimensions so you compare against exact values.
3. **Assess** the code/design rule by rule.
4. **Report** using the format above — advisory by default.
5. **Act only** if the user asked to enforce/comply (priority mode), or after they
   approve your suggested fixes.

## One known inconsistency in the source guidelines

The **Accessibility** page cites **WCAG 2.1 AA**; the **Front-end development** page
cites **WCAG 2.2 AA**. When they conflict, treat **WCAG 2.2 AA** as the target (it's
the newer, stricter bar) and note it in your report.

## Relationship to aegov-ui

`aegov-ui` *builds* with the design system's components. This skill *checks against*
the design system's guidelines. They compose well: build with `aegov-ui`, then run
an `aegov-guide` check. If both are installed and the user asks to "build to the
guidelines," use `aegov-ui` for construction and this skill's rules as the bar.

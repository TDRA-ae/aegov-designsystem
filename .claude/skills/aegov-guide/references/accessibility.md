# Accessibility guideline

Ensure all UAE government interfaces meet WCAG accessibility standards so they are perceivable, operable, and understandable by everyone, including assistive-technology users.

## Rules

- Meet **WCAG 2.1 Level AA** (mandatory for federal government entities); page references WCAG 2.1 (June 2018). *(The front-end guide cites WCAG 2.2 AA — treat 2.2 AA as the target when they conflict.)*
- Every interactive/clickable element must show a **visible focus state** when reached via `Tab`.
- The entire site must be **fully operable with the keyboard alone** — no mouse-only actions.
- Test layout at **175% browser zoom**; no sections may overlap or become unusable.
- Icons must be a **minimum of 24px**.
- Provide **supporting text for screen readers** alongside icons (icons alone insufficient).
- All images must have descriptive **`alt` attributes**.
- ARIA attributes are **mandatory when required**; add ARIA that reflects visual state changes.
- For `<div>` elements acting as clickable actions, use **`aria-labelledby`** to expose an accessible name.
- Apply **accurate, tested colour-contrast ratios** on design-system colours.
- Apply proper **text spacing** (between paragraphs and words) per WCAG.
- Videos must have **subtitles/captions** for hearing-impaired users, delivered in **WebVTT** format.
- Captions must be **user-toggleable and language-selectable** — do not hard-embed captions into the video.
- Support native OS assistive tools: **Apple VoiceOver, Microsoft Narrator, Google TalkBack** — design for the user's own AT rather than proprietary widgets.
- Follow basic typography/readability principles as an accessibility baseline.

## Common violations to flag

- Clickable elements with no visible focus ring on keyboard `Tab`.
- Mouse-only interactions (hover-only menus, click handlers without keyboard equivalents).
- Icons under 24px, or icon-only controls with no screen-reader text.
- Images missing or with empty/decorative-but-unmarked `alt` text.
- `<div>`/`<span>` used as buttons without `aria-labelledby` (or a proper role/name).
- Insufficient colour contrast on text/UI.
- Video without WebVTT captions, or captions burned into the frame / not language-selectable.
- Layout breaking or overlapping at 175% zoom.

**Source:** https://designsystem.gov.ae/guidelines/accessibility

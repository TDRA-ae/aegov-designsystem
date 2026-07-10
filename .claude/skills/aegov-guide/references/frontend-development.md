# Front-end development guideline

Build fast, accessible, component-based, progressively-enhanced front-ends that perform well and work bilingually.

## Rules

- **Four core principles:** performance-first, progressive enhancement/graceful degradation, component-based architecture, accessibility-first.
- Meet **WCAG 2.2 Level AA**.
- **Performance targets:** LCP ≤ 2.5s, FCP ≤ 1.8s, TTI ≤ 5s.
- Implement **bundle splitting and lazy loading** (e.g. `React.lazy()`); use **route-based code-splitting** — never bundle all pages into one massive JS file.
- **Optimize images:** WebP/AVIF, responsive images, lazy-load below-the-fold; never ship large uncompressed JPEGs above the fold.
- **Minimize and audit third-party dependencies** before adding any; check the performance cost of heavy frameworks.
- Set **browser cache durations** on static assets (e.g. `expires 7d`); never serve assets without cache headers.
- Monitor **Core Web Vitals** with Lighthouse and Chrome DevTools.
- Build **atomic, single-purpose components**; separate **smart (logic) from presentational (display)** components.
- **Avoid tight coupling;** no "mega-components" mixing logic, UI, and layout.
- **Document all custom components** (props and usage).
- Recommended stack: **React or Vue.js with TypeScript**; build with **Webpack or Vite**.
- Use **semantic HTML first** (`<nav>`, `<button>`, proper heading hierarchy); add ARIA only when necessary.
- Never use `<div role="button">` where a native `<button>` works.
- Connect form controls to labels via native HTML or `aria-labelledby`/`aria-describedby`.
- Use landmarks with `aria-label` (e.g. `<nav aria-label="Main Navigation">`) for bilingual interfaces.
- Use ARIA state attributes appropriately: `aria-live`, `aria-expanded`, `aria-selected`, `aria-current` (e.g. `<div role="alert" aria-live="polite">`).
- **Support both Arabic and English** interfaces.
- Start from **functional HTML + progressive JS**; never block access if a script fails to load.
- Implement **service workers / caching**; provide fallbacks for older browsers (e.g. flexbox fallbacks).
- Ensure code **reacts to end-user settings** (OS/browser accessibility preferences).
- Test keyboard navigation and screen readers regularly with **JAWS, Microsoft Narrator, NVDA**.

## Common violations to flag

- Mega-components merging data-fetching, state, and DOM markup in one file.
- Single monolithic JS bundle; no lazy loading or code-splitting.
- Uncompressed/large above-the-fold images; missing responsive/lazy loading.
- Assets served without cache headers; unaudited heavy dependencies.
- `<div role="button">` and other non-semantic controls.
- Missing or incorrect ARIA states on interactive widgets (expanded/selected/current/live).
- No Arabic/English (bilingual) support; missing landmark `aria-label`s.
- Features that break entirely when JS fails (no graceful degradation).
- LCP/FCP/TTI exceeding the stated budgets.

**Source:** https://designsystem.gov.ae/guidelines/frontend-development

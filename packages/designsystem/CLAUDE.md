# AEGOV Design System — Project Context

## Overview

**Package:** `@aegov/designsystem` v0.2.23 (wrappers versioned in lockstep)
**Stack:** StencilJS 4.43.5 + Tailwind CSS 4.3.3 + TypeScript 5.9.3 (`stencil-tailwind-plugin` 2.0.6)
**Namespace:** `aegov` — build outputs `aegov.js`, `aegov.esm.js`, `aegov.css`
**Dev server:** port 3333

Framework-agnostic Web Components implementing the UAE Government Design System. **This package is one of four in a Lerna + Nx monorepo** — see the [root README](../../README.md). Building this package regenerates the React, Vue and Angular wrapper sources in the sibling packages.

---

## Quick reference

```bash
npm run build          # stencil build --docs → build:copy-css
npm run build:prod     # NODE_ENV=production
npm test               # unit + e2e
npm run test:unit      # spec only
npm run test:e2e       # e2e only
npm run test:watch     # unit + e2e, watch mode
npm run size           # size-limit budgets (.size-limit.json)
npx stencil generate   # scaffold a component
```

There is **no `npm start`** and no `www` playground in this package. The
documentation site lives in its own repo (`aegov-designsystem-docs`). To see
components running, use the monorepo test apps from the repo root:
`npm run test:html` / `test:react` / `test:vue` / `test:angular` (or
`npm run test:apps` for all four).

Build from the **repo root** (`npm run build`) when wrapper packages need regenerating.

---

## Component inventory — 57 directories

**Actions:** button, button-group, link
**Forms:** form-field, label, input, input-group, textarea, select (+ select-option, select-option-group), checkbox (+ group), radio (+ group), toggle, range, otp, fileupload, datepicker, progress
**Navigation:** breadcrumbs (+ item), pagination, tabs (+ tab, tab-panel), accordion (+ item), navbar (+ item), navblock (+ item), timeline (+ step)
**Overlays:** modal, drawer, dropdown, popover, tooltip
**Feedback:** badge, callout, banner, toast
**Layout / content:** card, bento-grid, aspect-ratio, separator, avatar (+ group), blockquote, text, title
**Site chrome:** header, header-banner, footer, footer-highlights

`aegov-context-menu` was removed (March 2026). `aegov-progress` / `aegov-progress-step` were renamed to `aegov-timeline` / `aegov-timeline-step`; the current `aegov-progress` wraps the native `<progress>`.

---

## API conventions — read this before touching any prop

The whole library follows one grammar. Breaking it is the most likely way to introduce an inconsistency.

| Slot | Meaning | Values |
| --- | --- | --- |
| `variant` | Semantic **colour** | `primary \| secondary \| neutral-max \| neutral-min` (+ `danger` on button/link). Exception: `aegov-badge`, where `variant` is a palette token. |
| `appearance` | Visual **style** | button/link `solid\|outline\|soft\|link`; badge/banner/callout/toast `soft\|solid`; card `solid\|light\|creative`; select `default\|listbox`; fileupload `default\|button\|dropzone`; otp `continuous\|individual`; datepicker `single\|range`; checkbox/radio group `default\|list\|cards\|pills` |
| `size` | Responsive string | `"sm md:base xl:lg"` — see [Responsive props](#responsive-props) |
| `is*` | **Every** boolean | `isDisabled`, `isRequired`, `isChecked`, `isOpen`, `isInvalid`, `isMultiple`, `isLoading`, `isPadding`, … |
| `label*` | User-visible / a11y strings | `label`, `labelNav`, `labelButton`, `labelHelp`, `labelPrev`, `labelRangeStart`, `logoLabel`, `groupLabel` |
| `count*` | Numeric counts | `countBoundary`, `countSibling`, `moreCount` |
| `extraClass` | Consumer class hook | **not** `class` |
| `fieldId` | Element ID | **not** `id`; auto-generated via `src/utils/id-generator.ts` |

Known deviations, kept for compatibility — do not copy the pattern:
- `aegov-navblock` has `activeBorder` (no `is` prefix).
- `aegov-badge` has a deprecated `color` prop that **overrides** `variant` when set.

### Size scales

- **Button / link:** `xs` h-9, `sm` h-10, `base` h-11, `lg` h-12, `xl` h-13 — from `SIZE_CLASSES` in `src/utils/action-classes.ts`, shared by both components.
- **Form controls:** five tokens `xs sm base lg xl` (input, textarea, select, checkbox, radio, toggle, range, fileupload). **Not three.**
- **OTP:** six — adds `2xl`.
- **Avatar:** seven — `xs sm base lg xl 2xl 3xl`.
- **Accordion, banner, callout, badge, pagination, tabs, timeline, navbar, navblock, drawer, card:** three — `sm base lg`.

### Responsive props

`src/utils/responsive-prop.ts` → `watchResponsiveProp(raw, validate, defaultValue, onChange)`. 32 components use it for `size`, plus `cols` on bento-grid and `ratio` on aspect-ratio.

- Parses `"sm md:base xl:lg"`, resolves largest matching min-width first via `matchMedia`.
- Breakpoint px read from `--breakpoint-*` on `:root`, with a hardcoded Tailwind fallback map.
- **`tailwind.css` re-declares all six `--breakpoint-*` on plain `:root` outside `@theme`** — Tailwind v4 tree-shakes unused theme tokens, so `getComputedStyle` would return `''` → NaN → media queries never match.
- Invalid tokens are silently ignored. Always `destroy()` the watcher in `disconnectedCallback`.

---

## Encapsulation

| Mode | Components | E2E selector |
| --- | --- | --- |
| none (`scoped: false`) | everything not listed below | `'component .inner'` |
| `scoped: true` | dropdown, popover, toast | `'component .inner'` |
| `shadow: true` | blockquote, modal, drawer, header, header-banner | `'component >>> .inner'` |
| `shadow: { delegatesFocus: true }` | button, checkbox, checkbox-group, datepicker, fileupload, input, otp, radio, radio-group, range, select, textarea, toggle | `'component >>> .inner'` |

`aegov-header` declares both `scoped: false` and `shadow: true` — shadow wins. Grep the whole `@Component({…})` block, not the first match.

**Why `scoped: true` for portals?** Scoped mode re-targets events so custom events still bubble after the DOM portal move. Portal components must also inject `<style>` via JS, because scoped CSS cannot reach a `document.body` descendant.

---

## Architecture patterns

### CSS naming

- Primary class `aegov-*` (`.aegov-toast`, `.aegov-card`).
- Modifiers and elements keep the short prefix (`.toast--error`, `.card__body`, `.input--lg`).
- Tailwind-only components: link, text, title.

### Cascade layers

`src/styles/tailwind.css:8` declares `@layer theme, base, components, aegov-internals, utilities;`. `global.css` is wrapped in `@layer base`.

Consequence: **consumer utilities always win** over the design system's element styling. `stencil.config.ts` rewrites the component-CSS Tailwind import from `layer(utilities)` to `layer(base)` so runtime-injected component styles cannot outrank consumer utilities. Verify with `grep '@layer utilities' dist/aegov/*.entry.js` — should be empty.

### Parent → child prop cascade

Parents assign props directly on child elements in `componentDidLoad` / `componentDidUpdate`. Used by: breadcrumbs, accordion, tabs, button-group, input-group, avatar-group, timeline, checkbox-group, radio-group, select, navbar, navblock, toast, header, fileupload, form-field.

Children receiving cascaded props mark them `@Prop({ mutable: true })` with an `@internal` JSDoc tag — **`@internal` props are excluded from `dist/docs.json`**, which is what makes docs.json the public API surface.

### Portals

dropdown, popover, toast, datepicker append to `document.body`. modal and drawer also unconditionally relocate themselves to `document.body` on mount (guarded by a `movedToBody` flag against re-entrant hydration loops), but move the host element itself rather than injecting a separate portal wrapper.

- Portals: `.aegov-dropdown-portal`, `.aegov-popover-portal`, `.aegov-toast-container--{position}`, `.aegov-datepicker-portal`. modal/drawer have no equivalent portal class — the component's own root element is what moves.
- **Never `cloneNode(true)`** on DOM containing Stencil components — it double-renders. Dropdown *moves* the slot element and moves it back on close, with `connectedCallback()` re-creating the portal so nested dropdowns survive the parent's move.
- Portals inject their own CSS including `<a>` display overrides and dark-mode colours.
- Focus restore uses `focus({ preventScroll: true })`.
- Toast keeps two persistent visually-hidden live regions on the body (`#aegov-toast-live-region`, `…-assertive`) and routes announcements by variant.

### Slot content extraction

```tsx
@State() slotContent = '';
componentWillLoad() { this.slotContent = this.el.textContent?.trim() || ''; }
```

### Pass-through attributes

`getPassThroughAttributes(el, additionalAttrs)` in `src/utils/attributes.ts` collects `aria-*`, `data-*` plus the named extras. Form components **delete `aria-invalid` and `aria-describedby`** from the result — Layer 1 owns both, and `composeDescribedBy()` preserves author IDs while appending hint/error/counter IDs.

### i18n

Components with their own UI strings keep a `STRINGS = { en, ar }` map and select with `isRtl(this.el)` from `src/utils/rtl.ts`. Fully translated: input (reveal/copy), select (search, empty, clear), fileupload (all strings incl. errors and size units), otp (cell labels), range (thumb labels), avatar (status, fallback), callout/banner/toast/badge (dismiss), breadcrumbs/pagination (nav labels), header-banner (trust copy), datepicker (all strings incl. the 27 preset labels; language follows `locale` when it is `ar`/`en`, otherwise `dir`).

**Known untranslated:** `aegov-select` multiple-mode "N selected" trigger text; `aegov-pagination` page numerals.

---

## Validation surface (Layer 1)

Spec: [validation-engine-addon.md](validation-engine-addon.md). Shared helpers in `src/utils/validation.ts`.

13 components: input, textarea, select, checkbox, checkbox-group, radio, radio-group, toggle, range, otp, fileupload, datepicker, form-field.

- **Props:** `isInvalid`, `errorMessage`, `hint`. **Slots:** `error`, `hint`. **Event:** `aegovValidate` (`AegovValidationDetail<T>`). **Methods:** `validate(trigger)`, `setCustomValidity(msg)`.
- Host class `.is-invalid`.
- `aria-live` on the error region is gated behind `hasBlurredOnce` to avoid AT spam during typing.
- `aegovValidate` is emitted by 12 of them — every control except `form-field`, which only cascades.
- **FormAssociated** (`formAssociated: true` + manual `attachInternals()` guarded for test mocks): all 10 single controls — input, textarea, select, checkbox, radio, toggle, range, otp, fileupload, datepicker. Needed because their native inputs now live in shadow DOM. This is why Safari ≥16.4 is the floor.
- **Pure aggregators** (children submit natively): checkbox-group, radio-group.
- Removed events: `aegovOtpInvalid` → `validity.patternMismatch`; `aegovFileuploadError` → `tooLong` / `typeMismatch` / `customError`.
- `aegov-form-field` cascades `isInvalid`/`errorMessage`/`hint`/`variant` to the first form-control descendant, only where the child has no own value; a truthy wrapper `isInvalid` always wins.

Optional Layer 2: `@aegov/designsystem-validation` (v0.1.0) lives in a **separate repo** at `../../../aegov-designsystem-validation` (not in this monorepo). Docs must present it as optional and must not assume it is published.

---

## Documentation

The documentation site is a **separate repository** — `aegov-designsystem-docs`
(`../../../aegov-designsystem-docs`). It installs `@aegov/designsystem` from npm
and serves the pages with the live component bundle from `dist/aegov/`. The
markdown sources, page shells, `layout.js`, `doc-style/`, `build-docs.js`, and
the Playwright a11y suite (`tests/a11y/`) all moved there.

What this package still owns for the docs' benefit:

- `dist/docs.json` (`docs-json` output target) — the generated public API the
  docs pages reference.
- The `./theme` (→ `dist/styles/tailwind.css`) and `./base`
  (→ `dist/global/global.css`) package exports — the docs' Tailwind entry
  imports these. `build:copy-css` populates `dist/styles` and `dist/global`.

Do not reintroduce a `www` output target or docs sources here.

---

## Known gotchas

1. **Namespace is `aegov`** — HTML must load `/build/aegov.esm.js`, not any package name.
2. **Stencil JSX `for`** — `htmlFor={v}` renders literally as `htmlfor`. Use `{...{ for: v }}`.
3. **Reserved attribute names** — never `@Prop() id | class | title | style | prefix | suffix`. Use `fieldId`, `extraClass`, `authorTitle`, `addonPrefix`, `addonSuffix`.
4. **`scoped: false` slot visibility** — light-DOM children with `slot="…"` stay visible even when the `<slot>` is not rendered. Hide with CSS, not a conditional `<slot>`.
5. **Portal `cloneNode` double-renders** Stencil components. Move the DOM instead.
6. **Runtime-only Tailwind classes are never generated.** The Stencil Tailwind plugin scans a component's own CSS, not its `.tsx`. Utilities named only in JS class strings (e.g. `action-classes.ts`) land on the element with no rule behind them — this is why focus-ring `outline-*` colours live in `aegov-button-shared.css`.
7. **`aegov-title` renders `<p>` unless `headingType` is set**, and offers no `h1`. A title without `headingType` is not a heading.
8. **Never key CSS off a reflected boolean prop.** Stencil sets the attribute when the prop becomes `true` but **does not remove it when it becomes `false`** — the stale previous value remains, so `[is-disabled]` keeps matching after a re-enable. `isDisabled` also only reflects on some controls. Style from the **inner native control** instead (`:has(input:disabled)`), which every form control renders in the light DOM with `disabled={this.isDisabled}` and which is therefore reactive. This is what the dimmed-label rules in `form-field.css` do; they previously targeted `aegov-input[disabled]` on the host and silently matched nothing.
9. **before-close events are aligned** — `aegovModalBeforeClose` and `aegovDrawerBeforeClose` are both `@Event({ cancelable: true })`, cancelled with `e.preventDefault()`. The drawer previously passed a `preventDefault` closure in `e.detail`; do not reintroduce that split.
10. **`invisiblePrehydration` is currently `true`** in `stencil.config.ts` (Stencil hides components until hydrated). The adjacent comment still describes the old `false` setting — trust the value, not the comment.
11. **Plugin order in `stencil.config.ts` matters:** sass → tailwindGlobal → tailwindPlugin → tailwindHMR.
12. **Callout self-validates its slots** — `link` + `actions` together, or a non-button/link child of `actions`, renders a visible configuration error instead of the callout.
---

## Testing

- Unit: `newSpecPage()` from `@stencil/core/testing`. E2E: `newE2EPage()` with Puppeteer.
- Shadow DOM E2E needs `>>>`: `page.find('aegov-modal >>> [role="dialog"]')`.
- Portal E2E must wait on the body portal: `page.waitForSelector('.aegov-dropdown-portal .aegov-dropdown')`.
- Cross-component a11y: `src/utils/accessibility.spec.ts` (spec, runs here). The browser-driven Playwright a11y suite moved to the `aegov-designsystem-docs` repo, where it runs against the docs pages.
- Spec tests on shadow components: use `q()` / `qa()` from `src/utils/test-helpers.ts`, which search the host's shadow root, its light DOM and every nested shadow root. `page.root.querySelector()` returns null for anything a shadow component renders. A compound selector can't span a boundary — `q(page.root, 'aegov-input input')` fails; write `q(q(page.root, 'aegov-input'), 'input')`.
- mock-doc gaps that bite component code: no `MutationObserver` (guard with `typeof MutationObserver !== 'undefined'`), no `Element.toggleAttribute`, no event retargeting across shadow roots, `ElementInternals.setFormValue` unimplemented (already try/caught).
- E2E on shadow components: `'aegov-toggle >>> input'` (works in `page.find`/`findAll` and Puppeteer `$`/`$eval`/`waitForSelector`). Put `>>>` after the **last** shadow host only. Slotted children (`[slot="…"]`) are light DOM — `'aegov-header img[slot="logo"]'`, no `>>>`. Inside `page.evaluate`, go through `host.shadowRoot.querySelector(…)`, and read focus as `document.activeElement.shadowRoot.activeElement`.
- `page.evaluate` can't return a `DOMRect` — it serializes to `{}`. Return plain numbers (`rect.toJSON()` or destructure).
- `E2EElement` has no `hasAttribute`; use `getAttribute(…)` + `toBeNull()`.
- Size: 1032 unit tests and 545 e2e tests (Oct 2026), all green. Every component has spec + e2e except bento-grid, footer, footer-highlights, header-banner, navblock and navblock-item, which have one each.

---

## Reference

- `dist/docs.json` — generated public API for every tag. The source of truth for props/events/methods/slots.
- `src/utils/types.ts` — all shared types and the `*_SIZES` / `*_VARIANTS` const arrays used by `warnIfInvalidEnumProp`.
- `src/styles/tailwind.css` — the `@theme` token definitions.
- [docs/STENCIL.md](docs/STENCIL.md) — Stencil notes.

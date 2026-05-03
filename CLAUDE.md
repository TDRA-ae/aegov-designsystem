# AEGOV Design System - Project Context

## Overview

**Package:** `@aegov/design-system` v0.1.0
**Stack:** StencilJS v4.29.1 + Tailwind CSS v4.1.3 + TypeScript 5.8.3
**Namespace:** `aegov` — build outputs: `aegov.js`, `aegov.esm.js`, `aegov.css`
**Dev server:** port 3333

A framework-agnostic web component design system. Components work in React, Angular, Vue, and plain HTML.

---

## Quick Reference

```bash
npm start              # Dev: watch docs + Tailwind + Stencil
npm run build          # Full build with docs
npm run build:prod     # Production (minified, stripped)
npm test               # Unit + E2E tests
npm run test:unit      # Unit only
npm run test:e2e       # E2E only
npm run test:coverage  # Coverage report
npm run generate       # Scaffold new component
```

---

## Project Structure

```
src/
├── components/          # 49 component directories (~36 unique components)
├── utils/               # Shared utilities (see below)
│   ├── types.ts         # All shared TypeScript types (470+ lines)
│   ├── attributes.ts    # Pass-through attribute extraction (aria-*, data-*)
│   ├── focus-management.ts  # Focus trap, cycle, shadow DOM queries
│   ├── keyboard-handler.ts  # Configurable keyboard event handling
│   ├── id-generator.ts  # Auto-increment ID generation for form fields
│   ├── portal-manager.ts    # Portal DOM lifecycle (create/remove)
│   ├── scroll-lock.ts   # Reference-counted body scroll locking
│   ├── z-index-manager.ts   # Overlay stacking management
│   ├── icons.tsx         # Shared variant SVG icons (getVariantIcon)
│   ├── test-helpers.ts   # Test utilities (events, mocks, a11y helpers)
│   ├── accessibility.spec.ts  # WCAG 2.1 AA cross-component tests
│   └── index.ts          # Re-exports types
├── styles/
│   └── tailwind.css      # Tailwind @theme config (OKLCH colors, fonts, tokens)
├── global/
│   ├── global.css        # Global styles (typography, links, form controls)
│   ├── fonts.css         # Font definitions
│   ├── form.css          # Reference-only form styles (not imported)
│   ├── app.ts            # Stencil globalScript (inits toast-helper)
│   └── toast-helper.ts   # Toast manager (stacking/racking)
├── doc-style/
│   └── doc-style.css     # Source CSS for documentation site
├── docs/                 # Generated documentation site
│   ├── index.html        # Landing page (dev server entry)
│   ├── doc-style.css     # Compiled doc styles
│   ├── hljs.css          # Syntax highlighting
│   ├── layout.js         # Navigation JS
│   ├── markdown/         # 36 source markdown files
│   └── pages/            # 36 generated HTML pages
└── index.ts              # Library entry point (exports all types)

docs/
└── STENCIL.md            # StencilJS v4.42+ complete reference guide

scripts/
├── build-docs.js         # Markdown → HTML doc builder (marked + highlight.js)
└── verify-build.js       # Build verification
```

---

## Build Configuration

### stencil.config.ts

Critical settings:

```typescript
namespace: 'aegov'                    // Determines ALL output filenames
globalScript: 'src/global/app.ts'
globalStyle: 'src/global/global.css'
indexHtml: 'src/docs/index.html'      // Dev server entry
invisiblePrehydration: false          // Prevents FOUC (revert if issues)

// Plugin order MUST be maintained:
plugins: [
  sass(),             // 1. Sass preprocessing
  tailwindGlobal(),   // 2. Global Tailwind styles
  tailwindPlugin(),   // 3. Component-scoped Tailwind
  tailwindHMR()       // 4. Hot Module Reloading (dev)
]

devServer: { reloadStrategy: 'pageReload' }  // Required for Web Components
```

### Output Targets

| Target | Purpose |
|--------|---------|
| `dist` | Standard distribution |
| `dist-custom-elements` | Tree-shakeable custom elements |
| `docs-readme` | Auto-generated README.md per component |
| `docs-json` | API documentation JSON (`dist/docs.json`) |
| `www` | Development server (copies `src/docs/`) |
| `reactOutputTarget` | React wrappers → `../aegov-dls-3-react/` |

Angular and Vue output targets are configured but commented out.

---

## Component Inventory

### 49 Directories, ~36 Unique Components

**UI Components:**
aegov-accordion (+ item), aegov-aspect-ratio, aegov-avatar (+ group), aegov-badge, aegov-banner, aegov-blockquote, aegov-breadcrumbs (+ item), aegov-button (+ group), aegov-callout, aegov-card, aegov-drawer, aegov-dropdown, aegov-link, aegov-modal, aegov-pagination, aegov-popover, aegov-progress, aegov-separator, aegov-tabs (+ tab + tab-panel), aegov-timeline (+ step), aegov-toast, aegov-tooltip

**Form Components:**
aegov-checkbox (+ group), aegov-datepicker, aegov-fileupload, aegov-form-field, aegov-input (+ group), aegov-label, aegov-otp, aegov-radio (+ group), aegov-range, aegov-select (+ option + option-group), aegov-textarea, aegov-toggle

**Typography:**
aegov-text, aegov-title

**Layout:**
aegov-header

---

## Encapsulation Rules

| Mode | Components | E2E Selectors |
|------|-----------|---------------|
| `scoped: false` (default) | Most components | `'component .inner'` |
| `scoped: true` | dropdown, toast, popover, datepicker | `'component .inner'` |
| `shadow: true` | modal, drawer | `'component >>> .inner'` |

**Why scoped: true for portals?** Stencil's scoped mode provides event re-targeting needed for custom events to bubble correctly after DOM portal moves. Portal components also inject `<style>` via JS since scoped CSS can't reach portal elements.

---

## Architecture Patterns

### CSS Naming Convention

- **Primary class:** `aegov-*` prefix (e.g., `.aegov-toast`, `.aegov-tabs`, `.aegov-card`)
- **Modifier classes:** shorter prefix (e.g., `.toast--error`, `.tabs--simple`)
- **Element classes:** shorter prefix (e.g., `.toast__icon`, `.card--border-1`)
- **Tailwind-only components:** aegov-link, aegov-text, aegov-title (no base class)

### Parent-Child Communication

Parent sets props on children via direct DOM property assignment:

```typescript
componentDidLoad() {
  const children = this.el.querySelectorAll('aegov-child');
  children.forEach(child => { child.parentProp = this.someValue; });
}
```

Used in: breadcrumbs, accordion, button-group, tabs, form-field, input-group, checkbox-group, timeline, radio-group.

### Slot Content Extraction

Prevents text duplication bug when manually rendering slot content:

```typescript
@State() slotContent: string = '';
componentWillLoad() { this.slotContent = this.el.textContent?.trim() || ''; }
```

### Portal Pattern

Used by: dropdown, toast, datepicker. Content appended to `document.body`.
- Singleton: only one dropdown open at a time
- Move-not-clone: slot content physically moved (never `cloneNode` on Stencil components)
- Style injection via JS for portal elements (scoped CSS can't reach them)
- Must override global `<a>` styles (`display: block; margin: 0;`) inside portals

### Pass-Through Attributes

Uses `@Element()` + `getPassThroughAttributes()` from `src/utils/attributes.ts`:

```typescript
const attrs = getPassThroughAttributes(this.el, new Set(['id']));
// Extracts aria-*, data-*, and specified additional attributes
```

### Form Element ID Pattern

```typescript
import { generateId } from '../../utils/id-generator';
if (!this.fieldId) this.fieldId = generateId('aegov-input');
```

### Event Naming

Custom events include component name: `aegovCalloutDismiss`, `aegovBadgeDismiss`, `aegovInputChange`.

---

## Tailwind CSS v4 Integration

- **CSS-first config** via `@theme` block in `src/styles/tailwind.css` (no JavaScript config)
- **OKLCH color space** for all custom colors
- **Color palette:** primary, secondary, aeblack, aered, aegreen, aegold, techblue, seablue, camel, desert, whitely, fuchsia, slate, purple, pink, indigo, lime (each with 50-950 shades)
- **Fonts:** Roboto (body), Inter (headings), Noto Kufi Arabic (RTL body), Alexandria (RTL headings)
- Use `@apply` for Tailwind utilities in component CSS files

---

## Known Gotchas

1. **Namespace is "aegov"** — HTML imports must use `/build/aegov.esm.js` and `/build/aegov.js`, NOT "aegov-design-system"
2. **Global `<a>` styles are unlayered** — always beat Tailwind utility classes. Portal components must inject explicit overrides
3. **Reserved HTML attributes** — never use `id`, `title`, `class`, `style` as `@Prop`. Use alternatives: `fieldId`, `authorTitle`. Pass `title` via pass-through attributes
4. **Stencil JSX `for` attribute** — cannot use `htmlFor={value}`, renders as `htmlfor` literally. Must use `{...{ for: value }}` spread pattern
5. **`scoped: false` slot visibility** — light DOM children with `slot="..."` stay visible even when `<slot>` isn't rendered. Use CSS `display: none` to hide them
6. **Portal cloneNode breaks Stencil** — never `cloneNode(true)` on DOM containing Stencil web components. Use DOM move (`appendChild`) instead
7. **Host display matters** — block-level semantic elements need `:host { display: block; }`
8. **Button sizes**: sm=`h-10`, base=`h-12`, lg=`h-13` — form inputs must match
9. **`description` prop renamed to `hint`** on aegov-checkbox / aegov-radio / aegov-toggle / aegov-fileupload (Layer 1 validation surface). Pre-production rename, no compat shim. CSS class renamed `*__description` → `*__hint`.
10. **`aegovOtpInvalid` and `aegovFileuploadError` events removed** in favor of unified `aegovValidate` (carries `validity` flags: `patternMismatch`, `tooLong`, `typeMismatch`, `customError` etc.).
11. **`aegov-form-field` cascade** — sets `isInvalid`/`errorMessage`/`hint` on first form-control descendant only if child has no own value. Does NOT clobber author-supplied props.

---

## Validation Surface (Layer 1)

All 13 form components expose a uniform validation surface — see [`validation-engine-addon.md`](validation-engine-addon.md):

**Props:** `isInvalid` (boolean), `errorMessage` (string), `hint` (string)
**Slots:** `error`, `hint`
**Event:** `aegovValidate` carrying `AegovValidationDetail<T>` with `{ name, value, validity, validationMessage, customError, trigger }`
**Methods:** `validate(trigger?)` returns `Promise<AegovValidationResult>`; `setCustomValidity(message)` mirrors native API
**Host class:** `.is-invalid` toggled by `isInvalid`
**ARIA:** `aria-invalid` on inner control; `aria-describedby` chain composes existing IDs (e.g. textarea counter) + error/hint IDs without clobbering author values

**FormAssociated components** (use ElementInternals for `<form>` participation): `aegov-otp`, `aegov-fileupload`, `aegov-select` (listbox variant), `aegov-datepicker`. Manual `attachInternals()` per host element (not the `@AttachInternals` decorator) due to Stencil 4.38 / tailwind-plugin compatibility constraint — see plan §6.8.

**Pure aggregator groups** (NOT FormAssociated — children submit individually): `aegov-checkbox-group`, `aegov-radio-group`. Group emits aggregate `aegovValidate` with array/string value.

**Value type per component** (FormData payload):
| Component | JS type | FormData |
|---|---|---|
| input/textarea/select(single)/otp/datepicker(single) | string | string |
| select(multiple)/checkbox-group/fileupload | array | per-value FormData entries |
| range(range mode) | `{ low, high }` | `name-low`, `name-high` |
| datepicker(range) | `{ start, end }` | `name-start`, `name-end` |
| checkbox/toggle | boolean | `'on'` if checked |

**aria-live gate (gap §7.10)**: error region's `role="alert" aria-live="polite"` activates only after first blur to avoid AT spam during typing.

---

## Testing

- **Unit tests:** `newSpecPage()` from `@stencil/core/testing`
- **E2E tests:** `newE2EPage()` with Puppeteer
- **Cross-component a11y:** `src/utils/accessibility.spec.ts` (WCAG 2.1 AA)
- **Test helpers:** `src/utils/test-helpers.ts` (event creation, DOM inspection, mocks, a11y utilities)
- **Shadow DOM E2E:** `'component >>> .inner-selector'` (triple-angle)
- **Non-shadow E2E:** `'component .inner-selector'` (regular descendant)
- **Target:** 100% coverage, 2,700+ tests

---

## Documentation Build System

Documentation is generated from markdown source files:

1. **Source:** `src/docs/markdown/*.md` (36 files)
2. **Build:** `node scripts/build-docs.js` converts markdown to HTML via `marked` + `highlight.js`
3. **Output:** Injected into `src/docs/pages/*.html` between `<!-- DOC:START -->` / `<!-- DOC:END -->` markers
4. **Doc styles:** `src/doc-style/doc-style.css` compiled to `src/docs/doc-style.css` via Tailwind CLI
5. **Watch mode:** `node scripts/build-docs.js --watch`

The `npm start` command runs doc builder, Tailwind CSS watcher, and Stencil dev server concurrently.

---

## Reference Documentation

- **StencilJS reference:** `docs/STENCIL.md` — comprehensive StencilJS v4.42+ API guide
- **Component docs:** `src/docs/markdown/aegov-*.md` — per-component documentation
- **Type definitions:** `src/utils/types.ts` — all shared TypeScript types (470+ lines)
- **Tailwind theme:** `src/styles/tailwind.css` — complete design token configuration

---

## React Package

**Location:** `../aegov-dls-3-react/`
**Configured via:** `@stencil/react-output-target` in stencil.config.ts
**Auto-generates:** React wrappers for all components during Stencil build

---

## Per-Component File Structure

```
aegov-{name}/
├── aegov-{name}.tsx          # Component implementation
├── aegov-{name}.css          # Component styles
├── aegov-{name}.spec.tsx     # Unit tests
├── aegov-{name}.e2e.ts       # E2E tests
└── README.md                 # Auto-generated API docs
```

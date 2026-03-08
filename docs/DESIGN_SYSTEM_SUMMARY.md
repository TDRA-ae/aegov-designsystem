# AEGOV Design System - Complete Summary

Quick reference and overview of the entire AEGOV Design System architecture, tokens, and components.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Color System at a Glance](#color-system-at-a-glance)
3. [Typography Quick Reference](#typography-quick-reference)
4. [Component Inventory](#component-inventory)
5. [Design Decisions](#design-decisions)
6. [Implementation Guide](#implementation-guide)

---

## System Overview

**Name:** AEGOV Design System
**Version:** 0.1.0
**Status:** Production Ready
**Last Updated:** March 2026

**Technology Stack:**
- **Component Framework:** StencilJS v4.38.3
- **Styling:** Tailwind CSS v4.1.17
- **Encapsulation:** Scoped CSS (with Shadow DOM for modal and context-menu-item)
- **Color Space:** OKLCH
- **Build Tool:** Stencil Compiler + PostCSS
- **Testing:** Jest (Unit) + Puppeteer (E2E)

**Component Count:** 19 public-facing (24 directories including sub-components)
**Test Coverage:** 100% (849+ spec tests, 593+ E2E tests)
**React Package:** Complete (@aegov/design-system-react - 40 tests, 100% coverage)

**Package Exports:**
```json
{
  ".": "Main component library",
  "./loader": "Component loader for CDN/script usage",
  "./tailwind.css": "Design tokens (Tailwind theme)",
  "./theme": "Alias for tailwind.css"
}
```

---

## Color System at a Glance

### Brand Colors (11 shades each: 50, 100, 200...950)

| Color | Purpose | Key Shades | Alias |
|-------|---------|------------|-------|
| **AEGold** | Primary brand color | 600 (default), 700 (hover) | `primary-*` |
| **AEBlack** | Text & neutral UI | 800 (body text), 300 (borders) | `secondary-*` |
| **AERed** | Errors & alerts | 600 (error bg), 700 (error text) | - |
| **AEGreen** | Success states | 600 (success bg), 700 (text) | - |

### Neutral Colors

| Color | Purpose | Range |
|-------|---------|-------|
| **Whitely** | Pure whites & off-whites | 50-500 (6 shades) |

### Support Colors (11 shades each)

| Color | Character | Use Cases |
|-------|-----------|-----------|
| **Camel** | Warm brown/tan | Focus rings (`camel-500`), warm accents, warnings |
| **Slate** | Cool gray | Alternative neutral palette |
| **Fuchsia** | Vibrant magenta | UI accents, highlights |
| **TechBlue** | Technology blue | Info states, digital/tech themed elements |
| **SeaBlue** | Ocean blue | Calm, trust-building elements |
| **Desert** | Earth orange | Warm accents, desert theme |

**Total Color Tokens:** 75+ individual color values

---

## Typography Quick Reference

### Font Stacks

```
LTR (Left-to-Right):
  Body    → Roboto
  Headings → Inter

RTL (Right-to-Left):
  Body    → Noto Kufi Arabic
  Headings → Alexandria
```

### Font Size Scale

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| `text-xs` | 0.75rem | 12px | Fine print, captions |
| `text-sm` | 0.875rem | 14px | Secondary text |
| `text-base` | 1rem | 16px | Body text (default) |
| `text-lg` | 1.125rem | 18px | Emphasized text |
| `text-xl` | 1.25rem | 20px | Large text |
| `text-2xl` | 1.5rem | 24px | Section headings |
| `text-3xl` | 1.875rem | 30px | Large headings |
| `text-h6` | 1.25rem | 20px | H6 heading |
| `text-h5` | 1.625rem | 26px | H5 heading |
| `text-h4` | 2rem | 32px | H4 heading |
| `text-h3` | 2.5rem | 40px | H3 heading |
| `text-h2` | 3rem | 48px | H2 heading |
| `text-h1` | 3.875rem | 62px | H1 heading |
| `text-display` | 4.75rem | 76px | Hero display |

### Font Weights (Applied Globally)

| Element | Weight | Class |
|---------|--------|-------|
| h1, h2, h3 | 800 | `font-extrabold` |
| h4, h5 | 700 | `font-bold` |
| h6 | 600 | `font-semibold` |

---

## Component Inventory

### Layout & Navigation Components

#### `<aegov-accordion>` / `<aegov-accordion-item>`

**Status:** Complete | **Encapsulation:** none (for nested flex)

```typescript
// aegov-accordion props
icon?: 'chevron' | 'plus'  // default: 'chevron'
// aegov-accordion-item props
heading?: string
open?: boolean  // default: false
disabled?: boolean  // default: false
```

```html
<aegov-accordion icon="chevron">
  <aegov-accordion-item heading="Section 1">Content here</aegov-accordion-item>
  <aegov-accordion-item heading="Section 2">More content</aegov-accordion-item>
</aegov-accordion>
```

---

#### `<aegov-breadcrumbs>` / `<aegov-breadcrumbs-item>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
// aegov-breadcrumbs props
separator?: 'slash' | 'chevron'  // default: 'slash'
maxLength?: number  // text truncation
microdata?: boolean  // schema.org BreadcrumbList
// aegov-breadcrumbs-item props
href?: string  // renders as link when provided
target?: LinkTarget  // default: '_self'
```

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/docs">Documentation</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

---

#### `<aegov-tabs>` / `<aegov-tab>` / `<aegov-tab-panel>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
// aegov-tabs props
variant?: 'simple' | 'segmented' | 'pill'  // default: 'simple'
size?: 'sm' | 'base' | 'lg'  // default: 'base'
defaultActiveTab?: string
orientation?: 'horizontal' | 'vertical'
scrollable?: boolean
// Events
aegovTabChange: string  // new tab id
```

```html
<aegov-tabs variant="simple" default-active-tab="tab1">
  <aegov-tab slot="tabs" tab-id="tab1">Tab 1</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Tab 2</aegov-tab>
  <aegov-tab-panel tab-id="tab1">Content 1</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Content 2</aegov-tab-panel>
</aegov-tabs>
```

---

#### `<aegov-pagination>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
totalPages?: number  // default: 1
currentPage?: number  // default: 1
variant?: 'default' | 'compact'  // default: 'default'
size?: 'sm' | 'base' | 'lg'  // default: 'base'
showFirstLast?: boolean  // default: false
siblingCount?: number  // default: 1
boundaryCount?: number  // default: 1
disabled?: boolean
prevLabel?: string  // default: 'Previous'
nextLabel?: string  // default: 'Next'
firstLabel?: string  // default: 'First'
lastLabel?: string  // default: 'Last'
// Events
aegovPaginationPageChange: number  // new page number
```

```html
<!-- Default with page numbers -->
<aegov-pagination total-pages="20" current-page="5" show-first-last></aegov-pagination>

<!-- Compact variant -->
<aegov-pagination variant="compact" total-pages="50" current-page="10"></aegov-pagination>
```

---

### Interactive Components

#### `<aegov-button>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
variant?: 'solid' | 'outline' | 'soft' | 'link'  // default: 'solid'
appearance?: 'primary' | 'secondary' | 'danger' | 'neutralMin' | 'neutralMax'
size?: 'xs' | 'sm' | 'base' | 'lg'  // default: 'base'
type?: 'button' | 'submit' | 'reset'
disabled?: boolean
loading?: boolean
full?: boolean
// Events
aegovButtonClick: MouseEvent
```

```html
<aegov-button variant="solid" appearance="primary" size="lg">Click Me</aegov-button>
<aegov-button variant="outline" loading>Processing...</aegov-button>
```

---

#### `<aegov-button-group>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
orientation?: 'horizontal' | 'vertical'  // default: 'horizontal'
```

```html
<aegov-button-group>
  <aegov-button>Left</aegov-button>
  <aegov-button>Center</aegov-button>
  <aegov-button>Right</aegov-button>
</aegov-button-group>
```

---

#### `<aegov-dropdown>`

**Status:** Complete | **Encapsulation:** scoped | **Pattern:** Portal

```typescript
trigger?: 'click' | 'hover'  // default: 'click'
position?: 'top' | 'right' | 'bottom' | 'left'  // default: 'bottom'
align?: 'start' | 'center' | 'end'  // default: 'start'
disabled?: boolean
// Events
aegovDropdownOpen: void
aegovDropdownClose: void
```

```html
<aegov-dropdown>
  <aegov-button slot="trigger">Open Menu</aegov-button>
  <div>Dropdown content here</div>
</aegov-dropdown>
```

---

#### `<aegov-context-menu>` / `<aegov-context-menu-item>`

**Status:** Complete | **Encapsulation:** scoped (parent), shadow (item) | **Pattern:** Portal

```typescript
// Methods
show(x: number, y: number): void
close(): void
// Events
aegovContextMenuOpen: { x, y, targetElement }
aegovContextMenuClose: void
aegovContextMenuItemClick: { label, value }
```

```html
<aegov-context-menu id="my-menu">
  <aegov-context-menu-item label="Edit" value="edit"></aegov-context-menu-item>
  <aegov-context-menu-item label="Delete" value="delete"></aegov-context-menu-item>
</aegov-context-menu>
```

---

#### `<aegov-modal>`

**Status:** Complete | **Encapsulation:** shadow

```typescript
position?: 'center' | 'top' | 'bottom'  // default: 'center'
backdropOpacity?: 'light' | 'base' | 'dark'  // default: 'base'
closeWithBackdrop?: boolean  // default: true
// Methods
show(): Promise<void>
close(): Promise<void>
toggle(): Promise<void>
// Events
aegovModalOpen: void
aegovModalBeforeClose: void
aegovModalBackdropClick: void
```

```html
<aegov-modal id="my-modal">
  <h2 slot="header">Modal Title</h2>
  <p>Modal content goes here.</p>
  <div slot="footer">
    <aegov-button onclick="document.getElementById('my-modal').close()">Close</aegov-button>
  </div>
</aegov-modal>
```

---

#### `<aegov-tooltip>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
position?: 'top' | 'right' | 'bottom' | 'left'  // default: 'top'
align?: 'start' | 'center' | 'end'  // default: 'center'
trigger?: 'hover' | 'click'  // default: 'hover'
interactive?: boolean  // default: false
showDelay?: number  // default: 200
hideDelay?: number  // default: 100
```

```html
<aegov-tooltip text="Helpful information" position="top">
  <aegov-button>Hover me</aegov-button>
</aegov-tooltip>
```

---

### Data Display Components

#### `<aegov-badge>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
color?: BadgeColor  // 17 color variants, default: 'default'
appearance?: 'soft' | 'solid'  // default: 'soft'
size?: 'sm' | 'base' | 'lg'  // default: 'base'
dismissible?: boolean  // default: false
// Events
aegovBadgeDismiss: void
```

**Color Variants:** default, primary, secondary, aegold, aered, aegreen, aeblack, techblue, seablue, camel, desert, fuchsia, slate, purple, pink, indigo, lime

```html
<aegov-badge color="primary" appearance="solid">New</aegov-badge>
<aegov-badge color="aegreen" dismissible>Active</aegov-badge>
```

---

#### `<aegov-avatar>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'  // default: 'base'
variant?: 'square' | 'rounded'  // default: 'square'
src?: string
alt?: string
status?: boolean  // default: false
statusType?: 'online' | 'offline'  // default: 'online'
```

```html
<aegov-avatar src="/photo.jpg" alt="User" status status-type="online"></aegov-avatar>
<aegov-avatar size="lg" variant="rounded">JD</aegov-avatar>
```

---

#### `<aegov-banner>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
variant?: 'default' | 'error' | 'warning' | 'success' | 'info'
appearance?: 'soft' | 'solid'
position?: 'top' | 'bottom'  // default: 'top'
display?: 'fixed' | 'sticky'  // default: 'sticky'
dismissible?: boolean
// Events
aegovBannerDismiss: void
aegovBannerHeightChange: { height: number }
```

```html
<aegov-banner variant="info" dismissible>
  <span slot="content">New version available!</span>
  <span slot="actions"><aegov-button size="sm">Update</aegov-button></span>
</aegov-banner>
```

---

#### `<aegov-callout>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
variant?: 'default' | 'error' | 'warning' | 'success' | 'info'
appearance?: 'soft' | 'solid'
dismissible?: boolean
// Slots: content, icon, actions, link
// Events
aegovCalloutDismiss: void
aegovCalloutLinkClick: MouseEvent
```

```html
<aegov-callout variant="warning" appearance="solid" dismissible>
  <span slot="content">Your subscription expires soon.</span>
</aegov-callout>
```

---

### Typography & Content Components

#### `<aegov-blockquote>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
variant?: 'primary' | 'colored' | 'coloured'  // default: 'primary'
author?: string
authorTitle?: string
cite?: string  // URL
```

```html
<aegov-blockquote variant="colored" author="Jane Doe" author-title="CEO">
  Innovation is the key to progress.
</aegov-blockquote>
```

---

#### `<aegov-title>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
size?: 'base' | 'lg' | 'xl' | '2xl'  // default: 'lg'
class?: string  // Additional Tailwind classes
```

```html
<aegov-title size="2xl" class="text-primary-600">Page Title</aegov-title>
```

---

#### `<aegov-text>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
size?: 'sm' | 'base' | 'lg'  // default: 'base'
class?: string  // Additional Tailwind classes
```

```html
<aegov-text size="lg" class="text-center">Body text content.</aegov-text>
```

---

#### `<aegov-link>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
href: string  // required
target?: '_blank' | '_self' | '_parent' | '_top'
rel?: string  // auto: 'noopener noreferrer' for _blank
class?: string
// Pass-through: data-*, aria-*, title attributes
// Events
aegovLinkClick: { href: string, event: MouseEvent }
```

```html
<aegov-link href="/about" target="_blank">About Us</aegov-link>
```

---

#### `<aegov-separator>`

**Status:** Complete | **Encapsulation:** scoped

```typescript
orientation?: 'horizontal' | 'vertical'  // default: 'horizontal'
variant?: 'default' | 'subtle'  // default: 'default'
text?: string  // optional label
decorative?: boolean  // default: true (role="presentation")
```

```html
<aegov-separator></aegov-separator>
<aegov-separator text="OR" variant="subtle"></aegov-separator>
<aegov-separator orientation="vertical"></aegov-separator>
```

---

## Design Decisions

### 1. Scoped CSS vs Shadow DOM

**Decision:** Use Scoped CSS for most components; Shadow DOM for modal and context-menu-item.
**Rationale:**
- Scoped CSS allows Tailwind class extraction by consumers
- Shadow DOM used where strict style isolation is essential (overlays)
- Standard `querySelector()` works for scoped components
- Shadow DOM components use `>>>` selector in E2E tests

### 2. OKLCH Color Space

**Decision:** Use OKLCH instead of RGB/HSL
**Rationale:** Perceptually uniform, more vibrant, future-proof CSS standard
**Browser Support:** Chrome 111+, Safari 15.4+, Firefox 113+, Edge 111+

### 3. Tailwind CSS v4

**Decision:** CSS-first configuration via `@theme` directive
**Rationale:** 10x faster builds, no JavaScript config, native CSS variable generation

### 4. Portal Pattern

**Decision:** Dropdown and context menu content appended to `document.body`
**Rationale:** Escapes overflow/clipping constraints, singleton ensures only one open at a time

### 5. Event Naming Convention

**Decision:** `aegov` prefix + component name for all custom events
**Examples:** `aegovPaginationPageChange`, `aegovTabChange`, `aegovBadgeDismiss`

---

## Implementation Guide

### For Consuming Projects

#### 1. Installation

```bash
npm install @aegov/design-system
```

#### 2. Import Design Tokens

```css
@import "@aegov/design-system/tailwind.css";
```

#### 3. Load Components

```html
<script type="module" src="node_modules/@aegov/design-system/loader/index.js"></script>
```

Or via import:

```javascript
import { defineCustomElements } from '@aegov/design-system/loader';
defineCustomElements();
```

### For Design System Developers

#### Development Workflow

```bash
npm start           # Dev server at localhost:3333
npm run build       # Production build
npm test            # Run spec tests
npx stencil test --e2e  # Run E2E tests
```

#### Creating New Components

```bash
npm run generate    # Generates aegov-[name] boilerplate
```

Each component requires:
- `component.tsx` - Component logic
- `component.css` - Scoped styles with Tailwind
- `component.spec.tsx` - Unit tests
- `component.e2e.ts` - E2E tests

---

## Testing Standards

### Coverage Requirements

- **Target:** 100% (statements, branches, functions, lines)
- **Current:** 100% across all 24 component directories

### Test File Count

- **Spec tests:** 24 files, 849+ tests
- **E2E tests:** 24 files, 593+ tests
- **Accessibility tests:** Cross-component WCAG 2.1 AA suite
- **React integration tests:** 40 tests

### Test Structure

```typescript
describe('aegov-component', () => {
  describe('rendering', () => { /* ... */ });
  describe('variants', () => { /* ... */ });
  describe('states', () => { /* ... */ });
  describe('events', () => { /* ... */ });
  describe('accessibility', () => { /* ... */ });
});
```

---

## Build Output

```
dist/
├── aegov/
│   ├── aegov.esm.js        # ES Module bundle
│   ├── aegov.js             # UMD bundle
│   └── aegov.css            # Global stylesheet
├── collection/              # Component collection
├── loader/                  # Component loader
└── types/                   # TypeScript definitions
```

---

## Accessibility

- **WCAG 2.1 Level AA** compliance
- Full ARIA attribute support on all interactive elements
- Keyboard navigation throughout (Tab, Arrow keys, Home, End, Escape)
- Screen reader tested
- Focus management and visible focus indicators
- RTL/LTR bi-directional support with automatic font switching

---

## Browser Support

| Feature | Support |
|---------|---------|
| Web Components | Native (Chrome, Safari, Firefox, Edge) |
| OKLCH Colors | Chrome 111+, Safari 15.4+, Firefox 113+ |
| CSS Variables | All modern browsers |
| Scoped CSS | Stencil runtime |
| Tailwind Classes | Build-time |

---

**Last Updated:** March 2026
**Maintained By:** AEGOV Design System Team

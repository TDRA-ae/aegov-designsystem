# AEGOV Design System - Project Overview

## Production-Ready Design System

This document provides an overview of the AEGOV Design System - a complete, production-ready component library built with StencilJS and Tailwind CSS v4.

**Last Updated:** March 2026

---

## Project Status

| Metric | Status |
|--------|--------|
| **Total Components** | 19 public-facing (24 directories including sub-components) |
| **Test Coverage** | 100% (849+ spec tests, 593+ E2E tests) |
| **React Package** | Complete with 40 tests, 100% coverage |
| **Documentation** | Comprehensive |
| **Production Ready** | Yes |

---

## Project Structure

```
aegov-dls-3/                          # Main Stencil library
├── src/
│   ├── components/
│   │   ├── aegov-accordion/          # Accordion container
│   │   ├── aegov-accordion-item/     # Accordion panel (child)
│   │   ├── aegov-avatar/             # Avatar component
│   │   ├── aegov-badge/              # Badge/tag component
│   │   ├── aegov-banner/             # Top/bottom banner
│   │   ├── aegov-blockquote/         # Blockquote component
│   │   ├── aegov-breadcrumbs/        # Breadcrumb nav (parent)
│   │   ├── aegov-breadcrumbs-item/   # Breadcrumb link (child)
│   │   ├── aegov-button/             # Button component
│   │   ├── aegov-button-group/       # Button group container
│   │   ├── aegov-callout/            # Alert/callout component
│   │   ├── aegov-dropdown/           # Dropdown menu (portal)
│   │   ├── aegov-link/               # Link component
│   │   ├── aegov-modal/              # Modal dialog (shadow DOM)
│   │   ├── aegov-pagination/         # Pagination nav
│   │   ├── aegov-separator/          # Horizontal/vertical divider
│   │   ├── aegov-tab/                # Tab trigger (child)
│   │   ├── aegov-tab-panel/          # Tab content panel (child)
│   │   ├── aegov-tabs/               # Tabs container (parent)
│   │   ├── aegov-text/               # Text paragraph component
│   │   ├── aegov-title/              # Title/heading component
│   │   └── aegov-tooltip/            # Tooltip component
│   ├── styles/
│   │   └── tailwind.css              # Design tokens + theme
│   ├── global/
│   │   └── global.css                # Global styles
│   ├── utils/
│   │   ├── types.ts                  # Shared TypeScript types (30+)
│   │   ├── index.ts                  # Re-exports
│   │   ├── test-helpers.ts           # Test utilities
│   │   └── accessibility.spec.ts     # Cross-component WCAG tests
│   ├── pages/                        # 18 example/demo pages
│   └── index.html                    # Landing page
├── docs/                             # Technical documentation
├── dist/                             # Production build output
├── www/                              # Development build output
└── stencil.config.ts                 # Stencil configuration

aegov-dls-3-react/                    # React wrapper package
├── src/
│   ├── components/
│   │   └── stencil-generated/        # Auto-generated React wrappers
│   ├── __tests__/
│   │   └── components.test.tsx       # 40 integration tests
│   ├── index.ts                      # Main entry point
│   └── setupTests.ts                 # Test configuration
├── __mocks__/                        # Test mocks
├── dist/                             # Build output
└── jest.config.js                    # Jest configuration
```

---

## Components Built

### Layout & Navigation

#### aegov-accordion / aegov-accordion-item
Expandable content panels with smooth animations.
- **Icon styles**: Chevron, Plus
- **Features**: Single/multi expand, disabled items, nested accordions
- **Encapsulation**: `scoped: false` (no encapsulation for nested flex)
- **Animation**: ResizeObserver-based content height transitions

#### aegov-breadcrumbs / aegov-breadcrumbs-item
Breadcrumb navigation trail with parent-child architecture.
- **Separators**: Slash (default), Chevron
- **Features**: Text truncation, microdata (schema.org), RTL support
- **Events**: `aegovBreadcrumbItemClick`

#### aegov-tabs / aegov-tab / aegov-tab-panel
Tabbed content interface with three component architecture.
- **Variants**: Simple (underline), Segmented (button-group), Pill (rounded)
- **Sizes**: SM, Base, LG
- **Features**: Horizontal/vertical orientation, scrollable overflow, keyboard navigation, RTL-aware arrows
- **ARIA**: Full tabs pattern (tablist, tab, tabpanel, roving tabindex)
- **Events**: `aegovTabChange`

#### aegov-pagination
Page navigation with range algorithm and compact variant.
- **Variants**: Default (page numbers + ellipsis), Compact (prev/next + indicator)
- **Sizes**: SM, Base, LG
- **Features**: First/Last buttons, configurable boundary/sibling count, custom labels
- **Accessibility**: `aria-current="page"`, `aria-live="polite"` on compact indicator
- **Events**: `aegovPaginationPageChange`

### Interactive

#### aegov-button
Full-featured button with multiple variants.
- **Variants**: Solid, Outline, Soft, Link
- **Appearances**: Primary, Secondary, Danger, NeutralMin, NeutralMax
- **Sizes**: XS, SM, Base, LG
- **States**: Loading (spinner), Disabled, Full-width
- **Events**: `aegovButtonClick`

#### aegov-button-group
Groups buttons horizontally or vertically with connected borders.
- **Orientation**: Horizontal, Vertical
- **Features**: Auto-applies first/last/middle/single classes to child buttons

#### aegov-dropdown
Floating dropdown menu with portal pattern.
- **Triggers**: Click, Hover
- **Positions**: Top, Right, Bottom, Left
- **Alignment**: Start, Center, End
- **Features**: Portal to `document.body`, viewport-aware positioning, auto-close on scroll outside viewport, singleton pattern
- **Events**: `aegovDropdownOpen`, `aegovDropdownClose`

#### aegov-modal
Dialog overlay with shadow DOM.
- **Positions**: Center, Top, Bottom
- **Backdrop**: Light, Base, Dark opacity
- **Features**: ESC close, backdrop click close (configurable), focus trap, scroll lock
- **Methods**: `show()`, `close()`, `toggle()`
- **Events**: `aegovModalOpen`, `aegovModalBeforeClose`, `aegovModalBackdropClick`

#### aegov-tooltip
Informational tooltip on hover or click.
- **Positions**: Top, Right, Bottom, Left
- **Alignment**: Start, Center, End
- **Triggers**: Hover (default), Click
- **Features**: Interactive mode (`role="dialog"`), rich content via slot, configurable show/hide delay

### Data Display

#### aegov-badge
Versatile badge/tag component.
- **Colors**: 17 UAE Government brand color variants
- **Appearances**: Soft, Solid
- **Sizes**: SM, Base, LG
- **Features**: Dismissible with event
- **Events**: `aegovBadgeDismiss`

#### aegov-avatar
User avatar with status indicators.
- **Sizes**: XS (24px) to 3XL (80px)
- **Variants**: Square, Rounded
- **Features**: Image src with fallback slot, online/offline status indicator

#### aegov-banner
Sticky/fixed notification banner.
- **Variants**: Default, Error, Warning, Success, Info
- **Appearances**: Soft, Solid
- **Positions**: Top, Bottom
- **Display**: Fixed, Sticky (push or overlay mode)
- **Features**: Dismissible with animation, dynamic height reporting
- **Events**: `aegovBannerHeightChange`, `aegovBannerDismiss`

#### aegov-callout
Alert/notification component.
- **Variants**: Default, Error, Warning, Success, Info
- **Appearances**: Soft, Solid
- **Slots**: `content`, `icon`, `actions`, `link`
- **Features**: Context-appropriate icons, dismissible, action links
- **Events**: `aegovCalloutDismiss`, `aegovCalloutLinkClick`

### Typography & Content

#### aegov-blockquote
Styled blockquote with attribution.
- **Variants**: Primary (with quote icon), Colored (with background)
- **Features**: Author name/title, cite URL, alternative spelling support (colored/coloured)

#### aegov-title
Title/heading text component.
- **Sizes**: Base, LG, XL, 2XL
- **Features**: Bold font, custom Tailwind class merging

#### aegov-text
Body text paragraph component.
- **Sizes**: SM, Base, LG
- **Features**: Default bottom margin (mb-8), custom class merging

#### aegov-link
Accessible link with custom navigation.
- **Features**: Pass-through data-*/aria-* attributes, auto `rel="noopener noreferrer"` for external links, custom click event with preventDefault support
- **Events**: `aegovLinkClick`

#### aegov-separator
Horizontal or vertical divider.
- **Orientations**: Horizontal, Vertical
- **Variants**: Default, Subtle
- **Features**: Optional text label, decorative/semantic role toggle

---

## Design Token System

### UAE Government Brand Colors

```css
/* Primary Colors (AEGold) */
--color-aegold-50 to --color-aegold-950

/* Secondary Colors (AEBlack) */
--color-aeblack-50 to --color-aeblack-950

/* Semantic Colors */
--color-aered-*    /* Errors, critical */
--color-aegreen-*  /* Success, active */
--color-camel-*    /* Warnings, pending */
--color-techblue-* /* Info, processing */
--color-seablue-*  /* Secondary support */

/* Extended Palette */
--color-desert-*, --color-fuchsia-*, --color-slate-*
--color-purple-*, --color-pink-*, --color-indigo-*, --color-lime-*
```

### Typography

```css
/* Font Families */
--font-roboto       /* Body text (LTR) */
--font-inter        /* Headings (LTR) */
--font-notokufi     /* Arabic body text (RTL) */
--font-alexandria   /* Arabic headings (RTL) */

/* Sizes: text-xs through text-display */
/* Weights: normal, medium, semibold, bold, extrabold */
```

---

## Testing

### Main Library (aegov-dls-3)

```bash
npm test              # Run all spec tests (849+)
npx stencil test --e2e  # Run E2E tests (593+)
```

**Coverage:** 100% across all 24 component directories

### React Package (aegov-dls-3-react)

```bash
cd ../aegov-dls-3-react
npm test              # Run 40 integration tests
```

---

## Framework Support

### Vanilla JavaScript/HTML

```html
<script type="module" src="/build/aegov.esm.js"></script>
<script nomodule src="/build/aegov.js"></script>

<aegov-button variant="solid" appearance="primary">Click Me</aegov-button>
```

### React (Production Ready)

```tsx
import { AegovButton, AegovBadge } from '@aegov/design-system-react';

function App() {
  return (
    <AegovButton variant="solid" onClick={() => console.log('Clicked')}>
      Click Me
    </AegovButton>
  );
}
```

### Angular / Vue

Output targets configured in `stencil.config.ts`, ready for wrapper generation.

---

## Build & Deploy

### Development

```bash
npm start  # Start dev server at localhost:3333
```

### Production Build

```bash
npm run build  # Builds main library
```

### Output

- `dist/aegov/` - Main bundle (`aegov.esm.js`, `aegov.js`)
- `dist/components/` - Individual component bundles
- `dist/types/` - TypeScript definitions
- `dist/collection/` - Component collection

---

## Key Technical Decisions

### 1. Encapsulation Strategy

Most components use **Scoped CSS** (`scoped: true`) for Tailwind class extraction and standard DOM access. `aegov-modal` uses **Shadow DOM** for strict style isolation.

### 2. Portal Pattern

`aegov-dropdown` appends floating content to `document.body` to escape overflow/clipping constraints. Only one instance open at a time (singleton).

### 3. Parent-Child Communication

Parent components (`tabs`, `accordion`, `breadcrumbs`, `button-group`) set props on children via direct DOM property assignment in `componentDidLoad()`/`componentDidUpdate()`.

### 4. Event Naming

All custom events include the component name for clarity (e.g., `aegovPaginationPageChange`, `aegovTabChange`, `aegovBadgeDismiss`).

### 5. Namespace

Build namespace is `aegov` — all outputs are `aegov.js`, `aegov.esm.js`, `aegov.css`.

---

## Component Inventory

| Component | Type | Encapsulation | Key Events |
|-----------|------|---------------|------------|
| aegov-accordion | Parent | none | - |
| aegov-accordion-item | Child | none | `aegovAccordionItemToggle` |
| aegov-avatar | Standalone | scoped | - |
| aegov-badge | Standalone | scoped | `aegovBadgeDismiss` |
| aegov-banner | Standalone | scoped | `aegovBannerDismiss`, `aegovBannerHeightChange` |
| aegov-blockquote | Standalone | scoped | - |
| aegov-breadcrumbs | Parent | scoped | - |
| aegov-breadcrumbs-item | Child | scoped | `aegovBreadcrumbItemClick` |
| aegov-button | Standalone | scoped | `aegovButtonClick` |
| aegov-button-group | Parent | scoped | - |
| aegov-callout | Standalone | scoped | `aegovCalloutDismiss`, `aegovCalloutLinkClick` |
| aegov-dropdown | Standalone | scoped | `aegovDropdownOpen`, `aegovDropdownClose` |
| aegov-link | Standalone | scoped | `aegovLinkClick` |
| aegov-modal | Standalone | shadow | `aegovModalOpen`, `aegovModalBeforeClose` |
| aegov-pagination | Standalone | scoped | `aegovPaginationPageChange` |
| aegov-separator | Standalone | scoped | - |
| aegov-tab | Child | scoped | `aegovTabSelect` |
| aegov-tab-panel | Child | scoped | - |
| aegov-tabs | Parent | scoped | `aegovTabChange` |
| aegov-text | Standalone | scoped | - |
| aegov-title | Standalone | scoped | - |
| aegov-tooltip | Standalone | scoped | - |

---

## Example Pages

18 interactive HTML example pages in `src/pages/`:

| Page | Component(s) |
|------|-------------|
| accordion-examples.html | Accordion |
| avatar-examples.html | Avatar |
| badge-examples.html | Badge |
| banner-examples.html | Banner |
| blockquote-examples.html | Blockquote |
| breadcrumbs-examples.html | Breadcrumbs |
| button-examples.html | Button |
| button-group-examples.html | Button Group |
| callout-examples.html | Callout |
| dropdown-examples.html | Dropdown |
| link-examples.html | Link |
| modal-examples.html | Modal |
| multi-components.html | Integrated showcase |
| pagination-examples.html | Pagination |
| separator-examples.html | Separator |
| tabs-examples.html | Tabs |
| tooltip-examples.html | Tooltip |

---

## Production Ready Checklist

- 19 public components built and tested
- 849+ spec tests + 593+ E2E tests passing (100% coverage)
- React package complete (40 tests, 100% coverage)
- Comprehensive documentation
- Design token system (75+ colors, OKLCH)
- TypeScript definitions
- 18 interactive example pages
- Full accessibility support (WCAG 2.1 AA)
- RTL (Arabic) support
- Build verification scripts

---

## Next Steps

### Potential Enhancements

1. **Additional Components**: Form inputs (text, textarea, select, checkbox, radio), Card, Table, Progress bar
2. **Framework Wrappers**: Angular and Vue wrapper packages
3. **Tooling**: Storybook integration, visual regression testing, automated publishing
4. **Documentation**: Interactive documentation site, Figma integration

---

**The AEGOV Design System is production-ready and actively maintained.**

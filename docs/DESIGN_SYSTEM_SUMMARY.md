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
**Status:** ✅ Production Ready
**Last Updated:** November 14, 2025

**Technology Stack:**
- **Component Framework:** StencilJS v4.38.3
- **Styling:** Tailwind CSS v4.1.17
- **Encapsulation:** Scoped CSS (NOT Shadow DOM)
- **Color Space:** OKLCH
- **Build Tool:** Stencil Compiler + PostCSS
- **Testing:** Jest (Unit) + Puppeteer (E2E)

**Component Count:** 7 (Button, Badge, Avatar, Blockquote, Callout, Title, Text)
**Test Coverage:** 100% (280+ tests passing)
**React Package:** ✅ Complete (@aegov/design-system-react - 40 tests, 100% coverage)

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
| **Camel** | Warm brown/tan | Focus rings (`camel-500`), warm accents |
| **Slate** | Cool gray | Alternative neutral palette |
| **Fuchsia** | Vibrant magenta | UI accents, highlights |
| **TechBlue** | Technology blue | Digital/tech themed elements |
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

| Token | Size | Pixels | Tailwind Class | Usage |
|-------|------|--------|----------------|-------|
| `text-xs` | 0.75rem | 12px | `text-xs` | Fine print, captions |
| `text-sm` | 0.875rem | 14px | `text-sm` | Secondary text |
| `text-base` | 1rem | 16px | `text-base` | Body text (default) |
| `text-lg` | 1.125rem | 18px | `text-lg` | Emphasized text |
| `text-xl` | 1.25rem | 20px | `text-xl` | Large text |
| `text-2xl` | 1.5rem | 24px | `text-2xl` | Section headings |
| `text-3xl` | 1.875rem | 30px | `text-3xl` | Large headings |
| `text-h6` | 1.25rem | 20px | `text-h6` | H6 heading |
| `text-h5` | 1.625rem | 26px | `text-h5` | H5 heading |
| `text-h4` | 2rem | 32px | `text-h4` | H4 heading |
| `text-h3` | 2.5rem | 40px | `text-h3` | H3 heading |
| `text-h2` | 3rem | 48px | `text-h2` | H2 heading |
| `text-h1` | 3.875rem | 62px | `text-h1` | H1 heading |
| `text-display` | 4.75rem | 76px | `text-display` | Hero display |

### Font Weights (Applied Globally)

| Element | Weight | Class |
|---------|--------|-------|
| h1, h2, h3 | 800 | `font-extrabold` |
| h4, h5 | 700 | `font-bold` |
| h6 | 600 | `font-semibold` |

### Paragraph Margins

| Size | Bottom Margin |
|------|---------------|
| Default (`text-base`) | 32px (`mb-8`) |
| Small (`text-sm`) | 28px (`mb-7`) |
| Extra Small (`text-xs`) | 24px (`mb-6`) |

---

## Component Inventory

### Current Components

#### 1. `<aegov-button>`

**Status:** ✅ Complete (v0.1.0)
**Tests:** 63 passing (34 unit + 29 E2E)
**Coverage:** 100%

**API:**
```typescript
// Properties
variant?: 'solid' | 'outline'  // default: 'solid'
size?: 'xs' | 'sm' | 'base' | 'lg'  // default: 'base'
type?: 'button' | 'submit' | 'reset'  // default: 'button'
disabled?: boolean  // default: false
fullWidth?: boolean  // default: false
loading?: boolean  // default: false

// Events
aegovClick: MouseEvent
aegovFocus: FocusEvent
aegovBlur: FocusEvent

// Parts
part="button"  // For external styling
```

**Usage:**
```html
<!-- Solid primary button (default) -->
<aegov-button>Click Me</aegov-button>

<!-- Outline variant, large size -->
<aegov-button variant="outline" size="lg">
  Large Outline
</aegov-button>

<!-- Loading state -->
<aegov-button loading>Processing...</aegov-button>

<!-- Full width -->
<aegov-button full-width>Full Width Button</aegov-button>
```

**Styling:**
- Scoped CSS encapsulation
- TailwindCSS utility classes
- Custom `button-transition` utility
- Focus ring using `focus:ring-*` utilities

---

#### 2. `<aegov-badge>`

**Status:** ✅ Complete (v0.1.0)
**Tests:** Complete (unit + E2E)
**Coverage:** 100%
**Date Added:** November 2025

**API:**
```typescript
// Properties
color?: BadgeColor  // 17 color variants, default: 'default'
appearance?: 'soft' | 'solid'  // default: 'soft'
size?: 'sm' | 'base' | 'lg'  // default: 'base'
dismissible?: boolean  // default: false

// Events
aegovBadgeDismiss: void  // When dismiss button clicked

// Slots
default  // Badge content
```

**Color Variants:**
- `default`, `primary`, `secondary`
- `aegold`, `aered`, `aegreen`, `aeblack`
- `techblue`, `seablue`, `camel`, `desert`
- `fuchsia`, `slate`, `purple`, `pink`, `indigo`, `lime`

**Usage:**
```html
<!-- Basic badge -->
<aegov-badge>Default</aegov-badge>

<!-- Colored badges -->
<aegov-badge color="primary">Primary</aegov-badge>
<aegov-badge color="aegreen" appearance="solid">Success</aegov-badge>

<!-- Dismissible tag -->
<aegov-badge dismissible color="techblue">JavaScript</aegov-badge>

<!-- Sizes -->
<aegov-badge size="sm">Small</aegov-badge>
<aegov-badge size="lg">Large</aegov-badge>
```

---

#### 3. `<aegov-avatar>`

**Status:** ✅ Complete (v0.1.0)
**Tests:** Complete (unit + E2E)
**Coverage:** 100%
**Date Added:** November 2025

**API:**
```typescript
// Properties
size?: AvatarSize  // 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl', default: 'base'
variant?: 'square' | 'rounded'  // default: 'square'
src?: string  // Image URL
alt?: string  // Accessibility text
status?: boolean  // Show status indicator, default: false
statusType?: 'online' | 'offline'  // default: 'online'

// Slots
default  // Fallback content when no src

// Parts
part="avatar"  // Container
part="image"   // Image element
part="status"  // Status indicator
```

**Size Values:**
- `xs`: 24px, `sm`: 32px, `base`: 40px, `lg`: 48px
- `xl`: 64px, `2xl`: 72px, `3xl`: 80px

**Usage:**
```html
<!-- With image -->
<aegov-avatar src="/path/to/image.jpg" alt="User Name"></aegov-avatar>

<!-- With fallback text -->
<aegov-avatar>JD</aegov-avatar>

<!-- With status -->
<aegov-avatar src="/image.jpg" status status-type="online"></aegov-avatar>

<!-- Sizes -->
<aegov-avatar size="lg" variant="rounded"></aegov-avatar>
```

---

#### 4. `<aegov-blockquote>`

**Status:** ✅ Complete (v0.1.0)
**Tests:** Complete (unit + E2E)
**Coverage:** 100%
**Date Added:** November 2025

**API:**
```typescript
// Properties
variant?: 'primary' | 'colored' | 'coloured'  // default: 'primary'
author?: string  // Quote author
authorTitle?: string  // Author's title/position
cite?: string  // URL of quote source

// Slots
default  // Quote content
```

**Usage:**
```html
<!-- Basic quote -->
<aegov-blockquote>
  This is a quote from someone important.
</aegov-blockquote>

<!-- With author -->
<aegov-blockquote author="John Doe" author-title="CEO">
  Innovation distinguishes between a leader and a follower.
</aegov-blockquote>

<!-- Colored variant with citation -->
<aegov-blockquote
  variant="colored"
  author="Jane Smith"
  cite="https://example.com/quote">
  Success is not final, failure is not fatal.
</aegov-blockquote>
```

---

#### 5. `<aegov-callout>`

**Status:** ✅ Complete (v0.1.0)
**Tests:** 127 passing (98 unit + 29 E2E)
**Coverage:** 100%
**Date Added:** November 10, 2025

**API:**
```typescript
// Properties
variant?: 'default' | 'error' | 'warning' | 'success' | 'info'  // default: 'default'
appearance?: 'soft' | 'solid'  // default: 'soft'
withIcon?: boolean  // default: false
dismissible?: boolean  // default: false
linkText?: string  // optional
linkUrl?: string  // optional

// Events
aegovCalloutDismiss: void
aegovCalloutLinkClick: MouseEvent

// Slots
default  // Main content
```

**Usage:**
```html
<!-- Basic callout -->
<aegov-callout variant="info">
  New features are now available!
</aegov-callout>

<!-- With all features -->
<aegov-callout
  variant="warning"
  appearance="solid"
  with-icon
  link-text="View details"
  link-url="/details"
  dismissible>
  Your subscription expires in 7 days.
</aegov-callout>

<!-- With rich content -->
<aegov-callout variant="error" with-icon>
  <strong>Error:</strong> Please fix the following:
  <ul>
    <li>Email is required</li>
    <li>Password must be 8+ characters</li>
  </ul>
</aegov-callout>
```

**Styling:**
- Scoped CSS encapsulation
- 5 semantic variants with color coding
- 2 appearance modes (soft/solid)
- Contextual icons for each variant
- Action links with arrow indicators
- Dismissible with close button
- Semantic HTML with `role="alert"`

---

#### 6. `<aegov-title>`

**Status:** ✅ Complete (v0.1.0)
**Tests:** Complete (unit + E2E)
**Coverage:** 100%
**Date Added:** November 2025

**API:**
```typescript
// Properties
size?: 'base' | 'lg' | 'xl' | '2xl'  // default: 'lg'
class?: string  // Additional Tailwind classes

// Slots
default  // Title content
```

**Size Values:**
- `base`: 16px (text-base)
- `lg`: 18px (text-lg)
- `xl`: 20px (text-xl)
- `2xl`: 24px (text-2xl)

**Default Styling:**
- `font-bold` - Bold font weight
- `mt-0` - No top margin

**Usage:**
```html
<!-- Default title (lg, bold) -->
<aegov-title>Page Title</aegov-title>

<!-- Different sizes -->
<aegov-title size="2xl">Large Heading</aegov-title>
<aegov-title size="base">Small Title</aegov-title>

<!-- With custom Tailwind classes -->
<aegov-title class="text-primary-600 uppercase">
  Custom Styled Title
</aegov-title>

<!-- Combined styling -->
<aegov-title size="xl" class="mb-4 text-center">
  Centered Title with Bottom Margin
</aegov-title>
```

**Notes:**
- Renders as `<p>` element for flexibility
- Custom classes merge with defaults
- Use semantic heading tags (`<h1>`, `<h2>`, etc.) in your HTML if needed for SEO

---

#### 7. `<aegov-text>`

**Status:** ✅ Complete (v0.1.0)
**Tests:** Complete (unit + E2E)
**Coverage:** 100%
**Date Added:** November 2025

**API:**
```typescript
// Properties
size?: 'sm' | 'base' | 'lg'  // default: 'base'
class?: string  // Additional Tailwind classes

// Slots
default  // Text content
```

**Size Values:**
- `sm`: 14px (text-sm)
- `base`: 16px (text-base)
- `lg`: 18px (text-lg)

**Default Styling:**
- `mb-8` - 32px bottom margin (2rem)
- `mt-0` - No top margin

**Usage:**
```html
<!-- Default paragraph text -->
<aegov-text>
  This is a standard paragraph with default size and bottom margin.
</aegov-text>

<!-- Different sizes -->
<aegov-text size="sm">Small text for disclaimers or captions.</aegov-text>
<aegov-text size="lg">Larger text for emphasis.</aegov-text>

<!-- With custom Tailwind classes -->
<aegov-text class="text-secondary-700 italic">
  Italicized secondary text
</aegov-text>

<!-- Override default margin -->
<aegov-text class="mb-4">
  Paragraph with smaller bottom margin
</aegov-text>

<!-- Multiple custom classes -->
<aegov-text size="lg" class="text-center text-primary-600 mb-12">
  Large, centered, colored text with custom margin
</aegov-text>
```

**Notes:**
- Renders as `<p>` element
- Custom classes merge with defaults (can override mb-8 if needed)
- Ideal for body copy and paragraphs
- Default bottom margin provides consistent vertical rhythm

---

## Design Decisions

### 1. Scoped CSS vs Shadow DOM

**Decision:** Use Scoped CSS (`scoped: true`)
**Rationale:**
- Allows consuming projects to process Tailwind classes in their build
- Enables developers to generate final CSS with their custom Tailwind config
- Provides direct DOM access for testing and manipulation
- Maintains style scoping without Shadow DOM limitations

**Impact:**
- ✅ Tailwind classes visible to consuming project's build
- ✅ No `>>>` shadow pierce needed in selectors
- ✅ Standard `querySelector()` works
- ✅ Simpler form integration

### 2. OKLCH Color Space

**Decision:** Use OKLCH instead of RGB/HSL
**Rationale:**
- Perceptually uniform color interpolation
- More vibrant colors possible
- Better color manipulation
- Future-proof CSS standard

**Browser Support:**
- Chrome 111+, Safari 15.4+, Firefox 113+, Edge 111+

### 3. Tailwind CSS v4

**Decision:** Use Tailwind v4 with CSS-first configuration
**Rationale:**
- 10x faster build times
- CSS-based `@theme` configuration
- Built-in autoprefixer
- Native CSS variable generation
- No JavaScript config needed

**Configuration:**
```css
@import "tailwindcss";
@theme {
  /* Design tokens here */
}
```

### 4. Bi-directional (RTL/LTR) Support

**Decision:** Full RTL support with automatic font switching
**Rationale:**
- AEGOV serves Arabic-speaking regions
- Font quality matters for readability
- Automatic switching reduces developer burden

**Implementation:**
```css
body { font-family: var(--font-roboto); }
body[dir="rtl"] { font-family: var(--font-notokufi); }
```

### 5. Event Naming Convention

**Decision:** `aegov` prefix for all custom events
**Rationale:**
- Avoids naming conflicts
- Clear component ownership
- Framework compatibility

**Examples:**
- `aegovClick` not `click`
- `aegovFocus` not `focus`
- `aegovBlur` not `blur`

---

## Implementation Guide

### For Consuming Projects

#### 1. Installation

```bash
npm install @aegov/design-system
```

#### 2. Import Design Tokens

```css
/* In your main CSS file */
@import "@aegov/design-system/tailwind.css";

/* Optionally override tokens */
@theme {
  --color-primary-600: oklch(0.5 0.2 180);  /* Custom primary */
}
```

#### 3. Configure Tailwind

```javascript
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@aegov/design-system/**/*.js',  // Scan components
  ],
  // Theme extends automatically from imported CSS
}
```

#### 4. Load Components

**Option A: Loader Script (Recommended)**
```html
<script type="module" src="node_modules/@aegov/design-system/loader/index.js"></script>
```

**Option B: Import Specific Components**
```javascript
import { defineCustomElements } from '@aegov/design-system/loader';
defineCustomElements();
```

#### 5. Use Components

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="./dist/output.css">
</head>
<body>
  <aegov-button variant="solid" size="base">
    Click Me
  </aegov-button>

  <script type="module" src="./node_modules/@aegov/design-system/loader/index.js"></script>
</body>
</html>
```

#### 6. React Integration (Future)

```jsx
import { AegovButton } from '@aegov/design-system-react';

function App() {
  return (
    <AegovButton
      variant="solid"
      size="lg"
      onAegovClick={(e) => console.log('Clicked', e)}
    >
      Click Me
    </AegovButton>
  );
}
```

---

### For Design System Developers

#### Project Structure

```
aegov-dls-3/
├── src/
│   ├── components/
│   │   └── aegov-button/
│   │       ├── aegov-button.tsx       # Component logic
│   │       ├── aegov-button.css       # Scoped styles
│   │       ├── aegov-button.spec.tsx  # Unit tests
│   │       └── aegov-button.e2e.ts    # E2E tests
│   ├── styles/
│   │   └── tailwind.css               # Design tokens
│   ├── global/
│   │   └── global.css                 # Global styles
│   └── utils/
│       └── types.ts                   # Shared types
├── docs/                              # Documentation
├── dist/                              # Build output
├── scripts/                           # Build scripts
├── stencil.config.ts                  # Stencil config
└── package.json
```

#### Development Workflow

```bash
# Start dev server
npm start

# Build components
npm run build

# Run tests
npm test          # Unit tests
npm run test.e2e  # E2E tests

# Verify build
npm run verify-build
```

#### Creating New Components

```bash
# Generate component boilerplate
npm run generate

# Component name format: aegov-[component-name]
# Example: aegov-input, aegov-card, aegov-modal
```

#### Component Template

```typescript
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'aegov-my-component',
  styleUrl: 'aegov-my-component.css',
  scoped: true,  // Always use scoped, not shadow
})
export class AegovMyComponent {
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  @Event() aegovAction: EventEmitter<CustomEvent>;

  render() {
    return (
      <div class={`component-${this.variant}`}>
        <slot />
      </div>
    );
  }
}
```

---

## Custom Utilities Reference

### button-transition

Smooth transitions for interactive elements.

```html
<button class="button-transition bg-primary-600 hover:bg-primary-700">
  Hover me
</button>
```

**Animates:**
- color, background-color, border-color
- opacity, box-shadow, transform

**Duration:** 200ms
**Timing:** cubic-bezier(0.4, 0, 0.2, 1)

### focus-ring

Consistent focus outline for accessibility.

```html
<input class="focus-ring" />
```

**Result:**
- 2px outline in `camel-500`
- 2px offset from element

---

## Transition Tokens

| Token | Duration | Use Case |
|-------|----------|----------|
| `--transition-duration-fast` | 150ms | Quick hovers, tooltips |
| `--transition-duration-base` | 200ms | Default interactions |
| `--transition-duration-slow` | 300ms | Complex animations, modals |
| `--transition-timing-default` | ease-in-out | All transitions |

**Usage:**
```css
.my-element {
  transition-duration: var(--transition-duration-base);
  transition-timing-function: var(--transition-timing-default);
}
```

---

## Testing Standards

### Coverage Requirements

- **Statements:** 80%+ (Current: 100%)
- **Branches:** 80%+ (Current: 100%)
- **Functions:** 80%+ (Current: 100%)
- **Lines:** 80%+ (Current: 100%)

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

### E2E Testing

- Browser: Puppeteer (Chromium)
- Focus on user interactions
- Test keyboard navigation
- Verify ARIA attributes

---

## Build Output

### Distribution Files

```
dist/
├── aegov/
│   ├── aegov.esm.js                   # ES Module bundle
│   ├── aegov.js                       # UMD bundle
│   └── aegov-button.entry.js          # Component entry
├── collection/
│   └── components/
│       └── aegov-button/
│           ├── aegov-button.js        # Compiled component
│           └── aegov-button.css       # Compiled styles
├── loader/
│   ├── index.js                       # Component loader
│   └── index.cjs.js                   # CommonJS loader
└── types/
    └── components.d.ts                # TypeScript definitions
```

### File Sizes (Approximate)

- **aegov-button:** ~5KB (minified + gzipped)
- **Loader:** ~2KB
- **Full bundle:** ~8KB

---

## Performance Characteristics

### Initial Load

- **Lazy loading:** Components loaded on-demand
- **Code splitting:** One file per component
- **Tree shaking:** Unused components excluded

### Runtime

- **Rendering:** Virtual DOM (Stencil)
- **Change detection:** Efficient property watching
- **Memory:** Minimal overhead per component

---

## Accessibility

### Standards

- **WCAG 2.1 Level AA** compliance
- **ARIA attributes** on all interactive elements
- **Keyboard navigation** fully supported
- **Screen reader** tested

### Features

- Focus management
- Semantic HTML
- ARIA labels and descriptions
- Keyboard shortcuts
- High contrast support

---

## Browser Support

### Modern Browsers (Full Support)

- Chrome 111+
- Safari 15.4+
- Firefox 113+
- Edge 111+

### Feature Support

| Feature | Support |
|---------|---------|
| Web Components | ✅ Native |
| OKLCH Colors | ✅ Native |
| CSS Variables | ✅ Native |
| Scoped CSS | ✅ Stencil |
| Tailwind Classes | ✅ Build-time |

---

## Version History

### v0.1.0 (Current)

**Release Date:** November 2025
**Status:** Initial Release

**Components:**
- ✅ aegov-button (4 variants, 2 appearances, 4 sizes)
- ✅ aegov-avatar (2 variants, 7 sizes, status indicators)
- ✅ aegov-blockquote (2 variants, author attribution)
- ✅ aegov-callout (5 variants, 2 appearances, icons, links, dismissible) - Added Nov 10, 2025

**Features:**
- ✅ Complete design token system (75+ colors)
- ✅ Bi-directional (RTL/LTR) support
- ✅ Tailwind CSS v4 integration
- ✅ OKLCH color space
- ✅ Scoped CSS encapsulation
- ✅ 100% test coverage
- ✅ TypeScript definitions
- ✅ Comprehensive documentation
- ✅ Semantic HTML with ARIA support
- ✅ Custom event system
- ✅ Interactive example pages

**Testing:**
- 280+ tests passing
- Unit + E2E coverage
- Build verification script
- 100% code coverage across all components

---

## Roadmap

### v0.2.0 (Planned)

- [ ] aegov-input (text, email, password, number)
- [ ] aegov-textarea
- [ ] aegov-select
- [ ] aegov-checkbox
- [ ] aegov-radio

### v0.3.0 (Planned)

- [ ] aegov-card
- [ ] aegov-modal
- [ ] aegov-alert
- [ ] aegov-badge
- [ ] aegov-tooltip

### v0.4.0 (Planned)

- [ ] Framework wrappers (React, Vue, Angular)
- [ ] Storybook integration
- [ ] Documentation site
- [ ] npm publishing

---

## Resources

### Documentation

- [README.md](../README.md) - Getting started guide
- [GETTING_STARTED.md](../GETTING_STARTED.md) - Quick start
- [docs/PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Architecture
- [docs/DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - Complete token reference
- [docs/TESTING.md](./TESTING.md) - Testing guide

### External Links

- [StencilJS Documentation](https://stenciljs.com/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [OKLCH Color Picker](https://oklch.com)
- [Web Components Spec](https://www.webcomponents.org/specs)

---

**Last Updated:** November 2025
**Maintained By:** AEGOV Design System Team
**License:** [See package.json]

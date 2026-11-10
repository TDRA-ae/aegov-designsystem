# AEGOV Design System

The UAE Government Design System as framework-agnostic Web Components, built with **StencilJS** and **Tailwind CSS v4**. One implementation, used from plain HTML, React, Vue and Angular.

[![npm](https://img.shields.io/badge/npm-%40aegov%2Fdesignsystem-blue)](https://www.npmjs.com/package/@aegov/designsystem)

## Contents

- [What you get](#what-you-get)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Framework packages](#framework-packages)
- [Design tokens and theming](#design-tokens-and-theming)
- [Component API conventions](#component-api-conventions)
- [Validation](#validation)
- [Accessibility](#accessibility)
- [Documentation](#documentation)
- [Development](#development)
- [Browser support](#browser-support)
- [License](#license)

---

## What you get

- **57 components** — actions, forms, navigation, overlays, feedback, layout, typography and site chrome (header, footer).
- **Framework-agnostic** — native custom elements, plus generated wrappers for React, Vue and Angular.
- **Tailwind CSS v4 theme** — the full UAE palette, type scale, breakpoints and spacing as `@theme` tokens you can use in your own markup.
- **Right-to-left throughout** — logical properties everywhere, automatic Arabic font stacks, and built-in Arabic strings for every component-supplied label.
- **Dark mode** — class-based, so your application can offer an explicit user preference.
- **A uniform validation surface** across all 13 form components, with no validation library required.
- **TypeScript types** for every component, event payload and design token.

---

## Installation

```bash
npm install @aegov/designsystem
```

**Tailwind CSS v4 is required in your project.** The package ships source CSS with `@theme` tokens rather than a pre-compiled stylesheet, so your build compiles it.

Add three imports to your CSS entry file, in this order:

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

Then register the components once, as early as possible:

```ts
import { defineCustomElements } from '@aegov/designsystem/loader';

defineCustomElements();
```

Full setup for Vite, Webpack, Parcel, Rollup and the PostCSS CLI is in the Installation guide on the documentation site (see [Documentation](#documentation)).

### Package entry points

| Specifier | Contents |
| --- | --- |
| `@aegov/designsystem` | Types, and a re-export of the loader. |
| `@aegov/designsystem/loader` | `defineCustomElements()` — lazy registration of all components. |
| `@aegov/designsystem/components` | Tree-shakeable element classes and per-component `defineCustomElement`. |
| `@aegov/designsystem/base` | Global stylesheet — fonts, resets, `.aegov-container`, `.aegov-skip-content`. |
| `@aegov/designsystem/theme` | The Tailwind `@theme` design tokens. |

---

## Quick start

### Plain HTML

With a bundler such as Vite. `styles.css` is your CSS entry containing the three imports above.

```html
<link rel="stylesheet" href="/src/styles.css" />

<aegov-form-field>
  <aegov-label>Email address</aegov-label>
  <aegov-input field-id="email" type="email" name="email" is-required></aegov-input>
</aegov-form-field>

<aegov-button variant="primary" size="lg">Submit application</aegov-button>

<script type="module">
  import { defineCustomElements } from '@aegov/designsystem/loader';
  defineCustomElements();

  document.querySelector('aegov-button')
    .addEventListener('aegovButtonClick', () => console.log('clicked'));
</script>
```

### React

```tsx
import { AegovButton, AegovInput } from '@aegov/designsystem-react';

export function App() {
  return (
    <>
      <AegovInput fieldId="email" type="email" name="email" isRequired />
      <AegovButton variant="primary" size="lg" onAegovButtonClick={submit}>
        Submit application
      </AegovButton>
    </>
  );
}
```

### Vue 3

```ts
// main.ts
import { createApp } from 'vue';
import { ComponentLibrary, defineDesignSystem } from '@aegov/designsystem-vue';
import './styles.css';
import App from './App.vue';

defineDesignSystem().then(() => {
  createApp(App).use(ComponentLibrary).mount('#app');
});
```

```vue
<template>
  <aegov-input field-id="email" type="email" name="email" :is-required="true" />
  <aegov-button variant="primary" size="lg" @aegovButtonClick="submit">
    Submit application
  </aegov-button>
</template>
```

Set Vue's `isCustomElement` compiler option for `aegov-*` tags, or use the typed components (`AegovButton`, `AegovInput`, …), which also support `v-model`. See the `@aegov/designsystem-vue` README.

### Angular 18+

Each wrapper registers its own element:

```ts
import { Component } from '@angular/core';
import { AegovButton, AegovInput } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-root',
  imports: [AegovButton, AegovInput],
  template: `
    <aegov-input fieldId="email" type="email" name="email" [isRequired]="true" />
    <aegov-button variant="primary" size="lg" (aegovButtonClick)="submit()">
      Submit application
    </aegov-button>
  `,
})
export class AppComponent {}
```

For the global script (toast live region, `window.aegovToast`) and registration of every element, add `provideDesignSystem()` from the `/provider` entry point. NgModule apps import `DesignSystemModule`, which re-exports every wrapper and has no providers.

```ts
// app.config.ts
import { provideDesignSystem } from '@aegov/designsystem-angular/provider';

export const appConfig = { providers: [provideDesignSystem()] };
```

---

## Framework packages

| Package | Registration | Props | Events |
| --- | --- | --- | --- |
| `@aegov/designsystem` | `defineCustomElements()` | kebab-case attributes | `addEventListener('aegovX')` |
| `@aegov/designsystem-react` | automatic, per wrapper | **camelCase** | `onAegovX` |
| `@aegov/designsystem-vue` | `app.use(ComponentLibrary)`, or automatic per typed component | kebab-case on tags, camelCase on typed components | `@aegovX` |
| `@aegov/designsystem-angular` | automatic, per wrapper (`DesignSystemModule` for NgModule apps); `provideDesignSystem()` from `@aegov/designsystem-angular/provider` for the global script | **camelCase** | `(aegovX)` |

Per-framework guides, including SSR notes and the known caveats (`ngModel` / `formControlName` are not yet supported in Angular), are on the documentation site: *Using with React*, *Using with Vue* and *Using with Angular*. Working setups for each framework live in the monorepo's `test-apps/` directory.

---

## Design tokens and theming

Importing `@aegov/designsystem/theme` gives you the full token set as Tailwind utilities in your own markup:

```html
<div class="bg-primary-600 text-whitely-50 px-4 py-2 rounded-lg">
  Using AEGOV design tokens
</div>
```

| Token family | Contents |
| --- | --- |
| Colours | `primary` (+ `primary-support`), `secondary` (+ `secondary-support`), `aeblack`, `aered`, `aegreen`, `aegold`, `techblue`, `seablue`, `camel`, `desert`, `whitely`, `fuchsia`, `indigo`, `purple`, `pink`, `lime`, `slate` — each on a 50–950 scale, in OKLCH. |
| Typography | `--font-roboto`, `--font-inter`, `--font-notokufi`, `--font-alexandria`; sizes `text-xs`–`text-3xl` plus `text-display` and `text-h1`–`text-h6`, each with a paired line height. |
| Breakpoints | `xs` 480, `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. |
| Transitions | Duration and timing tokens. |

The theme also declares an explicit cascade-layer order:

```css
@layer theme, base, components, aegov-internals, utilities;
```

Because `utilities` comes last, your own Tailwind classes always beat the design system's element-level styling — no `!important` needed.

### Dark mode

Class-based, via `@custom-variant dark (&:where(.dark, .dark *))`. Add `dark` to the root element:

```html
<html class="dark">
```

### Right-to-left

Set `dir="rtl"` and the whole system flips: layout uses logical properties, and the body and heading font stacks switch to Noto Kufi Arabic and Alexandria automatically.

Set `dir` on `<html>` rather than an inner wrapper — the portal-based components (toast, dropdown, popover, datepicker) and the header's injected skip link render into `document.body` and inherit direction from the document.

---

## Component API conventions

The whole library follows one naming grammar, which makes most of the API predictable:

| Slot in the grammar | Meaning | Values |
| --- | --- | --- |
| `variant` | Semantic **colour** | `primary`, `secondary`, `neutral-max`, `neutral-min` (+ `danger` on actions) |
| `appearance` | Visual **style** | `solid`, `outline`, `soft`, `link` on actions; per-family sets elsewhere |
| `size` | Size token, **responsive** | `"sm md:base xl:lg"` — resolved at runtime |
| `is*` | Every boolean | `isDisabled`, `isRequired`, `isOpen`, `isInvalid`, `isLoading`, … |
| `label*` | User-visible strings | `label`, `labelNav`, `labelButton`, … |
| `extraClass` | Extra classes on the inner element | not `class` |
| `fieldId` | Element ID | not `id`; auto-generated |

Responsive size strings work on most components and accept the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`:

```html
<aegov-button size="sm md:base xl:lg">Adapts to the viewport</aegov-button>
<aegov-bento-grid cols="1 md:2 lg:4"></aegov-bento-grid>
```

Events are named `aegov` + component + action, and carry structured detail:

```js
input.addEventListener('aegovInputChange', (e) => console.log(e.detail.value));
```

---

## Validation

Every form component ships the same surface, with **no dependencies**: `isInvalid`, `errorMessage` and `hint` properties, `error` and `hint` slots, an `aegovValidate` event, and `validate()` / `setCustomValidity()` methods.

```js
input.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger !== 'blur') return;
  const ok = /\S+@\S+\.\S+/.test(e.detail.value);
  input.isInvalid = !ok;
  input.errorMessage = ok ? '' : 'Enter a valid email address';
});
```

All 13 form components participate in native `<form>` submission. The 10 single controls (`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-radio`, `aegov-toggle`, `aegov-range`, `aegov-otp`, `aegov-fileupload`, `aegov-datepicker`) are form-associated custom elements using `ElementInternals`; `aegov-checkbox-group` and `aegov-radio-group` aggregate their children, and `aegov-form-field` cascades state to the control inside it.

The documentation site covers the full contract (*Validation Surface*) and recipes with no extra package (*Bring Your Own Validator*).

For schema-driven validation an **optional** companion package, `@aegov/designsystem-validation`, is being developed in a separate repository, with adapters for Valibot, Zod, Vest and the native Constraint Validation API. Nothing in the design system depends on it.

---

## Accessibility

Built for WCAG 2.2 AA. Every component page documents what the component handles and what you must supply. The highlights:

- Native elements underneath wherever possible — real `<button>`, `<input>`, `<select>`, `<progress>`, `<blockquote>`.
- `aria-describedby` is **composed**, not overwritten, so your own IDs survive alongside hint, error and counter regions.
- Error regions announce only after a field's first blur, so screen readers are not flooded mid-typing.
- Focus is trapped in modals and drawers, and returned to the trigger on close with `preventScroll`.
- Live-region politeness is derived from meaning: `error` and `warning` interrupt, everything else waits.
- Component-supplied labels — "Show password", "Clear selection", "Dismiss", size units, file errors — are provided in English and Arabic and selected from the page direction.
- Focus rings hold a constant high-contrast colour across variants to meet the 3:1 non-text contrast requirement.

---

## Documentation

The documentation site lives in its own repository, `aegov-designsystem-docs`. It installs this package and renders live examples against it; every component has a page covering examples, RTL behaviour, a full API reference, and accessibility obligations.

The generated API for every tag — props, events, methods, slots — ships in this package as `dist/docs.json`, and each component directory has a generated `readme.md`.

---

## Development

```bash
npm run build          # Stencil build (+ docs.json, wrapper proxies) → copy CSS to dist
npm run build:prod     # production build (minified)
npm test               # unit + e2e
npm run test:unit      # unit only
npm run test:e2e       # e2e only
npm run test:watch     # unit + e2e in watch mode
npm run test:coverage  # coverage report
npm run size           # check bundle-size budgets
npx stencil generate   # scaffold a new component
```

There is no dev server in this package. To try components in a running app, use the test apps from the repository root:

```bash
npm run test:html      # also test:react, test:vue, test:angular, or test:apps for all four
```

This package lives in a Lerna + Nx monorepo. Building it also regenerates the React, Vue and Angular wrapper sources, so run builds from the repository root to get everything in the right order:

```bash
npm run build          # from the repo root: core + all three wrappers
```

Cross-component accessibility checks run as unit tests (`src/utils/accessibility.spec.ts`). The browser-driven Playwright accessibility suite lives in the documentation repository, where it runs against the docs pages.

See [DEVELOPER.md](../../DEVELOPER.md) at the repository root for the monorepo command reference and the publish flow.

### Project structure

```
src/
├── components/     # 57 component directories
├── utils/          # types, validation, portals, focus, responsive props, a11y helpers
├── styles/
│   └── tailwind.css  # the @theme token definitions
├── global/
│   ├── global.css    # global stylesheet shipped as ./base
│   ├── app.ts        # Stencil globalScript
│   └── toast-helper.ts
└── index.ts        # library entry — exports all public types
```

---

## Browser support

| Browser | Minimum |
| --- | --- |
| Chrome / Edge | 77 |
| Firefox | 98 |
| Safari | **16.4** |

Safari 16.4 is a hard floor: all 10 single form controls are form-associated custom elements and require `ElementInternals`.

Components are client-side only — they rely on the Custom Elements API, which has no server implementation. Under SSR, render them on the client; the CSS import is SSR-safe.

---

## License

MIT — see [LICENSE.md](LICENSE.md).

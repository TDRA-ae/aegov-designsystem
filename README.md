<div align="center">

# UAE Design System

**The official component library for UAE Federal Government digital services.**

Build accessible, bilingual, on-brand government websites and applications faster, with one set of components that works in plain HTML, React, Vue and Angular.

[**Website**](https://designsystem.gov.ae) ·
[**Get started**](https://designsystem.gov.ae/docs/getting-started) ·
[**Components**](https://designsystem.gov.ae/docs/components) ·
[**Guidelines**](https://designsystem.gov.ae/guidelines) ·
[**Figma kit**](https://designsystem.gov.ae/resources/assets-and-tools)

![Version](https://img.shields.io/badge/version-4.0.0-B68A35)
![Web Components](https://img.shields.io/badge/web%20components-Stencil%204-232F3E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8)
![Frameworks](https://img.shields.io/badge/works%20with-HTML%20%7C%20React%20%7C%20Vue%20%7C%20Angular-3F8E50)
![RTL](https://img.shields.io/badge/Arabic%20%2F%20RTL-built%20in-92722A)

</div>

---

## Why the UAE Design System?

Every federal entity needs the same building blocks: a trustworthy header, clear forms, helpful feedback, accessible navigation. The UAE Design System gives your team those building blocks ready-made, tested and aligned with the national design language, so you can spend your time on the service itself.

> 📘 **Full documentation lives at [designsystem.gov.ae](https://designsystem.gov.ae).** It covers live examples for every component, design guidelines, the Figma kit and the assessment criteria for government websites. This README covers what you need to get running in code.

### Highlights

- 🧩 **57 production-ready components.** Forms, navigation, overlays, feedback, layout and the official government header and footer, all in one package.
- 🌐 **One library for every stack.** These are standard Web Components, so they run anywhere HTML runs. First-class wrappers for **React**, **Vue** and **Angular** add typed props and native-feeling events.
- 🇦🇪 **Arabic and RTL built in.** Components follow the page's `dir` attribute. Their built-in text (labels, hints, error messages) comes in English and Arabic, and each script gets its own typefaces.
- ♿ **Accessible by default.** Keyboard support, focus management, screen-reader announcements and correct labelling are built into each component, not left for your team to add.
- 📝 **Forms that just work.** Form controls take part in native `<form>` submission and validation, and share one validation API.
- 🎨 **Themeable with design tokens.** The national palette, typography and spacing ship as Tailwind CSS v4 tokens. You can rebrand primary and secondary colours to match your entity.
- 🌙 **Dark mode.** Add a `dark` class to `<html>` to switch the whole interface.
- 📱 **Responsive props.** Change a component's size at each breakpoint with one attribute, for example `size="sm md:base xl:lg"`.
- ⚡ **Lightweight and lazy-loaded.** A small loader registers every tag, and each component's code downloads only when it first appears on the page.

---

## Packages

This repository is a monorepo that publishes four packages. They are all versioned together.

| Package | What it is | Use it when |
| --- | --- | --- |
| [`@aegov/designsystem`](packages/designsystem) | The core Web Components, design tokens and base styles. | **Always.** Every app needs it. It is all you need for plain HTML or any other framework. |
| [`@aegov/designsystem-react`](packages/designsystem-react) | React wrappers with typed props and `onAegov…` event handlers. | React 18 or 19 (including Next.js). |
| [`@aegov/designsystem-vue`](packages/designsystem-vue) | A Vue plugin plus typed component proxies. | Vue 3.5 or later (including Nuxt). |
| [`@aegov/designsystem-angular`](packages/designsystem-angular) | Standalone Angular components, `DesignSystemModule` and `provideDesignSystem()`. | Angular 18 or later. |

---

## Quick start

Every setup uses the same two steps:

1. **Styles.** Import Tailwind CSS v4 and the design system's base styles and theme tokens.
2. **Components.** Register the custom elements once. The React wrappers register them for you.

> **Tailwind CSS v4 is required.** The base styles and theme tokens are shipped as Tailwind source, and your app's Tailwind build compiles them.

### 1. Install

```bash
npm install @aegov/designsystem
```

Then add the Tailwind CSS v4 integration for your build tool. For Vite:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

For Webpack, Angular and other PostCSS-based builds, use `@tailwindcss/postcss` instead. See the [installation guide](https://designsystem.gov.ae/docs/installation).

### 2. Add the styles

In your main CSS file, import these three files in this order:

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";   /* fonts, resets, page-level styles */
@import "@aegov/designsystem/theme";  /* UAE design tokens: colours, type, breakpoints */
```

### 3. Register the components and use them

<details open>
<summary><strong>HTML / any framework</strong></summary>

```js
// main.js
import './styles.css';
import { defineCustomElements } from '@aegov/designsystem/loader';

defineCustomElements();
```

```html
<form>
  <aegov-form-field>
    <aegov-label>Full name</aegov-label>
    <aegov-input name="full-name" is-required></aegov-input>
  </aegov-form-field>

  <aegov-button type="submit" variant="primary">Submit application</aegov-button>
</form>
```

Serve the page over HTTP, for example with `vite`. Custom elements do not load from `file://`.

</details>

<details>
<summary><strong>React</strong></summary>

```bash
npm install @aegov/designsystem @aegov/designsystem-react
```

```tsx
import './styles.css'; // the three @import lines above
import { AegovButton, AegovFormField, AegovInput, AegovLabel } from '@aegov/designsystem-react';

export function ApplicationForm() {
  return (
    <form>
      <AegovFormField>
        <AegovLabel>Full name</AegovLabel>
        <AegovInput name="full-name" isRequired />
      </AegovFormField>

      <AegovButton type="submit" variant="primary" onAegovButtonClick={() => console.log('submitted')}>
        Submit application
      </AegovButton>
    </form>
  );
}
```

- Each wrapper registers its own element, so you **do not** call `defineCustomElements()` in React.
- Props are camelCase (`isRequired`, `fieldId`). Events are `onAegov…`.
- Components run in the browser only. In Next.js and other server-rendered apps, load them on the client only, for example with `next/dynamic` and `{ ssr: false }`. Keep the CSS import in your root layout.

</details>

<details>
<summary><strong>Vue 3</strong></summary>

```bash
npm install @aegov/designsystem @aegov/designsystem-vue
```

```ts
// main.ts
import { createApp } from 'vue';
import { ComponentLibrary, defineDesignSystem } from '@aegov/designsystem-vue';
import App from './App.vue';
import './styles.css';

// Wait until the elements are defined, so the first render sets props correctly.
defineDesignSystem().then(() => {
  createApp(App).use(ComponentLibrary).mount('#app');
});
```

Tell Vue's template compiler that `aegov-*` tags are custom elements:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('aegov-') } } }),
    tailwindcss(),
  ],
});
```

```vue
<template>
  <aegov-form-field>
    <aegov-label>Full name</aegov-label>
    <aegov-input name="full-name" is-required></aegov-input>
  </aegov-form-field>

  <aegov-button variant="primary" @aegovButtonClick="submit">Submit application</aegov-button>
</template>
```

- Attributes are kebab-case. Listen to events by their **camelCase** name: `@aegovButtonClick` works, `@aegov-button-click` never fires.
- If you prefer, use the typed components instead (`AegovInput`, `AegovButton` and so on, imported from `@aegov/designsystem-vue`). They support `v-model` and don't need `isCustomElement`.

</details>

<details>
<summary><strong>Angular</strong></summary>

```bash
npm install @aegov/designsystem @aegov/designsystem-angular
```

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideDesignSystem } from '@aegov/designsystem-angular/provider';

export const appConfig: ApplicationConfig = {
  providers: [provideDesignSystem()],
};
```

```ts
// application-form.component.ts
import { Component } from '@angular/core';
import { AegovButton, AegovFormField, AegovInput, AegovLabel } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [AegovButton, AegovFormField, AegovInput, AegovLabel],
  template: `
    <aegov-form-field>
      <aegov-label>Full name</aegov-label>
      <aegov-input name="full-name" [isRequired]="true"></aegov-input>
    </aegov-form-field>

    <aegov-button variant="primary" (aegovButtonClick)="submit()">Submit application</aegov-button>
  `,
})
export class ApplicationFormComponent {
  submit() {}
}
```

- Each wrapper registers its own element. `provideDesignSystem()` also registers every tag at startup and runs the global script, which creates the toast live region. Add it as an application-level provider.
- Templates use camelCase inputs (`[isRequired]`) and `(aegov…)` outputs.
- NgModule apps can import `DesignSystemModule`, which re-exports every wrapper. It has no providers, so add `provideDesignSystem()` to the root providers as well.

</details>

**Next steps:** browse the [component library](https://designsystem.gov.ae/docs/components) for live examples, then read the [guidelines](https://designsystem.gov.ae/guidelines) on when and how to use each component.

---

## Components

57 custom elements, all prefixed `aegov-`. See every one in action at **[designsystem.gov.ae/docs/components](https://designsystem.gov.ae/docs/components)**.

| Category | Components |
| --- | --- |
| **Actions** | `button` · `button-group` · `link` |
| **Forms** | `form-field` · `label` · `input` · `input-group` · `textarea` · `select` (+ `select-option`, `select-option-group`) · `checkbox` (+ `checkbox-group`) · `radio` (+ `radio-group`) · `toggle` · `range` · `otp` · `fileupload` · `datepicker` · `progress` |
| **Navigation** | `breadcrumbs` (+ `breadcrumbs-item`) · `pagination` · `tabs` (+ `tab`, `tab-panel`) · `accordion` (+ `accordion-item`) · `navbar` (+ `navbar-item`) · `navblock` (+ `navblock-item`) · `timeline` (+ `timeline-step`) |
| **Overlays** | `modal` · `drawer` · `dropdown` · `popover` · `tooltip` |
| **Feedback** | `badge` · `callout` · `banner` · `toast` |
| **Layout & content** | `card` · `bento-grid` · `aspect-ratio` · `separator` · `avatar` (+ `avatar-group`) · `blockquote` · `text` · `title` |
| **Government site chrome** | `header` (ministry and authority variants) · `header-banner` · `footer` · `footer-highlights` |

### One consistent API

Once you have learned one component, you know how the others work:

| Attribute | Meaning | Example |
| --- | --- | --- |
| `variant` | Colour | `variant="primary"` · `secondary` · `neutral-max` · `neutral-min` |
| `appearance` | Visual style | `appearance="outline"` on a button, `appearance="soft"` on a callout |
| `size` | Size, responsive | `size="sm md:base xl:lg"` |
| `is-*` | Every on/off option | `is-disabled` · `is-required` · `is-open` · `is-loading` |
| `label*` | Visible and accessible text | `label` · `label-menu` · `logo-label` |
| `field-id` | Element ID | Generated automatically if you leave it out |
| `extra-class` | Your own CSS classes | `extra-class="mt-4"` |

Events are named `aegov<Component><Action>`, for example `aegovButtonClick` and `aegovModalClose`. Usage guidance for each component is on [designsystem.gov.ae](https://designsystem.gov.ae/docs/components). The full machine-readable API (props, events, methods and slots for every tag) ships in the package as `dist/docs.json`.

---

## Built for government services

### ♿ Accessibility

Accessibility is designed into every component, following the [UAE accessibility guidelines](https://designsystem.gov.ae/guidelines/accessibility):

- **Native form behaviour.** `button` and the ten core form controls (`input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `range`, `otp`, `fileupload`, `datepicker`) are form-associated custom elements. They submit with your `<form>`, respect `<fieldset disabled>` and report their validity like native inputs.
- **Focus done right.** Clicking or tabbing to a component moves focus to the right inner control. Modals and drawers keep focus inside while they are open and close with <kbd>Esc</kbd>. Modals, drawers and dropdowns return focus to whatever opened them.
- **Clear announcements.** Error messages are linked to their fields and announced to screen readers without interrupting users while they type. Toasts are announced through dedicated live regions.
- **Labels and hints connected for you.** Wrap a control in `aegov-form-field` with an `aegov-label`, and the label, hint and error text are linked to it automatically.

### 📝 Validation

All twelve form controls share one validation API: the `is-invalid`, `error-message` and `hint` props, the `validate()` and `setCustomValidity()` methods, and the `aegovValidate` event. Set the error state on an `aegov-form-field` and it passes down to the control inside.

### 🇦🇪 Arabic and right-to-left

Set `dir="rtl"` on `<html>` and components mirror their layout. Set it on `<html>` rather than an inner wrapper, because toasts, dropdowns, popovers and the date picker render into `document.body` and take their direction from the document. Components with built-in text, such as the file upload, date picker, select, OTP, pagination, breadcrumbs and dismiss buttons, switch to Arabic automatically. Typography follows the script: Roboto and Inter for Latin, Noto Kufi Arabic and Alexandria for Arabic. Read the [typography guidelines](https://designsystem.gov.ae/guidelines/typography).

### 🎨 Theming and dark mode

The full UAE palette ships as Tailwind CSS v4 tokens. It includes AE Gold, AE Red, AE Green, AE Black and supporting colours, plus the type scale and breakpoints. Point `primary` or `secondary` at another palette in your own CSS to match your entity's brand:

```css
@theme {
  --color-primary-50: var(--color-aegreen-50);
  /* … 100 to 900 … */
  --color-primary-950: var(--color-aegreen-950);
}
```

Dark mode is class-based. Toggle `dark` on `<html>`, and Tailwind `dark:` utilities in your own markup follow it too. Read the [colour guidelines](https://designsystem.gov.ae/guidelines/colour-system) to keep custom themes on-brand and accessible.

---

## Browser support

| Browser | Minimum version |
| --- | --- |
| Chrome / Edge | 111 |
| Firefox | 128 |
| Safari (macOS and iOS) | 16.4 |

The minimums come from Tailwind CSS v4 (cascade layers, `color-mix()`, `@property`) and from `ElementInternals`, which form-associated custom elements need. Safari 16.4 is a hard minimum. See [browser support](https://designsystem.gov.ae/docs/browser-support) for details.

---

## Design resources

| Resource | Where |
| --- | --- |
| Design guidelines: typography, colour, layout, content, iconography, imagery, accessibility | [designsystem.gov.ae/guidelines](https://designsystem.gov.ae/guidelines) |
| Figma UI kit and templates | [Assets & tools](https://designsystem.gov.ae/resources/assets-and-tools) |
| Front-end development guidelines | [designsystem.gov.ae/guidelines/frontend-development](https://designsystem.gov.ae/guidelines/frontend-development) |
| Roadmap and release news | [designsystem.gov.ae/resources/roadmap](https://designsystem.gov.ae/resources/roadmap) |
| Frequently asked questions | [designsystem.gov.ae/resources/frequently-asked-questions](https://designsystem.gov.ae/resources/frequently-asked-questions) |

---

## Working in this repository

### Structure

```text
packages/
  designsystem/          @aegov/designsystem: Stencil components, tokens, base styles
  designsystem-react/    @aegov/designsystem-react: generated React wrappers
  designsystem-vue/      @aegov/designsystem-vue: generated Vue proxies + plugin
  designsystem-angular/  @aegov/designsystem-angular: generated Angular wrappers + provider
test-apps/
  test-html/  test-react/  test-vue/  test-angular/   working reference apps for each framework
```

The core package is the single source of truth. Building it regenerates the React, Vue and Angular wrapper sources, so never edit the `stencil-generated` folders by hand.

### Common commands

Run these from the repository root. You need Node.js 22.22.3 or later, which is the Angular CLI minimum.

```bash
npm install            # install every workspace
npm run build          # build core + React + Vue + Angular wrappers in order
npm test               # run every package's test suite
npm run test:apps      # start the HTML, React, Vue and Angular test apps
```

Inside `packages/designsystem`:

```bash
npm run test:unit      # Stencil spec tests
npm run test:e2e       # Puppeteer end-to-end tests
npm run build:prod     # production build, as published
```

More commands and the release process are in [DEVELOPER.md](DEVELOPER.md). Some of its core-package sections are out of date: the docs site and its Playwright accessibility tests have moved to their own repository. Contributor conventions are in [packages/designsystem/CLAUDE.md](packages/designsystem/CLAUDE.md).

---

## Contributing

We welcome contributions from federal entities, their delivery partners and the wider design system team.

1. **Start with an issue.** Describe the bug or proposal and which component it affects before you open a pull request.
2. **Follow the API conventions.** `variant` means colour, `appearance` means style, every boolean is `is*`, and text props start with `label`. New props should fit the existing pattern.
3. **Test it.** Add or update the component's spec and end-to-end tests, and check it in at least one test app, in both LTR and RTL.
4. **Keep it accessible.** Check keyboard use, focus and screen-reader output against the [accessibility guidelines](https://designsystem.gov.ae/guidelines/accessibility).

Design changes should start with the [guidelines](https://designsystem.gov.ae/guidelines) and the Figma kit, so that design and code stay in step.

## Support

- 📘 **Documentation:** [designsystem.gov.ae](https://designsystem.gov.ae)
- ✉️ **Email:** [design.system@tdra.gov.ae](mailto:design.system@tdra.gov.ae)
- 🐞 **Issues and discussions** (for repository collaborators): [GitHub issues](https://github.com/TDRA-ae/aegov-designsystem/issues) · [Discussions](https://github.com/orgs/TDRA-ae/discussions)
- 📰 **Newsletter:** [subscribe for release updates](https://subscribe.designsystem.gov.ae/h/y/04C50C288D13408F)

## Licence

Copyright © 2026 Telecommunication and Digital Regulatory Authority of United Arab Emirates (TDRA). All rights reserved.

You may use the UAE Design System to design, build and deploy websites and applications commissioned by, owned by or operated for the UAE Federal Government. Any other use needs prior permission from TDRA. Do not modify the core component code. Customise it only through the supported tokens, configuration and overrides. Read the full terms in [LICENSE.md](packages/designsystem/LICENSE.md).

<div align="center">

**[designsystem.gov.ae](https://designsystem.gov.ae)**: designing better government services for everyone in the UAE.

</div>

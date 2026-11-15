# @aegov/designsystem

**The UAE Design System as Web Components.** This is the official component library for UAE Federal Government websites and applications. You write it once and it works in plain HTML, React, Vue and Angular.

📘 **Documentation, live examples and guidelines: [designsystem.gov.ae](https://designsystem.gov.ae)**

[Get started](https://designsystem.gov.ae/docs/getting-started) · [Installation](https://designsystem.gov.ae/docs/installation) · [Components](https://designsystem.gov.ae/docs/components) · [Guidelines](https://designsystem.gov.ae/guidelines) · [Figma kit](https://designsystem.gov.ae/resources/assets-and-tools)

---

## What you get

- **57 components.** Actions, forms, navigation, overlays, feedback, layout and the official government header and footer.
- **Any framework.** Standard custom elements, plus companion packages for React, Vue and Angular.
- **Arabic and RTL built in.** Layouts mirror with `dir="rtl"`, Arabic typefaces apply automatically, and component text is supplied in English and Arabic.
- **Accessible by default.** Focus management, keyboard support, linked labels and errors, and screen-reader announcements.
- **Native forms.** Form controls submit with `<form>` and share one validation API. No validation library is needed.
- **UAE design tokens.** The national palette, type scale and breakpoints are Tailwind CSS v4 tokens you can use in your own markup and rebrand.
- **Dark mode and responsive sizing.** Switch themes with a class. Set sizes per breakpoint with `size="sm md:base xl:lg"`.
- **TypeScript types** for every component, event payload and token.

---

## Installation

```bash
npm install @aegov/designsystem
```

**Your project needs Tailwind CSS v4.** The package ships its base styles and tokens as Tailwind source, not a pre-compiled stylesheet, so your build compiles them.

**1. Styles.** Add three imports to your CSS entry file, in this order:

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

**2. Components.** Register the elements once, as early as possible:

```js
import { defineCustomElements } from '@aegov/designsystem/loader';

defineCustomElements();
```

**3. Use them.**

```html
<form>
  <aegov-form-field>
    <aegov-label>Email address</aegov-label>
    <aegov-input type="email" name="email" is-required></aegov-input>
  </aegov-form-field>

  <aegov-button type="submit" variant="primary">Submit application</aegov-button>
</form>
```

Custom elements need an HTTP server. They do not load from `file://`. Setup for Vite, Webpack and other bundlers is in the [installation guide](https://designsystem.gov.ae/docs/installation).

### Entry points

| Specifier | Contents |
| --- | --- |
| `@aegov/designsystem` | Types, and a re-export of the loader. |
| `@aegov/designsystem/loader` | `defineCustomElements()`, which lazily registers every component. |
| `@aegov/designsystem/components` | Tree-shakeable element classes and a `defineCustomElement` for each component. |
| `@aegov/designsystem/base` | Global stylesheet: fonts, resets, `.aegov-container`, `.aegov-skip-content`. |
| `@aegov/designsystem/theme` | The Tailwind `@theme` design tokens. |

---

## Using a framework

Install the companion package next to this one. Every setup keeps the three CSS imports above.

| Framework | Install | Registering the elements | Props | Events |
| --- | --- | --- | --- | --- |
| HTML / other | `@aegov/designsystem` | `defineCustomElements()` | kebab-case attributes | `addEventListener('aegovButtonClick', …)` |
| React 18 / 19 | `@aegov/designsystem-react` | Automatic: each wrapper registers its own element | camelCase | `onAegovButtonClick` |
| Vue 3.5+ | `@aegov/designsystem-vue` | `app.use(ComponentLibrary)` after `defineDesignSystem()` resolves, or the typed components | kebab-case on tags | `@aegovButtonClick` (camelCase) |
| Angular 18+ | `@aegov/designsystem-angular` | Each wrapper registers its own element. Add `provideDesignSystem()` from `@aegov/designsystem-angular/provider` for the global script. | camelCase | `(aegovButtonClick)` |

```tsx
// React
import { AegovButton } from '@aegov/designsystem-react';

<AegovButton variant="primary" onAegovButtonClick={submit}>Submit application</AegovButton>;
```

Components run in the browser only. In server-rendered apps (Next.js, Nuxt, Angular SSR), render them on the client. The CSS imports are safe to use on the server.

---

## The API in one table

Every component uses the same naming, so once you know one you can predict the rest.

| Name | Meaning | Values |
| --- | --- | --- |
| `variant` | Colour | `primary`, `secondary`, `neutral-max`, `neutral-min` (+ `danger` on button and link). On `aegov-badge`, `variant` is a palette colour such as `aegold` or `techblue`. |
| `appearance` | Visual style | `solid`, `outline`, `soft`, `link` on actions. Other families have their own sets. |
| `size` | Size, responsive | `"sm md:base xl:lg"`, using breakpoint prefixes `xs` to `2xl` |
| `is*` | Every boolean | `isDisabled`, `isRequired`, `isOpen`, `isInvalid`, `isLoading`, … |
| `label*` | Visible and accessible text | `label`, `labelMenu`, `logoLabel`, … |
| `extraClass` | Your extra CSS classes, on components that have it | instead of `class` |
| `fieldId` | Element ID | instead of `id`. Generated automatically. |

Events are named `aegov` + component + action and carry a typed `detail`:

```js
input.addEventListener('aegovInputChange', (e) => console.log(e.detail.value));
```

The full API (props, events, methods and slots for every tag) ships in this package as **`dist/docs.json`**. Usage guidance for each component is on [designsystem.gov.ae](https://designsystem.gov.ae/docs/components).

---

## Forms and validation

`aegov-button` and the ten single form controls (`input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `range`, `otp`, `fileupload`, `datepicker`) are **form-associated custom elements**. They submit with the surrounding `<form>`, respect `<fieldset disabled>` and report validity like native inputs. `checkbox-group` and `radio-group` collect the values of the controls inside them.

All twelve controls share one validation API: the `isInvalid`, `errorMessage` and `hint` props, the `error` and `hint` slots, the `validate()` and `setCustomValidity()` methods, and the `aegovValidate` event.

```js
input.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger !== 'blur') return;
  const ok = /\S+@\S+\.\S+/.test(e.detail.value);
  input.isInvalid = !ok;
  input.errorMessage = ok ? '' : 'Enter a valid email address';
});
```

Wrap a control in `aegov-form-field` and the wrapper links the label, hint and error text to it. Error state set on the wrapper passes down to the control.

---

## Accessibility, RTL and theming

**Accessibility.** The components follow the [UAE accessibility guidelines](https://designsystem.gov.ae/guidelines/accessibility):

- Real `<button>`, `<input>`, `<select>` and `<progress>` elements sit underneath wherever possible.
- `aria-describedby` is combined, not overwritten, so your own IDs are kept alongside the hint and error IDs.
- Error messages are announced after the user first leaves a field, not on every keystroke.
- Modals and drawers keep focus inside while open, close with <kbd>Esc</kbd> and return focus to the control that opened them.

**Right-to-left.** Set `dir="rtl"` on `<html>`. Layouts mirror, and the fonts switch to Noto Kufi Arabic (body) and Alexandria (headings). Built-in text, such as "Show password", "Clear selection", dismiss labels, file-size units and upload errors, switches to Arabic. Set `dir` on `<html>`, not on an inner wrapper, because toasts, dropdowns, popovers and the date picker render into `document.body`.

**Dark mode.** Class-based. Add `dark` to `<html>`:

```html
<html class="dark">
```

**Design tokens.** `@aegov/designsystem/theme` makes the full token set available as Tailwind utilities:

```html
<div class="bg-primary-600 text-whitely-50 px-4 py-2 rounded-lg">Using UAE design tokens</div>
```

| Family | Tokens |
| --- | --- |
| Colours | `primary` (+ `primary-support`), `secondary` (+ `secondary-support`), `aegold`, `aered`, `aegreen`, `aeblack`, `whitely`, `camel`, `desert`, `slate`, `techblue`, `seablue`, `fuchsia`, `purple`, `indigo`, `pink`. Each has a 50–950 scale in OKLCH. |
| Typography | `--font-roboto`, `--font-inter`, `--font-notokufi`, `--font-alexandria`. Sizes `text-xs` to `text-3xl`, plus `text-display` and `text-h1` to `text-h6`. |
| Breakpoints | `xs` 480, `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 |
| Motion | Transition duration and timing tokens |

To rebrand, point `primary` (or `secondary`) at another palette in your own `@theme` block, for example `--color-primary-600: var(--color-aegreen-600);`. Your own Tailwind utility classes always override the design system's element styles, with no `!important` needed. Follow the [colour guidelines](https://designsystem.gov.ae/guidelines/colour-system) when you customise.

---

## Browser support

| Browser | Minimum version |
| --- | --- |
| Chrome / Edge | 111 |
| Firefox | 128 |
| Safari (macOS and iOS) | **16.4** |

The minimums come from Tailwind CSS v4 and from `ElementInternals`, which the form-associated controls need. Safari 16.4 is a hard minimum.

---

## Support

- Documentation: [designsystem.gov.ae](https://designsystem.gov.ae)
- Email: [design.system@tdra.gov.ae](mailto:design.system@tdra.gov.ae)
- Release news: [designsystem.gov.ae/resources/roadmap](https://designsystem.gov.ae/resources/roadmap)

## Licence

Copyright © 2026 Telecommunication and Digital Regulatory Authority of United Arab Emirates (TDRA). All rights reserved.

You may use this package to design, build and deploy websites and applications commissioned by, owned by or operated for the UAE Federal Government. Any other use needs prior permission from TDRA. Do not modify the core component code. Customise it only through the supported tokens, configuration and overrides. See `LICENSE.md` in this package for the full terms.

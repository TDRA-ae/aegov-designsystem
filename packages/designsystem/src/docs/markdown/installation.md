# Installation

<p class="text-lg text-aeblack-500 mb-8">This page covers installing the AEGOV Design System in a plain HTML or vanilla JavaScript project. The design system ships as <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components</a> — every <code>aegov-*</code> tag works in any page once the stylesheet and the loader have run. <strong>Tailwind CSS v4 is required in your project</strong>, because the package ships source CSS that your build compiles. If you are using React, Vue, or Angular, start here for the CSS setup and then continue to the framework guide in the left navigation.</p>

## Introduction

Installing the design system is always the same two steps, regardless of build tool:

1. **Compile the CSS** — three `@import` lines in your stylesheet, processed by Tailwind v4.
2. **Register the custom elements** — one `defineCustomElements()` call.

Miss the first and components render unstyled. Miss the second and `<aegov-button>` renders as inert plain text.

```html
<link rel="stylesheet" href="/dist/styles.css" />

<aegov-button variant="primary">Submit application</aegov-button>

<script type="module">
  import { defineCustomElements } from '@aegov/designsystem/loader';
  defineCustomElements();
</script>
```

The bare `import` above only resolves once a build tool has processed it — pick the matching section under [Step 2](#step-2-set-up-your-build-tool) for your tool. Building nothing at all? Use the [PostCSS CLI](#postcss-cli-no-bundler) section, which loads a self-registering bundle instead of this `import`.

---

## Requirements

| Requirement | Version | Why |
| --- | --- | --- |
| Tailwind CSS | `^4.1` | The package ships **source** CSS with `@theme` tokens and `@apply` rules. Your build compiles it. There is no pre-compiled stylesheet. |
| Node (build time) | `>=20` | Required by Tailwind v4 and the bundler plugins below. |
| Chrome / Edge | `>=77` | Custom Elements v1. |
| Firefox | `>=98` | Custom Elements v1. |
| Safari | `>=16.4` | **Hard floor.** Several form components are form-associated custom elements and depend on `ElementInternals`. Older Safari cannot run them. |

A real HTTP server is also required — ES modules and custom elements do not load over `file://`.

---

## Step 1 — Install the package

```bash
npm install @aegov/designsystem
```

The core package has exactly one runtime dependency, `@stencil/core`. Nothing else is pulled in.

---

## Step 2 — Set up your build tool

Pick the section that matches your project. Every option ends at the same place: a compiled stylesheet plus a module that calls `defineCustomElements()`.

### Vite

```bash
npm install -D @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

```ts
// src/main.ts
import './styles.css';
import { defineCustomElements } from '@aegov/designsystem/loader';

defineCustomElements();
```

### Webpack

```bash
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin \
  css-loader style-loader postcss-loader @tailwindcss/postcss postcss
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

```js
// src/index.js
import './styles.css';
import { defineCustomElements } from '@aegov/designsystem/loader';

defineCustomElements();
```

```html
<!-- src/index.html -->
<!doctype html>
<html lang="en">
  <body>
    <aegov-button variant="primary" size="lg">Submit application</aegov-button>
  </body>
</html>
```

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: { filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  devServer: { port: 8080 },
};
```

```bash
npx webpack serve
```

`HtmlWebpackPlugin` injects the built `<script>` into the page for you — there's no manual `<script src>` to add. If your `package.json` has `"type": "commonjs"` (the `npm init -y` default), remove that field; webpack otherwise refuses to parse the `import` statements in `src/index.js`.

### Parcel

Parcel picks up PostCSS automatically when a config file is present.

```bash
npm install -D parcel @tailwindcss/postcss postcss
```

```json
// .postcssrc.json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="./src/styles.css" />
  </head>
  <body>
    <aegov-button variant="primary" size="lg">Submit application</aegov-button>
    <script type="module">
      import { defineCustomElements } from '@aegov/designsystem/loader';
      defineCustomElements();
    </script>
  </body>
</html>
```

```bash
npx parcel index.html          # dev server
npx parcel build index.html    # production build
```

If `npm init -y` gave you a `"main": "index.js"` field in `package.json`, delete it — Parcel treats a project with `main` set as a library target and refuses to serve it.

### Rollup

```bash
npm install -D rollup rollup-plugin-postcss @tailwindcss/postcss postcss @rollup/plugin-node-resolve
```

Add `"type": "module"` to `package.json` — the config below uses `import`, not `require`.

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

```js
// src/main.js
import './styles.css';
import { defineCustomElements } from '@aegov/designsystem/loader';

defineCustomElements();
```

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import tailwindcssPostcss from '@tailwindcss/postcss';

export default {
  input: 'src/main.js',
  output: { dir: 'dist', format: 'es' },
  plugins: [
    resolve(),
    postcss({
      plugins: [tailwindcssPostcss()],
      extract: 'styles.css',
    }),
  ],
};
```

`output.dir` (not `output.file`) is what lets Rollup code-split the loader's per-component chunks into separate files in `dist/` — the same lazy-loading behaviour as the other bundlers. Build with `npx rollup -c`, then link `dist/main.js` as a module and `dist/styles.css` from an HTML page in the same way as the other methods.

### PostCSS CLI (no bundler)

`@tailwindcss/postcss` resolves the three `@import` lines on its own, including the `@aegov/designsystem/...` specifiers — no import-resolution plugin needed.

```bash
npm install -D @tailwindcss/postcss postcss postcss-cli
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

```bash
npx postcss src/styles.css -o dist/styles.css
```

With no bundler, there's also no build step to rewrite a bare `import '@aegov/designsystem/loader'`, so this method skips the loader entirely and instead loads the pre-built, self-registering bundle by path — the same file the [CDN](#cdn-prototyping-only) method loads from unpkg, just from your own `node_modules`:

```html
<link rel="stylesheet" href="dist/styles.css" />

<aegov-button variant="primary" size="lg">Submit application</aegov-button>

<script type="module" src="./node_modules/@aegov/designsystem/dist/aegov/aegov.esm.js"></script>
```

No `defineCustomElements()` call — this bundle registers every `aegov-*` tag as soon as it loads. Serve the project root (not just a `public/` subfolder) so `node_modules` is reachable, e.g. `npx serve .`.

### CDN (prototyping only)

For a quick sandbox you can skip the build entirely and use the pre-built bundle from unpkg. Note that this path gives you the **components** but not a Tailwind build, so utility classes in your own markup will not work and the design tokens come only from what the components themselves carry.

```html
<script type="module" src="https://unpkg.com/@aegov/designsystem/dist/aegov/aegov.esm.js"></script>

<aegov-button variant="primary">Submit</aegov-button>
```

Use a real build for anything you intend to ship.

---

## The three CSS imports

Order matters. Tailwind first, then `base`, then `theme`.

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

| Import | Resolves to | What it gives you |
| --- | --- | --- |
| `tailwindcss` | Tailwind v4 | The `theme`, `base`, `components`, `utilities` layers. |
| `@aegov/designsystem/base` | `dist/global/global.css` | `@font-face` rules for Roboto, Inter, Noto Kufi Arabic and Alexandria; element resets; heading scale; global `<a>` and `<button>` styling; the `.aegov-container` and `.aegov-skip-content` component classes. |
| `@aegov/designsystem/theme` | `dist/styles/tailwind.css` | The `@theme` block — every colour, font, type-scale and breakpoint token, plus the explicit cascade-layer order and the `dark` custom variant. |

Both design system files are wrapped in cascade layers, and the declared order is:

```css
@layer theme, base, components, aegov-internals, utilities;
```

Because `utilities` comes last, your own Tailwind utility classes always win over the design system's element-level styling. You do not need `!important` to override a global `<a>` or heading style.

---

## Step 3 — Register the components

`defineCustomElements()` registers every `aegov-*` tag with the browser using lazy loading: one small loader runs immediately, and each component's implementation is fetched only when a matching tag first appears in the DOM.

```ts
import { defineCustomElements } from '@aegov/designsystem/loader';

defineCustomElements();
```

Call it once, as early as possible. It is safe to call more than once — later calls are no-ops.

### Alternative — tree-shakeable individual imports

If you want to bundle only the components you use and skip the lazy-loading runtime, import each component's `defineCustomElement` directly. This is the path the framework wrappers take internally.

```ts
import { defineCustomElement as defineButton } from '@aegov/designsystem/components/aegov-button.js';
import { defineCustomElement as defineInput } from '@aegov/designsystem/components/aegov-input.js';

defineButton();
defineInput();
```

Trade-off: nothing is lazy-loaded, so everything you import lands in your main bundle. Prefer the loader unless bundle composition is a hard requirement.

### Package entry points

| Specifier | Purpose |
| --- | --- |
| `@aegov/designsystem` | Types, and the loader (`.` re-exports `./loader`). |
| `@aegov/designsystem/loader` | `defineCustomElements()` — lazy registration of all components. |
| `@aegov/designsystem/components` | Tree-shakeable custom-element classes and per-component `defineCustomElement`. |
| `@aegov/designsystem/base` | Global stylesheet (fonts, resets, container). |
| `@aegov/designsystem/theme` | Tailwind `@theme` design tokens. |

---

## Step 4 — Use a component

Drop any `aegov-*` tag into your markup. No further registration is needed.

```html
<body class="bg-whitely-100">
  <main class="aegov-container py-10">
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input field-id="email" type="email" placeholder="name@example.ae"></aegov-input>
    </aegov-form-field>

    <aegov-button variant="primary" size="lg">Submit application</aegov-button>
  </main>
</body>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input field-id="install-email" type="email" placeholder="name@example.ae"></aegov-input>
    </aegov-form-field>
    <div class="mt-4">
      <aegov-button variant="primary" size="lg">Submit application</aegov-button>
    </div>
  </div>
</div>

`.aegov-container` is a global utility from the `base` stylesheet — a centred, max-width `1536px` wrapper with responsive horizontal padding. Use it for page-level layout.

---

## Setting properties

Every property has a kebab-case attribute form for markup and a camelCase JavaScript property for runtime updates.

```html
<aegov-button variant="primary" appearance="solid" size="lg" is-disabled>
  Submit
</aegov-button>
```

```js
const btn = document.querySelector('aegov-button');

btn.isLoading = true;      // camelCase property, not the attribute
btn.isDisabled = true;
```

Two rules worth internalising early, because they apply across the whole library:

- **Booleans are `is*` prefixed** — `is-disabled`, `is-required`, `is-open`, `is-invalid`, `is-loading`. As HTML attributes they follow normal boolean-attribute semantics: present means `true`. Prefer bare `is-disabled` over `is-disabled="true"`.
- **`variant` is colour, `appearance` is style.** `variant` selects the semantic colour (`primary`, `secondary`, `neutral-max`, `neutral-min`, and `danger` on actions). `appearance` selects the visual treatment (`solid`, `outline`, `soft`, `link` on actions; `soft` / `solid` on badges and callouts; and so on per family).

### Reserved names

A few natural names collide with native HTML attributes, so the design system uses alternatives:

| Instead of | Use | On |
| --- | --- | --- |
| `id` | `field-id` | All components (auto-generated when omitted) |
| `class` | `extra-class` | Components that expose an extra-class hook |
| `prefix` / `suffix` | `addon-prefix` / `addon-suffix` | `aegov-input-group` |

---

## Responsive properties

Most components accept a Tailwind-style responsive string on `size` — and on a few other properties such as `cols` on `aegov-bento-grid` and `ratio` on `aegov-aspect-ratio`. The first token is the base value; each `breakpoint:value` segment takes over at that breakpoint and above.

```html
<aegov-button size="sm md:base xl:lg">Adapts to the viewport</aegov-button>
<aegov-bento-grid cols="1 md:2 lg:4"></aegov-bento-grid>
```

Available breakpoint prefixes:

| Prefix | Min width |
| --- | --- |
| `xs` | 480px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Resolution happens at runtime through `matchMedia`, so the value updates live as the viewport changes — no reload, no page-level media queries of your own. Invalid tokens and unknown breakpoints are ignored silently rather than throwing.

---

## Listening to events

Components emit native `CustomEvent`s, always named `aegov` + component + action. Read the payload from `event.detail`.

```html
<aegov-input field-id="emirates-id" name="emiratesId"></aegov-input>
<aegov-button id="submit" variant="primary">Submit</aegov-button>

<script type="module">
  const input = document.querySelector('#emirates-id');
  const button = document.querySelector('#submit');

  input.addEventListener('aegovInputChange', (e) => {
    console.log(e.detail.value);
  });

  button.addEventListener('aegovButtonClick', async () => {
    button.isLoading = true;
    try {
      await submitApplication();
    } finally {
      button.isLoading = false;
    }
  });
</script>
```

Every component's exact event names and detail shapes are listed in the **API Reference** section of its own page.

---

## Calling methods

Components with imperative APIs expose them as async methods on the element. Await them, or ignore the returned promise.

```js
const modal = document.querySelector('aegov-modal');
await modal.show();

const form = document.querySelector('aegov-input[name="email"]');
const result = await form.validate('manual');
console.log(result.valid);
```

---

## Dark mode

The theme ships a class-based dark variant:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Add `dark` to the root element and every component — plus your own `dark:` utilities — switches together.

```html
<html class="dark">
```

```js
// Persisted toggle
const root = document.documentElement;
const stored = localStorage.getItem('theme');
if (stored === 'dark' || (!stored && matchMedia('(prefers-color-scheme: dark)').matches)) {
  root.classList.add('dark');
}

document.querySelector('#theme-toggle').addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
```

There is no `media` strategy — the design system deliberately requires the class so that an application can offer an explicit user-facing preference, which UAE government services generally need.

---

## Right-to-left

Set `dir="rtl"` and the whole system flips: layout uses logical properties throughout, and the `base` stylesheet swaps the body and heading font stacks to Noto Kufi Arabic and Alexandria automatically.

```html
<html lang="ar" dir="rtl">
```

You can also scope direction to a subtree, which is useful for bilingual pages:

```html
<div dir="rtl">
  <aegov-button variant="primary">إرسال الطلب</aegov-button>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div dir="rtl">
    <aegov-form-field>
      <aegov-label>البريد الإلكتروني</aegov-label>
      <aegov-input field-id="install-email-rtl" type="email" placeholder="name@example.ae"></aegov-input>
    </aegov-form-field>
    <div class="mt-4">
      <aegov-button variant="primary" size="lg">إرسال الطلب</aegov-button>
    </div>
  </div>
</div>

Each component page has its own **RTL Support** section covering anything specific to that component.

---

## Skip-to-content

The `base` stylesheet provides `.aegov-skip-content`, a visually hidden link that becomes visible on focus. `aegov-header` portals one to the top of `<body>` for you; add your own if you are not using the header.

```html
<a href="#main" class="aegov-skip-content">Skip to main content</a>
<main id="main" tabindex="-1">…</main>
```

---

## Optional — schema-driven validation

Every form component already carries a complete validation surface with no extra dependency: `is-invalid`, `error-message`, `hint`, an `aegovValidate` event and `validate()` / `setCustomValidity()` methods. See [Validation Surface](validation-overview.html).

If you would rather drive that surface from a schema, there is an **optional** companion package. It is not required, and nothing in the design system depends on it.

```bash
npm install @aegov/designsystem-validation valibot
```

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Enter a valid email address')),
});

createForm(document.querySelector('#application'), schema, valibotAdapter(), {
  onValidSubmit: (values) => api.submit(values),
});
```

---

## Troubleshooting

### Components render unstyled

The CSS was not compiled. Check DevTools → Elements → `:root` for `--color-primary-600`. If the token is missing, the three `@import` lines never went through Tailwind — most often because the stylesheet is linked directly instead of being processed by the build, or `@tailwindcss/postcss` / `@tailwindcss/vite` is missing from the build config.

### Components render as plain text

The loader never ran. Check the console for module resolution errors, confirm `defineCustomElements()` executes before the tags are used (or, on the no-bundler PostCSS CLI path, that the `aegov.esm.js` `<script>` tag itself loaded without a 404), and confirm you are on `http://` or `https://` rather than `file://`.

### `Failed to fetch .../p-xxxxxxx.entry.js`

Lazy-loaded component chunks are fetched relative to `aegov.esm.js`. Do not rename, flatten, or partially copy `dist/aegov/` — ship the folder as-is.

### Utility classes have no effect on component internals

Components using shadow DOM — `aegov-button`, `aegov-modal`, `aegov-drawer`, `aegov-header`, `aegov-header-banner` — isolate their internals. Utility classes on the host apply to the host only. Use the documented properties, or the exposed `part` names where a component provides them.

### Works in Chrome, breaks in Safari

Check the Safari version. `aegov-otp`, `aegov-fileupload`, `aegov-select` in listbox mode and `aegov-datepicker` are form-associated custom elements and need Safari 16.4 or newer.

### Property set in JavaScript has no effect

Set the camelCase **property**, not the attribute, for runtime changes: `el.isLoading = true`, not `el.setAttribute('isLoading', 'true')`. Attribute names are kebab-case; property names are camelCase.

---

## Where to next

- [Using with React](using-with-react.html) — typed wrappers, `onAegov*` handlers, refs, SSR notes.
- [Using with Vue](using-with-vue.html) — the Vue plugin, kebab-case templates, typed proxy components.
- [Using with Angular](using-with-angular.html) — `provideDesignSystem()`, `DesignSystemModule`, camelCase inputs, NG8008.
- [Validation Surface](validation-overview.html) — the built-in `is-invalid` / `error-message` / `hint` contract.
- [Bring Your Own Validator](validation-byo.html) — manual validation with no extra package.
- Per-component pages in the left navigation — each lists properties, slots, events, methods, RTL notes and accessibility obligations.

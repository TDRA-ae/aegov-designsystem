# Installation

<p class="text-lg text-aeblack-500 mb-8">This page covers installing the AEGOV Design System in a plain HTML project. The design system ships as <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components</a> — every <code>aegov-*</code> tag works in any HTML page once the CSS and JavaScript are loaded. <strong>Tailwind CSS v4 is required.</strong> Pick your build tool below for a full setup guide. If you are using React, Vue, or Angular see the framework-specific guides in the left navigation.</p>

---

## Step 1 — Install the package

```bash
npm install @aegov/designsystem-testing
```

---

## Step 2 — Set up your build tool

### Vite

**Install the Tailwind v4 Vite plugin:**

```bash
npm install -D @tailwindcss/vite
```

**Add the plugin to `vite.config.ts`:**

```ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**Create a CSS entry file (e.g. `src/styles.css`):**

```css
@import "tailwindcss";
@import "@aegov/designsystem-testing/theme";
@import "@aegov/designsystem-testing/base";
```

**Import both the CSS and the JS loader in your entry file (e.g. `src/main.ts`):**

```ts
import './styles.css';
import { defineCustomElements } from '@aegov/designsystem-testing/loader';

defineCustomElements();
```

---

### Webpack

**Install the required packages:**

```bash
npm install -D css-loader style-loader postcss-loader @tailwindcss/postcss postcss
```

**Add a CSS rule to `webpack.config.js`:**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

**Create `postcss.config.js` at the project root:**

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**Create a CSS entry file (e.g. `src/styles.css`):**

```css
@import "tailwindcss";
@import "@aegov/designsystem-testing/theme";
@import "@aegov/designsystem-testing/base";
```

**Import both in your JS entry file (e.g. `src/index.js`):**

```js
import './styles.css';
import { defineCustomElements } from '@aegov/designsystem-testing/loader';

defineCustomElements();
```

---

### Parcel

Parcel picks up PostCSS automatically when a `postcss.config.js` is present.

**Install the Tailwind PostCSS plugin:**

```bash
npm install -D @tailwindcss/postcss postcss
```

**Create `postcss.config.js` at the project root:**

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**Create a CSS entry file (e.g. `src/styles.css`):**

```css
@import "tailwindcss";
@import "@aegov/designsystem-testing/theme";
@import "@aegov/designsystem-testing/base";
```

**Reference both in your HTML entry file:**

```html
<link rel="stylesheet" href="./src/styles.css" />
<script type="module">
  import { defineCustomElements } from '@aegov/designsystem-testing/loader';
  defineCustomElements();
</script>
```

---

### Rollup

**Install the required packages:**

```bash
npm install -D rollup-plugin-postcss @tailwindcss/postcss postcss @rollup/plugin-node-resolve
```

**Configure `rollup.config.js`:**

```js
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/main.js',
  output: { file: 'dist/bundle.js', format: 'iife' },
  plugins: [
    resolve(),
    postcss({
      plugins: [require('@tailwindcss/postcss')()],
      extract: 'dist/styles.css',
    }),
  ],
};
```

**Create a CSS entry file (e.g. `src/styles.css`):**

```css
@import "tailwindcss";
@import "@aegov/designsystem-testing/theme";
@import "@aegov/designsystem-testing/base";
```

**Import both in your JS entry file (e.g. `src/main.js`):**

```js
import './styles.css';
import { defineCustomElements } from '@aegov/designsystem-testing/loader';

defineCustomElements();
```

---

### PostCSS standalone (CLI)

**Install the required packages:**

```bash
npm install -D @tailwindcss/postcss postcss postcss-cli postcss-import
```

**Create `postcss.config.js` at the project root:**

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {},
  },
};
```

**Create a CSS entry file (e.g. `src/styles.css`):**

```css
@import "tailwindcss";
@import "@aegov/designsystem-testing/theme";
@import "@aegov/designsystem-testing/base";
```

**Build the CSS:**

```bash
npx postcss src/styles.css -o dist/styles.css
```

**Reference both in your HTML:**

```html
<link rel="stylesheet" href="dist/styles.css" />
<script type="module">
  import { defineCustomElements } from '@aegov/designsystem-testing/loader';
  defineCustomElements();
</script>
```

---

## Step 3 — Use a component

Drop any `aegov-*` tag into your HTML. No `customElements.define` call needed beyond the `defineCustomElements()` you already added — the loader handles registration automatically:

```html
<body class="bg-aeblack-50 p-8">
  <main class="aegov-container">
    <aegov-button variant="primary">Submit application</aegov-button>
    <aegov-input field-id="email" placeholder="Enter your email"></aegov-input>
  </main>
</body>
```

---

## Setting props

Pass props as kebab-case HTML attributes for the initial render:

```html
<aegov-button variant="primary" appearance="solid" size="lg" is-disabled="true">
  Submit
</aegov-button>
```

For runtime state changes, set them as JavaScript properties (camelCase):

```js
const btn = document.querySelector('aegov-button');
btn.isLoading = true;
btn.isDisabled = true;
```

---

## Listening to events

Every component fires native `CustomEvent`s prefixed with `aegov`:

```js
const input = document.querySelector('aegov-input');
input.addEventListener('aegovInputChange', (e) => {
  console.log(e.detail.value);
});

const button = document.querySelector('aegov-button');
button.addEventListener('aegovButtonClick', async () => {
  button.isLoading = true;
  await submitForm();
  button.isLoading = false;
});
```

Event names for every component are listed on each component's docs page.

---

## Troubleshooting

### Component renders unstyled

CSS custom properties are missing. Verify your build processed all three `@import` lines and that the output CSS is linked in your HTML. Check DevTools → Elements → `:root` — you should see `--color-primary-600` and other AEGOV tokens listed.

### Component renders as plain text

The JS loader did not run. Check DevTools → Console for module errors. Make sure `defineCustomElements()` is called before the component is used, and that the dev server is running (custom elements require a real HTTP server — `file://` does not work).

### `Failed to fetch …entry.js` errors

The lazy-loaded per-component chunks must be served from the same folder as `aegov.esm.js`. Do not move or rename files inside `dist/aegov/` — the chunks are fetched relative to the loader.

### Components work in Chrome but not Safari

Safari ≥ 16.4 is required. The design system relies on `ElementInternals` and form-associated custom elements — older Safari lacks these.

---

## Where to next

- [Using with React](using-with-react.html) — typed React wrappers, JSX props, typed event handlers, refs.
- [Using with Vue](using-with-vue.html) — Vue 3 plugin, kebab-case template syntax, typed events.
- [Using with Angular](using-with-angular.html) — `DesignSystemModule`, `provideDesignSystem()`, camelCase props, NG8008 notes.
- [Validation Surface](validation-overview.html) — unified `isInvalid` / `errorMessage` / `hint` API across all form components.
- Per-component docs in the left navigation — every page lists props, events, methods, and accessibility notes.

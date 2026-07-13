# Using with Vue

<p class="text-lg text-aeblack-500 mb-8">The AEGOV Design System ships first-class Vue 3 wrappers for every component. They auto-generate from the Stencil web components and give you typed props, typed event handlers, and standard Vue template ergonomics — no manual <code>customElements.define</code> calls needed. This page walks through installing the Vue package, wiring its global styles, and using components in a Vue 3 app.</p>

## What you install

| Package | Purpose |
| --- | --- |
| `@aegov/designsystem` | The web components — Stencil bundles, CSS, and types. Required at runtime. |
| `@aegov/designsystem-vue` | Vue 3 wrappers. Registers all custom elements automatically via a Vue plugin. |

---

## Step 1 — Install the packages

```bash
npm install @aegov/designsystem @aegov/designsystem-vue
```

---

## Step 2 — Register the Vue plugin

Register the plugin once in your app entry file. This calls `defineCustomElements()` automatically — no manual registration needed anywhere else.

```ts
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { ComponentLibrary } from '@aegov/designsystem-vue';

createApp(App)
  .use(ComponentLibrary)
  .mount('#app');
```

---

## Step 3 — Import the styles

Add all three imports to your main CSS file. Order matters — Tailwind first, then `base` (component styles and fonts), then `theme` (design tokens):

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

Then import the CSS file in your entry file (before the plugin registration):

```ts
// src/main.ts
import { createApp } from 'vue';
import './styles.css';
import App from './App.vue';
import { ComponentLibrary } from '@aegov/designsystem-vue';

createApp(App)
  .use(ComponentLibrary)
  .mount('#app');
```

---

## Step 4 — Use a component

Drop any `aegov-*` tag directly into your Vue template — no per-component import needed. The plugin registered everything in Step 2.

```vue
<template>
  <aegov-button variant="primary" @aegov-button-click="handleClick">
    Submit application
  </aegov-button>
</template>

<script setup lang="ts">
function handleClick(e: CustomEvent) {
  console.log('clicked', e.detail);
}
</script>
```

---

## Props and attributes

In Vue templates, use **kebab-case attributes** — the same as plain HTML:

```vue
<aegov-input
  field-id="email"
  placeholder="Enter your email"
  is-required="true"
  @aegov-input-change="onChange"
/>
```

---

## Events

Component events are fired as native CustomEvents. In Vue templates, listen with `@aegov-*` (kebab-case):

```vue
<aegov-select
  @aegov-select-change="onSelectChange"
  @aegov-select-open="onOpen"
/>

<aegov-checkbox
  @aegov-checkbox-change="onCheckboxChange"
/>
```

Event detail is available on `event.detail`:

```ts
function onSelectChange(e: CustomEvent) {
  console.log(e.detail.value);
}
```

---

## Tabs — important note

`tab-id` and `tabId` both work in Vue templates since Vue passes unknown attributes to the DOM directly:

```vue
<aegov-tabs default-open="overview">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
  <aegov-tab-panel tab-id="overview">Overview content</aegov-tab-panel>
  <aegov-tab-panel tab-id="details">Details content</aegov-tab-panel>
</aegov-tabs>
```

---

## Full example — a form with input and button

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <aegov-input
      field-id="name"
      placeholder="Full name"
      :value="name"
      @aegov-input-change="name = $event.detail.value"
    />
    <aegov-button type="submit" variant="primary" :is-loading="isLoading">
      Submit
    </aegov-button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const isLoading = ref(false);

async function handleSubmit() {
  isLoading.value = true;
  try {
    await fetch('/api/submit', { method: 'POST', body: JSON.stringify({ name: name.value }) });
  } finally {
    isLoading.value = false;
  }
}
</script>
```

---

## TypeScript

Import types from the core package:

```ts
import type { Components } from '@aegov/designsystem/components';

const variant: Components.AegovButton['variant'] = 'primary';
```

---

## Where to next

- [Validation Surface](validation-overview.html) — unified `isInvalid` / `errorMessage` / `hint` API across all form components.
- [Bring Your Own Validator](validation-byo.html) — manual validation patterns with no external library.
- Per-component docs in the left navigation — every page lists props, events, methods, and accessibility notes.

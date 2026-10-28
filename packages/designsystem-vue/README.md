# AEGOV Design System for Vue

Vue 3 support for the UAE Government Design System web components ([`@aegov/designsystem`](https://www.npmjs.com/package/@aegov/designsystem)): a plugin that registers every `aegov-*` element, and one typed component per element. Requires Vue 3.5 or later.

## Installation

```bash
npm install @aegov/designsystem @aegov/designsystem-vue
```

**Tailwind CSS v4 is required in your project.** Add three imports to your CSS entry (for example `src/style.css`), in this order:

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

## Setup

Install the plugin, and mount the app once `defineDesignSystem()` resolves. The plugin registers every `aegov-*` element and runs the design system's global script, which creates the toast live region and `window.aegovToast`. Elements register asynchronously: waiting before `mount()` lets the first render set props on registered elements.

```ts
// main.ts
import { createApp } from 'vue';
import { ComponentLibrary, defineDesignSystem } from '@aegov/designsystem-vue';
import App from './App.vue';
import './style.css';

defineDesignSystem().then(() => {
  createApp(App).use(ComponentLibrary).mount('#app');
});
```

Tell Vue's template compiler that `aegov-*` tags are custom elements:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('aegov-') },
      },
    }),
  ],
});
```

## Usage

### Custom element tags

Write the tags as in HTML. Attributes are kebab-case. Listen to events by their camelCase name: `@aegov-button-click` never fires.

```vue
<template>
  <aegov-input field-id="email" type="email" name="email" is-required />
  <aegov-button variant="primary" size="lg" @aegovButtonClick="submit">
    Submit application
  </aegov-button>
</template>

<script setup lang="ts">
function submit() {}
</script>
```

### Typed components

Each typed component registers its own element, so it needs neither the plugin nor `isCustomElement`, and sets its props on the first render. Props and events are type-checked by `vue-tsc`.

```vue
<template>
  <AegovInput fieldId="email" type="email" name="email" v-model="email" />
  <AegovCheckbox fieldId="terms" name="terms" label="I accept the terms" v-model="accepted" />
  <AegovButton variant="primary" size="lg" @aegovButtonClick="submit">
    Submit application
  </AegovButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AegovButton, AegovCheckbox, AegovInput } from '@aegov/designsystem-vue';

const email = ref('');
const accepted = ref(false);
function submit() {}
</script>
```

`v-model` binds `value` on `AegovInput`, `AegovTextarea`, `AegovSelect`, `AegovOtp`, `AegovRange` and `AegovDatepicker`, and `isChecked` on `AegovCheckbox`, `AegovToggle` and `AegovRadio`. An app that uses only typed components and doesn't install the plugin has no toast live region.

## Documentation

The full guide, including Nuxt and server-side rendering, is *Using with Vue* on the documentation site: [designsystem.gov.ae](https://designsystem.gov.ae).

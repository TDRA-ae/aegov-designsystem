# Using with Vue

<p class="text-lg text-aeblack-500 mb-8">The AEGOV Design System ships Vue 3 support in two forms: a plugin that registers every custom element so you can write <code>aegov-*</code> tags directly in templates, and a set of generated typed component proxies for when you want prop autocompletion. This page covers installing the Vue package, wiring the stylesheet, both usage styles, and the Vue-specific details that catch people out — chiefly that <code>v-model</code> is not supported.</p>

## Introduction

Two packages, both required:

| Package | Role |
| --- | --- |
| `@aegov/designsystem` | The web components — implementations, CSS and TypeScript types. Required at runtime. |
| `@aegov/designsystem-vue` | The `ComponentLibrary` Vue plugin plus generated typed component proxies. |

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

```vue
<template>
  <aegov-button variant="primary" @aegov-button-click="submit">
    Submit application
  </aegov-button>
</template>
```

The plugin's `install()` calls `defineCustomElements()` for you, so every tag is available everywhere — no per-component import, no registration in individual `.vue` files.

---

## Step 1 — Install

```bash
npm install @aegov/designsystem @aegov/designsystem-vue
```

Vue 3.5 or newer is what the package is built and tested against. Vue 2 is not supported.

---

## Step 2 — Set up Tailwind and the stylesheet

The design system ships **source** CSS, so Tailwind v4 must run in your project.

```bash
npm install -D @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Tell Vue that aegov-* tags are custom elements, not Vue components.
          isCustomElement: (tag) => tag.startsWith('aegov-'),
        },
      },
    }),
    tailwindcss(),
  ],
});
```

That `isCustomElement` line matters. Vue's template compiler treats an unknown hyphenated tag as a Vue component and logs a `Failed to resolve component: aegov-button` warning for every one it finds. Declaring the prefix as a custom element removes the warnings and lets Vue set values as DOM properties rather than string attributes. Skip it only if you exclusively use the typed proxies described below.

Create the stylesheet — Tailwind first, then `base`, then `theme`:

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

Import it in your entry file before registering the plugin, as shown in the Introduction.

---

## Step 3 — Use a component

### Option A — custom element tags (recommended)

Write the HTML tag. Attributes are kebab-case, exactly as in plain HTML.

```vue
<template>
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input field-id="email" type="email" placeholder="name@example.ae" />
    </aegov-form-field>

    <aegov-button variant="primary" size="lg" class="mt-4">Continue</aegov-button>
  </div>
</template>
```

### Option B — typed proxies

The package also generates a proxy component per tag, named `Aegov` + PascalCase. Import them when you want camelCase props with editor autocompletion.

```vue
<template>
  <AegovFormField>
    <AegovLabel>Email address</AegovLabel>
    <AegovInput fieldId="email" type="email" placeholder="name@example.ae" />
  </AegovFormField>
</template>

<script setup lang="ts">
import { AegovFormField, AegovLabel, AegovInput } from '@aegov/designsystem-vue';
</script>
```

Both styles render the same custom element and behave identically at runtime. Mixing them in one project is fine.

---

## Props and attributes

In templates, prefer kebab-case attributes. For anything that is not a plain string, bind it so Vue passes a real value rather than a string:

```vue
<template>
  <!-- Strings — plain attributes are fine -->
  <aegov-input field-id="email" type="email" placeholder="Enter your email" />

  <!-- Booleans and numbers — bind them -->
  <aegov-input :is-required="true" :is-disabled="isLocked" />
  <aegov-pagination :pages="totalPages" :page-current="page" />

  <!-- Responsive size string -->
  <aegov-button size="sm md:base xl:lg">Adapts to the viewport</aegov-button>
</template>
```

### Bind booleans, do not stringify them

`is-required="false"` sets the *string* `"false"`, which is truthy — the flag ends up enabled. Always bind booleans:

```vue
<!-- Wrong: always required -->
<aegov-input is-required="false" />

<!-- Correct -->
<aegov-input :is-required="false" />
<aegov-input :is-required="isFieldRequired" />
```

### camelCase also works on raw tags

Vue passes unknown attributes straight through to the DOM, so `tabId` and `tab-id` both reach the element. Kebab-case is the recommended default for consistency with the rest of the documentation, but you will not break anything by using camelCase on a raw tag.

---

## Events

Components emit native `CustomEvent`s. In templates, listen with the kebab-cased name prefixed by `@aegov-`. The payload is on `event.detail`.

```vue
<template>
  <aegov-input @aegov-input-change="onChange" @aegov-input-blur="touched = true" />

  <aegov-select
    @aegov-select-change="onSelectChange"
    @aegov-select-open="isOpen = true"
    @aegov-select-close="isOpen = false"
  />

  <aegov-badge is-dismissible @aegov-badge-dismiss="removeFilter(id)" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SelectChangeDetail } from '@aegov/designsystem';

const touched = ref(false);
const isOpen = ref(false);

function onChange(e: CustomEvent<{ value: string; event: Event }>) {
  console.log(e.detail.value);
}

function onSelectChange(e: CustomEvent<SelectChangeDetail>) {
  console.log(e.detail.value, e.detail.label);
}
</script>
```

The mapping from event name to template listener is mechanical: `aegovInputChange` becomes `@aegov-input-change`, `aegovDatepickerMonthChange` becomes `@aegov-datepicker-month-change`.

---

## `v-model` is not supported

The generated proxies are built without a model binding, so `v-model` on an `aegov-*` component does nothing. Bind the value and listen for the change event instead — the two-line equivalent:

```vue
<template>
  <!-- Does not work -->
  <aegov-input v-model="email" />

  <!-- Correct -->
  <aegov-input :value="email" @aegov-input-change="email = $event.detail.value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref('');
</script>
```

If you want `v-model` ergonomics, wrap the component once in your own app:

```vue
<!-- AeInput.vue -->
<template>
  <aegov-input :value="modelValue" @aegov-input-change="emit('update:modelValue', $event.detail.value)" />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits<{ 'update:modelValue': [string] }>();
</script>
```

```vue
<AeInput v-model="email" />
```

---

## Template refs and imperative methods

Refs give you the underlying custom element. Component methods are async.

```vue
<template>
  <aegov-button @aegov-button-click="modal?.show()">Review submission</aegov-button>

  <aegov-modal ref="modal" label="Confirm submission">
    <p>Submit your application for review?</p>
    <aegov-button variant="primary" @aegov-button-click="modal?.close()">Confirm</aegov-button>
  </aegov-modal>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

const modal = useTemplateRef<HTMLAegovModalElement>('modal');
</script>
```

On Vue versions without `useTemplateRef`, the classic form works the same way:

```ts
import { ref } from 'vue';
const modal = ref<HTMLAegovModalElement | null>(null);
```

For form components, `validate()` and `setCustomValidity()` are the ones you will use most:

```ts
const result = await emiratesId.value?.validate('manual');
if (!result?.valid) emiratesId.value?.focus();
```

---

## Tabs and other required identifiers

`aegov-tab` and `aegov-tab-panel` pair up by `tab-id`. Both spellings resolve in Vue templates:

```vue
<template>
  <aegov-tabs default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">Documents</aegov-tab>

    <aegov-tab-panel tab-id="overview">Application overview</aegov-tab-panel>
    <aegov-tab-panel tab-id="documents">Uploaded documents</aegov-tab-panel>
  </aegov-tabs>
</template>
```

Note the `slot="tabs"` attribute — it assigns the triggers to the tab strip. Slot assignment on custom elements uses the plain `slot` attribute, not Vue's `<template #name>` syntax, because these are native slots rather than Vue slots.

---

## Composite example — service application step

```vue
<template>
  <form class="max-w-lg" @submit.prevent="onSubmit">
    <aegov-callout v-if="failed" variant="error" class="mb-6">
      We could not submit your application. Please try again.
    </aegov-callout>

    <aegov-form-field>
      <aegov-label>Emirates ID</aegov-label>
      <aegov-input
        ref="emiratesId"
        field-id="emirates-id"
        name="emiratesId"
        :is-required="true"
        hint="15 digits, as printed on your card"
        :value="form.emiratesId"
        @aegov-input-change="form.emiratesId = $event.detail.value"
      />
    </aegov-form-field>

    <aegov-form-field>
      <aegov-label>Emirate of residence</aegov-label>
      <aegov-select
        name="emirate"
        appearance="listbox"
        :is-required="true"
        placeholder="Select an emirate"
        @aegov-select-change="form.emirate = $event.detail.value"
      >
        <aegov-select-option value="AZ">Abu Dhabi</aegov-select-option>
        <aegov-select-option value="DU">Dubai</aegov-select-option>
        <aegov-select-option value="SH">Sharjah</aegov-select-option>
      </aegov-select>
    </aegov-form-field>

    <aegov-checkbox
      name="terms"
      :is-required="true"
      label="I confirm the information provided is accurate"
      @aegov-checkbox-change="form.terms = $event.detail.checked"
    />

    <aegov-button
      type="submit"
      variant="primary"
      size="lg"
      class="mt-6"
      :is-loading="isSubmitting"
      :is-disabled="isSubmitting"
    >
      Submit application
    </aegov-button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue';

const form = reactive({ emiratesId: '', emirate: '', terms: false });
const isSubmitting = ref(false);
const failed = ref(false);
const emiratesId = useTemplateRef<HTMLAegovInputElement>('emiratesId');

async function onSubmit() {
  const result = await emiratesId.value?.validate('submit');
  if (!result?.valid) {
    emiratesId.value?.focus();
    return;
  }

  isSubmitting.value = true;
  failed.value = false;
  try {
    await api.submitApplication({ ...form });
  } catch {
    failed.value = true;
  } finally {
    isSubmitting.value = false;
  }
}
</script>
```

Because the components participate in native form submission, you can also skip the reactive object entirely and read `new FormData(formEl)` on submit.

---

## TypeScript

Token and payload types come from the core package:

```ts
import type {
  ButtonVariant,
  ButtonAppearance,
  InputType,
  SelectChangeDetail,
  AegovValidationDetail,
} from '@aegov/designsystem';

const variant: ButtonVariant = 'primary';

function onValidate(e: CustomEvent<AegovValidationDetail<string>>) {
  console.log(e.detail.value, e.detail.validity, e.detail.trigger);
}
```

The `Components` namespace exposes a component's full prop interface, which is the cleanest way to type a wrapper of your own:

```ts
import type { Components } from '@aegov/designsystem';

const size: Components.AegovInput['size'] = 'lg';
type InputProps = Components.AegovInput;
```

---

## RTL support

Set `dir` on the document or on a subtree and everything flips, including the body and heading font stacks.

```vue
<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'" :lang="locale">
    <aegov-button variant="primary">
      {{ locale === 'ar' ? 'إرسال الطلب' : 'Submit application' }}
    </aegov-button>
  </div>
</template>
```

If locale is switchable at runtime, set it on the document element rather than only on a wrapper. Portal-based components — toast, dropdown, popover, datepicker — render into `document.body`, outside your Vue tree, so they inherit direction from the document:

```ts
import { watchEffect } from 'vue';

watchEffect(() => {
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = locale.value;
});
```

---

## Server-side rendering and Nuxt

Custom elements are browser-only. Under Nuxt or any SSR setup, register the plugin on the client only and render the components client-side.

```ts
// plugins/aegov.client.ts   ← the .client suffix keeps it out of the server bundle
import { ComponentLibrary } from '@aegov/designsystem-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ComponentLibrary);
});
```

Wrap usage in `<ClientOnly>` where a component must not be server-rendered:

```vue
<template>
  <ClientOnly>
    <aegov-datepicker name="appointment" />
  </ClientOnly>
</template>
```

The stylesheet import is SSR-safe and should stay in your global CSS so the first paint is styled.

Also add the `isCustomElement` compiler option to your Nuxt config so the server-side compiler agrees with the client:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('aegov-'),
    },
  },
});
```

---

## Validation

Form components ship the validation surface described in [Validation Surface](validation-overview.html): `is-invalid`, `error-message` and `hint` props, `error` and `hint` slots, the `aegovValidate` event, and `validate()` / `setCustomValidity()` methods.

Driving it from Vue state needs nothing extra:

```vue
<template>
  <aegov-input
    name="email"
    type="email"
    :is-invalid="!!error"
    :error-message="error"
    @aegov-validate="onValidate"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AegovValidationDetail } from '@aegov/designsystem';

const error = ref('');

function onValidate(e: CustomEvent<AegovValidationDetail<string>>) {
  if (e.detail.trigger !== 'blur') return;
  const ok = /\S+@\S+\.\S+/.test(String(e.detail.value));
  error.value = ok ? '' : 'Enter a valid email address';
}
</script>
```

### Optional — `@aegov/designsystem-validation`

For schema-driven forms there is an **optional** companion package with a Vue composable. Nothing in the design system requires it.

```bash
npm install @aegov/designsystem-validation valibot
```

```vue
<template>
  <form ref="formRef" @submit="handleSubmit((values) => api.login(values))">
    <aegov-input name="email" type="email" />
    <aegov-input name="password" type="password" :is-revealable="true" />
    <aegov-button type="submit" :is-disabled="!isValid">Sign in</aegov-button>
  </form>
</template>

<script setup lang="ts">
import { useAegovForm } from '@aegov/designsystem-validation/vue';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Enter a valid email address')),
  password: v.pipe(v.string(), v.minLength(8, 'At least 8 characters')),
});

const { formRef, handleSubmit, errors, isValid } = useAegovForm({
  schema,
  adapter: valibotAdapter(),
  mode: 'onBlur',
});
</script>
```

`errors` and `isValid` are refs; `values` inside `handleSubmit` is typed from the schema.

---

## Common gotchas

### `v-model` silently does nothing

Covered above — bind `:value` and listen for the change event, or write a thin wrapper component.

### Missing `isCustomElement` produces resolution warnings

`Failed to resolve component: aegov-button` in the console means the compiler option is absent. The components still work, but Vue sets everything as string attributes rather than properties, which makes non-string props unreliable.

### String booleans are truthy

`is-disabled="false"` disables the component. Bind booleans with `:`.

### Native slots use the `slot` attribute

`<aegov-tab slot="tabs">`, not `<template #tabs>`. These are shadow/scoped DOM slots on a custom element, not Vue slots.

### Do not call `defineCustomElements()` yourself

The plugin already does it. A second call is harmless but redundant.

### Portal components leave your Vue tree

Toast, dropdown, popover and datepicker move content into `document.body`. Template refs to the host still work; queries scoped to your component's root will not find the portalled content.

---

## Where to next

- [Installation](installation.html) — build tool configuration, dark mode, the CSS layer model.
- [Using with React](using-with-react.html) and [Using with Angular](using-with-angular.html).
- [Validation Surface](validation-overview.html) — the full form contract.
- [Bring Your Own Validator](validation-byo.html) — manual patterns, no extra package.

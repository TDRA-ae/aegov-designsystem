# Using with React

<p class="text-lg text-aeblack-500 mb-8">The AEGOV Design System ships first-class React wrappers for every component. They auto-generate from the Stencil web components and give you typed props, typed event handlers, refs, and standard JSX ergonomics — no <code>customElements.define</code> calls, no kebab-case attribute juggling, no event listener boilerplate. This page walks through installing the React package, wiring its global styles, and dropping a real <code>aegov-button</code> into a React app end to end.</p>

## What you install

There are two npm packages:

| Package | Purpose |
| --- | --- |
| `@aegov/design-system` | The web components themselves — Stencil bundles, CSS, and types. Required at runtime. |
| `@aegov/design-system-react` | React wrappers + TypeScript types. Imports the web component classes from the core package and registers each one's custom element on first render. |

The React package depends on the core package as a peer — install both.

---

## Step 1 — Install the packages

```bash
npm install @aegov/design-system @aegov/design-system-react
```

Or with yarn / pnpm:

```bash
yarn add @aegov/design-system @aegov/design-system-react
pnpm add @aegov/design-system @aegov/design-system-react
```

If your project already uses React 18+, no extra peer dependencies are needed. For React 16.8–17, the wrappers still work — they target React's stable hooks API.

---

## Step 2 — Import the design system stylesheet

The component appearance comes from the design system's compiled CSS. Import it once at the root of your app — typically in your entry file or root layout component.

```ts
// src/main.tsx (Vite)  or  src/index.tsx (CRA)
import '@aegov/design-system/css';
```

If you're on Next.js App Router:

```tsx
// app/layout.tsx
import '@aegov/design-system/css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

The stylesheet ships compiled OKLCH colors, font tokens, and component styles. No additional setup, no Tailwind configuration needed in your consumer app.

---

## Step 3 — Add a Tailwind theme (optional)

If you're already using Tailwind CSS v4 in your React project and you want the design system's colors / fonts as Tailwind utilities (`bg-primary-600`, `text-aered-700`, etc.), import the theme:

```css
/* src/styles.css */
@import "@aegov/design-system/theme";
```

Skip this step if you only need the component styles.

---

## Step 4 — Use a component

Import the React wrapper and render it like any other component. Props are typed; events are camelCase `onAegov*` handlers.

```tsx
// src/App.tsx
import { AegovButton } from '@aegov/design-system-react';

export default function App() {
  return (
    <div className="p-6">
      <AegovButton onAegovButtonClick={(e) => console.log('clicked', e)}>
        Submit application
      </AegovButton>
    </div>
  );
}
```

That's it. The wrapper:

1. Registers the `<aegov-button>` custom element on first render.
2. Renders the underlying `<aegov-button>` tag.
3. Forwards all React props as kebab-case HTML attributes / DOM properties.
4. Adapts native CustomEvents into typed React handlers (`onAegovButtonClick`, etc.).

---

## Full example — a "Submit application" button with loading state

This component shows the typical patterns: typed props, ref to the underlying element, typed event handlers, and a loading state controlled by React state.

```tsx
import { useRef, useState } from 'react';
import { AegovButton } from '@aegov/design-system-react';
import type { HTMLAegovButtonElement } from '@aegov/design-system';

export function SubmitApplicationButton() {
  const ref = useRef<HTMLAegovButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/submit', { method: 'POST' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AegovButton
      ref={ref}
      variant="primary"
      appearance="solid"
      size="lg"
      isLoading={isLoading}
      isDisabled={isLoading}
      onAegovButtonClick={handleSubmit}
    >
      Submit application
    </AegovButton>
  );
}
```

Notes on the example:

- `variant` / `appearance` / `size` are typed string-union props — your editor autocompletes them.
- `isLoading` swaps the button content for a spinner while keeping width stable.
- `onAegovButtonClick` is a `CustomEvent<MouseEvent>` typed handler — no manual `addEventListener`.
- `ref` gives direct access to the underlying `<aegov-button>` HTMLElement — useful for calling imperative methods or focusing.

---

## Available components

Every web component has a corresponding React wrapper. The most-used ones for forms:

```ts
import {
  AegovButton,
  AegovInput,
  AegovTextarea,
  AegovSelect,
  AegovSelectOption,
  AegovCheckbox,
  AegovRadio,
  AegovRadioGroup,
  AegovToggle,
  AegovRange,
  AegovOtp,
  AegovFileupload,
  AegovDatepicker,
  AegovFormField,
  AegovLabel,
} from '@aegov/design-system-react';
```

Layout / surface components (cards, modals, drawers, navigation, banners, toasts) are imported the same way — see the per-component docs in the left navigation.

---

## TypeScript

All wrappers are fully typed. Import payload types from `@aegov/design-system`:

```tsx
import type {
  AegovValidationDetail,
  ButtonVariant,
  InputType,
} from '@aegov/design-system';

const variant: ButtonVariant = 'primary';

function onValidate(e: CustomEvent<AegovValidationDetail<string>>) {
  console.log(e.detail.value, e.detail.validity);
}
```

---

## Validation in React

Form components ship a unified validation surface — `isInvalid`, `errorMessage`, `hint` props, `onAegovValidate` event, plus imperative `validate()` and `setCustomValidity()` methods. The full reference is in [Validation Surface](validation-overview.html). For schema-driven validation (Valibot / Zod / Vest) using a typed React hook, install the optional add-on:

```bash
npm install @aegov/designsystem-validation valibot
```

Quick example:

```tsx
import { useAegovForm } from '@aegov/designsystem-validation/react';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import { AegovInput, AegovButton } from '@aegov/design-system-react';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
});

export function LoginForm() {
  const { formRef, handleSubmit, isValid } = useAegovForm({
    schema,
    adapter: valibotAdapter(),
  });
  return (
    <form ref={formRef} onSubmit={handleSubmit((values) => api.login(values))}>
      <AegovInput name="email" type="email" />
      <AegovButton type="submit" isDisabled={!isValid}>Sign in</AegovButton>
    </form>
  );
}
```

---

## Common gotchas

### Props are camelCase, not kebab-case

Web components accept `field-id`, `is-disabled`, etc. as HTML attributes — but the React wrapper exposes them as camelCase props.

```tsx
// ✅ React wrapper — camelCase props
<AegovInput fieldId="email" isDisabled={true} />

// ❌ This won't work — kebab-case is for raw HTML
<AegovInput field-id="email" is-disabled={true} />
```

### Boolean props must be explicit

Pass booleans as JSX boolean attributes, not strings:

```tsx
<AegovButton isDisabled={true}>Disabled</AegovButton>
<AegovButton isDisabled>Also disabled</AegovButton>
<AegovButton isDisabled="true">Wrong — this is a string</AegovButton>
```

### Use `onAegov*` for component events; `onClick` for native ones

Component custom events are camelCased with the `onAegov` prefix:

```tsx
<AegovButton onAegovButtonClick={(e) => /* CustomEvent<MouseEvent> */}>Go</AegovButton>
<AegovInput onAegovValidate={(e) => /* CustomEvent<AegovValidationDetail> */} />
```

Use the standard React `onClick` for the bubbling native click event if all you need is the click coordinate — but most aegov components emit a richer custom event with structured detail. Prefer the `onAegov*` handler.

### `class` vs `className`

JSX uses `className`. The wrapper forwards it correctly:

```tsx
<AegovButton className="my-button-class">Go</AegovButton>
```

### Refs return the custom element

`ref` gives you the underlying `HTMLAegovButtonElement` (etc.) — call its imperative methods directly:

```tsx
const ref = useRef<HTMLAegovButtonElement>(null);
// later
ref.current?.focus();
```

For form components: `ref.current?.validate('manual')` runs validation and emits `aegovValidate`.

---

## SSR / Next.js

The web components are client-side only — they rely on Custom Elements API which doesn't run in Node. Mark consumer pages or specific components as client-rendered:

```tsx
'use client';
import { AegovButton } from '@aegov/design-system-react';
```

Or wrap in `next/dynamic` with `{ ssr: false }`:

```tsx
import dynamic from 'next/dynamic';
const AegovButton = dynamic(
  () => import('@aegov/design-system-react').then((m) => m.AegovButton),
  { ssr: false },
);
```

The CSS import is SSR-safe and should stay in your root layout.

---

## Where to next

- [Validation Surface](validation-overview.html) — unified `isInvalid` / `errorMessage` / `hint` API across all form components.
- [Bring Your Own Validator](validation-byo.html) — manual validation patterns (no add-on package required).
- Per-component docs in the left navigation — every page lists props, events, methods, and accessibility notes.

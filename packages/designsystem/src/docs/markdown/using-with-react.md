# Using with React

<p class="text-lg text-aeblack-500 mb-8">The AEGOV Design System ships a typed React wrapper for every component. The wrappers are generated from the web components themselves, so props, events and refs stay in lockstep with the source — you get camelCase props, <code>onAegov*</code> event handlers, refs to the underlying element, and no <code>customElements.define</code> plumbing of your own. This page covers installing the React package, wiring the stylesheet, and the handful of conventions that differ from plain HTML.</p>

## Introduction

There are two packages, and you need both:

| Package | Role |
| --- | --- |
| `@aegov/designsystem` | The web components — implementations, CSS and TypeScript types. Required at runtime. |
| `@aegov/designsystem-react` | Thin React wrappers plus types. Registers each component's custom element the first time that wrapper renders. |

Because the wrappers register their own elements, **you never call `defineCustomElements()` in a React app**. Importing `AegovButton` is enough to define `<aegov-button>`.

```tsx
import { AegovButton } from '@aegov/designsystem-react';

export default function App() {
  return (
    <AegovButton variant="primary" onAegovButtonClick={() => console.log('clicked')}>
      Submit application
    </AegovButton>
  );
}
```

---

## Step 1 — Install

```bash
npm install @aegov/designsystem @aegov/designsystem-react
```

```bash
yarn add @aegov/designsystem @aegov/designsystem-react
```

```bash
pnpm add @aegov/designsystem @aegov/designsystem-react
```

React 18 or newer is expected. The wrappers use only the stable hooks API, so React 16.8–17 also work, but React 18+ is what the package is tested against.

---

## Step 2 — Set up Tailwind and the stylesheet

The design system ships **source** CSS, so your project must run Tailwind v4. For Vite:

```bash
npm install -D @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Create the stylesheet. Order matters — Tailwind first, then `base` (fonts, resets, global element styles), then `theme` (design tokens):

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

Import it once from your entry file:

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

For Create React App, Next.js or Remix the only difference is where the stylesheet import lives — see [Installation](installation.html) for Webpack and PostCSS configurations.

---

## Step 3 — Use a component

Every tag has a wrapper named `Aegov` + PascalCase:

| Tag | Import |
| --- | --- |
| `<aegov-button>` | `AegovButton` |
| `<aegov-input>` | `AegovInput` |
| `<aegov-form-field>` | `AegovFormField` |
| `<aegov-select-option>` | `AegovSelectOption` |
| `<aegov-header-banner>` | `AegovHeaderBanner` |

```tsx
import { AegovFormField, AegovLabel, AegovInput, AegovButton } from '@aegov/designsystem-react';

export function ContactStep() {
  return (
    <div className="max-w-md">
      <AegovFormField>
        <AegovLabel>Email address</AegovLabel>
        <AegovInput fieldId="email" type="email" placeholder="name@example.ae" />
      </AegovFormField>

      <AegovButton variant="primary" size="lg" className="mt-4">
        Continue
      </AegovButton>
    </div>
  );
}
```

Each wrapper does four things: registers its custom element, renders the underlying tag, forwards props to DOM properties, and adapts the component's `CustomEvent`s into React handler props.

**If your app server-renders** (Next.js, Remix, or similar), see [Server-side rendering and Next.js](#server-side-rendering-and-nextjs) before using this example.

---

## Props — camelCase, not kebab-case

Plain HTML uses kebab-case attributes. The React wrappers expose the camelCase property names instead.

```tsx
{/* Correct */}
<AegovInput fieldId="email" isRequired isDisabled={false} />

{/* Wrong — kebab-case is for raw HTML only */}
<AegovInput field-id="email" is-required />
```

| HTML attribute | React prop |
| --- | --- |
| `field-id` | `fieldId` |
| `is-disabled` | `isDisabled` |
| `is-required` | `isRequired` |
| `is-invalid` | `isInvalid` |
| `error-message` | `errorMessage` |
| `default-open` | `defaultOpen` |
| `addon-prefix` | `addonPrefix` |
| `label-nav` | `labelNav` |

### Booleans

Pass real booleans — the prop types are `boolean`, so TypeScript rejects a string value at compile time:

```tsx
<AegovButton isDisabled>Disabled</AegovButton>
<AegovButton isDisabled={true}>Disabled</AegovButton>
<AegovButton isDisabled={isSubmitting}>Conditional</AegovButton>

{/* Type error — string is not assignable to boolean */}
<AegovButton isDisabled="false">Caught by TypeScript</AegovButton>
```

If you bypass the type system (plain JS, or an untyped value from an external source), you do not get the naive HTML footgun where any non-empty string is truthy: the underlying custom element treats the literal string `"false"` as `false`. Prefer a real boolean regardless — it is the only form TypeScript accepts.

### `className`, not `class`

JSX conventions apply; the wrapper forwards `className` to the host element correctly.

```tsx
<AegovButton className="mt-4 w-full sm:w-auto">Submit</AegovButton>
```

Components that expose an `extraClass` property accept it as a prop too — that one targets an inner element rather than the host, and each component page documents which.

### Responsive size strings

`size` still takes the responsive string form; it is just a string prop.

```tsx
<AegovButton size="sm md:base xl:lg">Adapts to the viewport</AegovButton>
```

---

## Events — `onAegov*` handlers

Component events arrive as camelCased props with an `onAegov` prefix, typed as `CustomEvent` handlers. Read the payload from `event.detail`.

```tsx
<AegovInput
  name="emiratesId"
  onAegovInputChange={(e) => setValue(e.detail.value)}
  onAegovInputBlur={() => setTouched(true)}
/>

<AegovSelect onAegovSelectChange={(e) => console.log(e.detail.value, e.detail.label)} />

<AegovBadge isDismissible onAegovBadgeDismiss={() => removeFilter(id)} />
```

Native React events still work where the DOM emits them — `onClick`, `onFocus`, `onKeyDown` — but prefer the `onAegov*` handler whenever one exists, because it carries structured detail that the native event does not.

```tsx
{/* Rich detail — preferred */}
<AegovButton onAegovButtonClick={(e) => track(e.detail)} />

{/* Bare DOM click — only if you genuinely need nothing more */}
<AegovButton onClick={() => track()} />
```

---

## Refs and imperative methods

`ref` gives you the underlying custom element, typed as `HTMLAegov*Element`. These types are declared globally by `@aegov/designsystem` — no import needed, just reference the name directly. Component methods are async.

```tsx
import { useRef } from 'react';
import { AegovModal, AegovButton } from '@aegov/designsystem-react';

export function ConfirmDialog() {
  const modal = useRef<HTMLAegovModalElement>(null);

  return (
    <>
      <AegovButton onAegovButtonClick={() => modal.current?.show()}>
        Review submission
      </AegovButton>

      <AegovModal ref={modal} label="Confirm submission">
        <p>Submit your application for review?</p>
        <AegovButton variant="primary" onAegovButtonClick={() => modal.current?.close()}>
          Confirm
        </AegovButton>
      </AegovModal>
    </>
  );
}
```

For form components, `validate()` and `setCustomValidity()` are the two you will reach for most:

```tsx
const input = useRef<HTMLAegovInputElement>(null);

const check = async () => {
  const result = await input.current?.validate('manual');
  if (!result?.valid) input.current?.focus();
};
```

---

## Controlled and uncontrolled inputs

The components own their internal value, so they behave like uncontrolled inputs by default. Passing `value` sets the initial value; keep your state in sync from the change event rather than expecting React to drive every keystroke.

```tsx
const [email, setEmail] = useState('');

<AegovInput
  name="email"
  type="email"
  value={email}
  onAegovInputChange={(e) => setEmail(e.detail.value)}
/>
```

For form submission you often do not need React state at all — the components participate in native `<form>` submission, so `new FormData(form)` returns everything:

```tsx
function ApplicationForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    api.submit(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <AegovInput name="fullName" isRequired />
      <AegovSelect name="emirate" appearance="listbox">
        <AegovSelectOption value="AZ">Abu Dhabi</AegovSelectOption>
        <AegovSelectOption value="DU">Dubai</AegovSelectOption>
      </AegovSelect>
      <AegovButton type="submit" variant="primary">Submit</AegovButton>
    </form>
  );
}
```

---

## Composite example — service application step

```tsx
import { useRef, useState } from 'react';
import {
  AegovFormField, AegovLabel, AegovInput, AegovSelect, AegovSelectOption,
  AegovCheckbox, AegovButton, AegovCallout,
} from '@aegov/designsystem-react';
import type { HTMLAegovInputElement } from '@aegov/designsystem';

export function ApplicationStep() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const emiratesId = useRef<HTMLAegovInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await emiratesId.current?.validate('submit');
    if (!result?.valid) {
      emiratesId.current?.focus();
      return;
    }

    setSubmitting(true);
    setFailed(false);
    try {
      await api.submitApplication(Object.fromEntries(new FormData(e.currentTarget)));
    } catch {
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg">
      {failed && (
        <AegovCallout variant="error" className="mb-6">
          We could not submit your application. Please try again.
        </AegovCallout>
      )}

      <AegovFormField>
        <AegovLabel>Emirates ID</AegovLabel>
        <AegovInput
          ref={emiratesId}
          fieldId="emirates-id"
          name="emiratesId"
          isRequired
          hint="15 digits, as printed on your card"
        />
      </AegovFormField>

      <AegovFormField>
        <AegovLabel>Emirate of residence</AegovLabel>
        <AegovSelect name="emirate" appearance="listbox" isRequired placeholder="Select an emirate">
          <AegovSelectOption value="AZ">Abu Dhabi</AegovSelectOption>
          <AegovSelectOption value="DU">Dubai</AegovSelectOption>
          <AegovSelectOption value="SH">Sharjah</AegovSelectOption>
        </AegovSelect>
      </AegovFormField>

      <AegovCheckbox
        name="terms"
        isRequired
        label="I confirm the information provided is accurate"
      />

      <AegovButton
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        className="mt-6"
      >
        Submit application
      </AegovButton>
    </form>
  );
}
```

---

## TypeScript

Component prop types come from the wrapper automatically — your editor autocompletes `variant`, `appearance`, `size` and the rest. Shared payload and token types are exported from the **core** package:

```tsx
import type {
  ButtonVariant,
  ButtonAppearance,
  InputType,
  SelectChangeDetail,
  AegovValidationDetail,
} from '@aegov/designsystem';

const variant: ButtonVariant = 'primary';
const appearance: ButtonAppearance = 'outline';

function onValidate(e: CustomEvent<AegovValidationDetail<string>>) {
  console.log(e.detail.value, e.detail.validity, e.detail.trigger);
}

function onSelect(e: CustomEvent<SelectChangeDetail>) {
  console.log(e.detail.value, e.detail.label);
}
```

The `HTMLAegov*Element` types used for refs (see [Refs and imperative methods](#refs-and-imperative-methods)) are declared globally rather than exported from the module — reference them by name with no import.

The `Components` namespace gives you a component's full prop interface when you need to build your own wrapper around one:

```tsx
import type { Components } from '@aegov/designsystem';

type MyButtonProps = Pick<Components.AegovButton, 'variant' | 'appearance' | 'size'>;
```

---

## RTL support

Direction is a DOM concern, so nothing React-specific is required — set `dir` on the document or on a subtree and the components flip, including the font stacks.

```tsx
export function Layout({ locale, children }: { locale: 'en' | 'ar'; children: React.ReactNode }) {
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      {children}
    </div>
  );
}
```

If you toggle locale at runtime, set it on `document.documentElement` so portal-based components — toast, dropdown, popover, datepicker, modal, and drawer — inherit it too, since they render into `document.body` rather than inside your React tree:

```tsx
useEffect(() => {
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = locale;
}, [locale]);
```

---

## Server-side rendering and Next.js

Custom elements are a browser API. On the server, a component has no implementation to run yet — its real markup only exists once the browser loads and upgrades it. That gap between the server-rendered placeholder and what the browser builds afterward is the source of the current limitation described below.

### Current limitation

Server-rendering design system components — in Next.js, Remix, or any other SSR framework — can currently produce a React hydration mismatch. This is a known limitation, not specific to any one component or to shadow-DOM components; it can affect any composition of more than a single component.

`'use client'` on its own does not avoid this — most SSR frameworks still render client components once on the server by default, so the mismatch can still happen. The reliable option today is to skip the server render entirely with a dynamic, client-only import:

```tsx
'use client';

import dynamic from 'next/dynamic';

const ContactStep = dynamic(
  () =>
    import('@aegov/designsystem-react').then((m) => {
      const { AegovFormField, AegovLabel, AegovInput, AegovButton } = m;
      return function ContactStep() {
        return (
          <div className="max-w-md">
            <AegovFormField>
              <AegovLabel>Email address</AegovLabel>
              <AegovInput fieldId="email" type="email" placeholder="name@example.ae" />
            </AegovFormField>

            <AegovButton variant="primary" size="lg" className="mt-4">
              Continue
            </AegovButton>
          </div>
        );
      };
    }),
  { ssr: false },
);

export default function Page() {
  return <ContactStep />;
}
```

| Environment | Guidance |
| --- | --- |
| Client-only rendering (Vite, or any client-only React setup) | Fully supported — no server render step, so nothing to reconcile against. |
| Server-side rendering (Next.js, Remix, and similar) | Use a dynamic, `ssr: false` import for any non-trivial composition, as shown above. |

**We are aware of this limitation and are actively working on a fix at the design system level**, so that server-rendered frameworks will not require any special handling on your part. This section will be updated as that work progresses.

The **CSS import is SSR-safe** and belongs in your root layout — keep it there so the first paint is styled:

```tsx
// app/layout.tsx
import './globals.css'; // contains the three @import lines

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## Validation

Form components ship the validation surface described in [Validation Surface](validation-overview.html): `isInvalid`, `errorMessage` and `hint` props, `error` and `hint` slots, an `onAegovValidate` handler, and `validate()` / `setCustomValidity()` methods.

Driving it from React state needs nothing extra:

```tsx
const [error, setError] = useState('');

<AegovInput
  name="email"
  type="email"
  isInvalid={!!error}
  errorMessage={error}
  onAegovValidate={(e) => {
    if (e.detail.trigger !== 'blur') return;
    const ok = /\S+@\S+\.\S+/.test(String(e.detail.value));
    setError(ok ? '' : 'Enter a valid email address');
  }}
/>
```

### Optional — `@aegov/designsystem-validation`

For schema-driven forms there is an **optional** companion package with a React hook. Nothing in the design system requires it.

```bash
npm install @aegov/designsystem-validation valibot
```

```tsx
import { useAegovForm } from '@aegov/designsystem-validation/react';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import { AegovInput, AegovButton } from '@aegov/designsystem-react';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Enter a valid email address')),
  password: v.pipe(v.string(), v.minLength(8, 'At least 8 characters')),
});

export function LoginForm() {
  const { formRef, handleSubmit, errors, isValid } = useAegovForm({
    schema,
    adapter: valibotAdapter(),
    mode: 'onBlur',
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit((values) => api.login(values))}>
      <AegovInput name="email" type="email" />
      <AegovInput name="password" type="password" isRevealable />
      <AegovButton type="submit" isDisabled={!isValid}>Sign in</AegovButton>
    </form>
  );
}
```

`values` is typed from the schema, and the hook writes `is-invalid` and `error-message` onto each component for you. Full reference: [Validation Surface](validation-overview.html).

---

## Common gotchas

### Do not call `defineCustomElements()`

The wrappers register their own elements. Calling the loader as well is harmless but pointless, and it pulls in the lazy-loading runtime you were avoiding by using the wrappers.

### `<AegovButton>` in a template string is not a component

In Angular and Vue templates you write the HTML tag. In React you write the wrapper. Do not mix them:

```tsx
{/* Correct in React */}
<AegovButton variant="primary">Submit</AegovButton>

{/* Works, but you lose typing and the onAegov* handlers */}
<aegov-button variant="primary">Submit</aegov-button>
```

### Children of shadow-DOM components still work

`aegov-button`, `aegov-modal`, `aegov-drawer`, the header components, `aegov-blockquote`, and every shadow-DOM form control (`aegov-input`, `aegov-select`, `aegov-checkbox`, `aegov-checkbox-group`, `aegov-radio`, `aegov-radio-group`, `aegov-textarea`, `aegov-toggle`, `aegov-range`, `aegov-otp`, `aegov-datepicker`, `aegov-fileupload`) use shadow DOM. React children are projected into slots as normal — but utility classes you put on children are styled by your app's CSS, not the component's, and you cannot restyle the component's internals from outside.

### `StrictMode` double-invokes effects

That is React, not the design system. Components are idempotent on re-registration, so double mounting in development is safe.

### Portal components render outside your React tree

Toast, dropdown, popover, datepicker, modal, and drawer move content into `document.body`. React refs to the host still work, but do not expect `document.querySelector` inside a React container to find the portalled content.

---

## Where to next

- [Installation](installation.html) — build tool configuration, dark mode, the CSS layer model.
- [Using with Vue](using-with-vue.html) and [Using with Angular](using-with-angular.html).
- [Validation Surface](validation-overview.html) — the full form contract.
- [Bring Your Own Validator](validation-byo.html) — manual patterns, no extra package.

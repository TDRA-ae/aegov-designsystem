# AEGOV Design System for React

React wrappers for the UAE Government Design System web components ([`@aegov/designsystem`](https://www.npmjs.com/package/@aegov/designsystem)): one typed component per element, with camelCase props, `onAegov*` event handlers and refs to the underlying element. Supports React 18 and 19.

> **Moving from `@aegov/design-system-react` (v1.x)?** That package is deprecated. This package is its replacement, and moving to it is a **breaking change**: the package name, component names, props and setup are all different. Review and update your code before switching.

## Installation

```bash
npm install @aegov/designsystem @aegov/designsystem-react
```

**Tailwind CSS v4 is required in your project.** Add three imports to your CSS entry (for example `src/styles.css`), in this order, and import that file once from your entry point:

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

## Usage

Import the wrappers a component uses. Each wrapper registers its own custom element the first time it renders, so there is nothing else to set up: do not call `defineCustomElements()` in a React app.

```tsx
import { AegovButton, AegovFormField, AegovInput, AegovLabel } from '@aegov/designsystem-react';

export function ContactStep() {
  return (
    <form>
      <AegovFormField>
        <AegovLabel>Email address</AegovLabel>
        <AegovInput fieldId="email" type="email" name="email" isRequired />
      </AegovFormField>

      <AegovButton type="submit" variant="primary" size="lg" onAegovButtonClick={() => console.log('submitted')}>
        Submit application
      </AegovButton>
    </form>
  );
}
```

Every tag has a wrapper named `Aegov` + PascalCase: `<aegov-select-option>` is `AegovSelectOption`.

- **Props** use the camelCase property names (`fieldId`, `isRequired`, `errorMessage`) and are type-checked. Pass real booleans: `isDisabled={false}`.
- **Classes:** use `className`, not `class`. Some components also have an `extraClass` prop; check each component's API.
- **Events** are `onAegov*` handler props typed as `CustomEvent`s. Read the payload from `event.detail`:

  ```tsx
  <AegovInput fieldId="email" onAegovInputChange={(e) => setEmail(e.detail.value)} />
  ```

- **Refs** give you the underlying element, typed as `HTMLAegov*Element`. These types are declared globally by `@aegov/designsystem`, so they need no import. Component methods are async:

  ```tsx
  const modal = useRef<HTMLAegovModalElement>(null);
  // ...
  await modal.current?.show();
  ```

## Server-side rendering

Components run in the browser only. In server-rendered apps (Next.js, Remix and similar), load components that use the design system with a client-only import, for example `next/dynamic` with `{ ssr: false }`. `'use client'` on its own is not enough. The CSS imports are safe on the server: keep them in your root layout.

## Documentation

The full guide, including controlled inputs, validation, RTL and every component's API, is *Using with React* on the documentation site: [designsystem.gov.ae](https://designsystem.gov.ae).

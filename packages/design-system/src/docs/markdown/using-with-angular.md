# Using with Angular

<p class="text-lg text-aeblack-500 mb-8">The AEGOV Design System ships first-class Angular wrappers for every component. They auto-generate from the Stencil web components and give you typed inputs, typed outputs, Angular change detection integration, and standard Angular template ergonomics. This page covers installation, setup for both standalone and module-based Angular apps, and common gotchas.</p>

## What you install

| Package | Purpose |
| --- | --- |
| `@aegov/design-system` | The web components — Stencil bundles, CSS, and types. Required at runtime. |
| `@aegov/design-system-angular` | Angular directive wrappers, `DesignSystemModule`, and `provideDesignSystem()`. |

---

## Step 1 — Install the packages

```bash
npm install @aegov/design-system @aegov/design-system-angular
```

---

## Step 2 — Add global styles

Add all three imports to your `src/styles.css`. Order matters — Tailwind first, then `base` (component styles and fonts), then `theme` (design tokens):

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/design-system/base";
@import "@aegov/design-system/theme";
```

Alternatively, add the compiled files directly in `angular.json`:

```json
"styles": [
  "node_modules/@aegov/design-system/dist/global/global.css",
  "node_modules/@aegov/design-system/dist/styles/tailwind.css",
  "src/styles.css"
]
```

---

## Step 3 — Initialize the design system

Choose the setup that matches your Angular app type.

### Standalone Angular (Angular 17+)

Add `provideDesignSystem()` to your `app.config.ts`. This registers all web components automatically before the app renders:

```ts
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDesignSystem } from '@aegov/design-system-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideDesignSystem()
  ]
};
```

### Module-based Angular

Import `DesignSystemModule` in your root `AppModule`. This registers all web components via `APP_INITIALIZER` and makes all directives available throughout the app:

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DesignSystemModule } from '@aegov/design-system-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DesignSystemModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## Step 4 — Use components

### Standalone Angular

Import each component directive where you use it:

```ts
import { Component } from '@angular/core';
import { AegovButton, AegovInput } from '@aegov/design-system-angular';

@Component({
  selector: 'app-root',
  imports: [AegovButton, AegovInput],
  template: `
    <aegov-input fieldId="name" placeholder="Full name" />
    <aegov-button variant="primary" (aegovButtonClick)="onSubmit($event)">
      Submit
    </aegov-button>
  `
})
export class AppComponent {
  onSubmit(e: CustomEvent) {
    console.log('submitted', e.detail);
  }
}
```

Or import `DesignSystemModule` once to get all components without listing them individually:

```ts
import { DesignSystemModule } from '@aegov/design-system-angular';

@Component({
  imports: [DesignSystemModule],
  template: `<aegov-button>Click me</aegov-button>`
})
export class AppComponent {}
```

### Module-based Angular

After adding `DesignSystemModule` to `AppModule`, all components are available everywhere — no per-component imports:

```ts
@Component({
  template: `
    <aegov-button variant="primary">Submit</aegov-button>
  `
})
export class MyComponent {}
```

---

## Props — use camelCase in Angular templates

Angular inputs use **camelCase**. Unlike plain HTML (which uses `kebab-case` attributes), Angular's template compiler resolves props by their camelCase input name:

```html
<!-- HTML / Vue / React -->
<aegov-input field-id="email" is-required="true" />

<!-- Angular — use camelCase -->
<aegov-input fieldId="email" [isRequired]="true" />
```

| HTML attribute | Angular input |
| --- | --- |
| `field-id` | `fieldId` |
| `is-disabled` | `isDisabled` |
| `is-required` | `isRequired` |
| `card-title` | `cardTitle` |
| `default-open` | `defaultOpen` |

> **Required inputs:** Some inputs are marked required by the component — Angular will throw a build error (`NG8008`) if you omit them or use the wrong case. Affected inputs: `tabId` on `<aegov-tab>` and `<aegov-tab-panel>`, `href` on `<aegov-link>`, `name` on `<aegov-radio-group>`.

---

## Events — use Angular output syntax

Bind to component events with Angular's `(eventName)` syntax:

```html
<aegov-button (aegovButtonClick)="onButtonClick($event)">Submit</aegov-button>

<aegov-input
  (aegovInputChange)="onInputChange($event)"
  (aegovValidate)="onValidate($event)"
/>

<aegov-select (aegovSelectChange)="onSelectChange($event)" />
```

---

## Tabs — use camelCase tabId

`tabId` is a required input on `<aegov-tab>` and `<aegov-tab-panel>`. Use camelCase in Angular templates:

```html
<!-- Angular -->
<aegov-tabs defaultOpen="overview">
  <aegov-tab slot="tabs" tabId="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tabId="details">Details</aegov-tab>
  <aegov-tab-panel tabId="overview">Overview content</aegov-tab-panel>
  <aegov-tab-panel tabId="details">Details content</aegov-tab-panel>
</aegov-tabs>
```

---

## Full example — a form with input and button

```ts
import { Component, signal } from '@angular/core';
import { AegovButton, AegovInput } from '@aegov/design-system-angular';

@Component({
  selector: 'app-contact-form',
  imports: [AegovButton, AegovInput],
  template: `
    <aegov-input
      fieldId="email"
      type="email"
      placeholder="Enter your email"
      [value]="email()"
      (aegovInputChange)="email.set($event.detail.value)"
    />
    <aegov-button
      variant="primary"
      [isLoading]="isLoading()"
      [isDisabled]="isLoading()"
      (aegovButtonClick)="onSubmit()"
    >
      Submit
    </aegov-button>
  `
})
export class ContactFormComponent {
  email = signal('');
  isLoading = signal(false);

  async onSubmit() {
    this.isLoading.set(true);
    try {
      await fetch('/api/submit', { method: 'POST' });
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

---

## TypeScript

Import types from the core package:

```ts
import type { Components } from '@aegov/design-system/components';

const variant: Components.AegovButton['variant'] = 'primary';
```

---

## Troubleshooting

### `NG8008: Required input 'tabId' must be specified`

You are using `tab-id` (kebab-case) instead of `tabId` (camelCase). Change to:
```html
<aegov-tab tabId="my-tab">...</aegov-tab>
<aegov-tab-panel tabId="my-tab">...</aegov-tab-panel>
```

### `Module has no exported member 'DesignSystemModule'`

You are using an older version of the Angular package (`< 0.2.1`). Update to the latest:
```bash
npm install @aegov/design-system-angular@latest
```

### Components render unstyled

The CSS is not loaded. Make sure `angular.json` has the styles entries from Step 2, or that `@import` lines are in `src/styles.css`.

---

## Where to next

- [Validation Surface](validation-overview.html) — unified `isInvalid` / `errorMessage` / `hint` API across all form components.
- [Bring Your Own Validator](validation-byo.html) — manual validation patterns with no external library.
- Per-component docs in the left navigation — every page lists props, events, methods, and accessibility notes.

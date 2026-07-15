# Using with Angular

<p class="text-lg text-aeblack-500 mb-8">The AEGOV Design System ships first-class Angular wrappers for every component. They auto-generate from the Stencil web components and give you typed inputs, typed outputs, Angular change detection integration, and standard Angular template ergonomics. This page covers installation, setup for both standalone and module-based Angular apps, and common gotchas.</p>

> **Requires Angular 19+.** The Angular wrappers are generated with `@stencil/angular-output-target` v1.x which targets Angular 19 and above.

---

## What you install

| Package | Purpose |
| --- | --- |
| `@aegov/designsystem` | The web components — Stencil bundles, CSS, and types. Required at runtime. |
| `@aegov/designsystem-angular` | Angular directive wrappers, `DesignSystemModule`, and `provideDesignSystem()`. |

---

## Step 1 — Install the packages

```bash
npm install @aegov/designsystem @aegov/designsystem-angular
```

---

## Step 2 — Set up Tailwind CSS

The design system ships source CSS that requires Tailwind v4 to compile.

### If you selected Tailwind during `ng new`

Angular CLI already installed `@tailwindcss/postcss`, created `postcss.config.json`, and added `@import "tailwindcss"` to `src/styles.css`. Just add the two design system imports after it:

```css
/* src/styles.css */
@import "tailwindcss";
@import "@aegov/designsystem/base";   /* ← add this */
@import "@aegov/designsystem/theme";  /* ← add this */
```

### If you did not select Tailwind during `ng new`

**Install Tailwind PostCSS:**

```bash
npm install -D @tailwindcss/postcss postcss
```

**Create `postcss.config.json` at the project root** (Angular reads this automatically):

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

**Add all three imports to `src/styles.css`:**

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

Order matters — Tailwind first, then `base` (component styles and fonts), then `theme` (design tokens).

---

## Step 3 — Initialize the design system

`provideDesignSystem()` registers all web components via Angular's `APP_INITIALIZER` — the same pattern used by Ionic. This ensures all `aegov-*` elements are defined in the browser before the app renders.

Choose the setup that matches your Angular app type.

### Standalone Angular (Angular 17+)

Add `provideDesignSystem()` to your `app.config.ts`:

```ts
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDesignSystem } from '@aegov/designsystem-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideDesignSystem()
  ]
};
```

### Module-based Angular

Import `DesignSystemModule` in your root `AppModule`:

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DesignSystemModule } from '@aegov/designsystem-angular';
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

You have two options for importing components into your Angular components.

### Option A — `DesignSystemModule` (all components at once)

Good for prototyping or when you use many components. Gives you all 50+ components without listing them individually:

```ts
import { Component } from '@angular/core';
import { DesignSystemModule } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-root',
  imports: [DesignSystemModule],
  template: `
    <aegov-button variant="primary">Submit</aegov-button>
    <aegov-badge color="success">Active</aegov-badge>
  `
})
export class AppComponent {}
```

### Option B — Individual imports (recommended for production)

Import only what you use. Better for tree-shaking and makes component dependencies explicit:

```ts
import { Component } from '@angular/core';
import { AegovButton, AegovBadge } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-root',
  imports: [AegovButton, AegovBadge],
  template: `
    <aegov-button variant="primary">Submit</aegov-button>
    <aegov-badge color="success">Active</aegov-badge>
  `
})
export class AppComponent {}
```

All components follow the same naming convention — `Aegov` + PascalCase:

| Tag | Import name |
| --- | --- |
| `<aegov-button>` | `AegovButton` |
| `<aegov-input>` | `AegovInput` |
| `<aegov-badge>` | `AegovBadge` |
| `<aegov-modal>` | `AegovModal` |
| `<aegov-select>` | `AegovSelect` |

Always use the **HTML tag** (`<aegov-button>`) in templates — never the class name (`<AegovButton>`).

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
import { AegovButton, AegovInput } from '@aegov/designsystem-angular';

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
import type { Components } from '@aegov/designsystem/components';

const variant: Components.AegovButton['variant'] = 'primary';
```

---

## Troubleshooting

### Components render unstyled

The CSS is not being processed. Check the following:

1. `src/styles.css` has the design system imports after `@import "tailwindcss"`:
```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```
2. If you did **not** select Tailwind during `ng new`, make sure `@tailwindcss/postcss` and `postcss` are installed and `postcss.config.json` exists at the project root:
```json
{ "plugins": { "@tailwindcss/postcss": {} } }
```

### `NG8008: Required input 'tabId' must be specified`

You are using `tab-id` (kebab-case) instead of `tabId` (camelCase). Change to:
```html
<aegov-tab tabId="my-tab">...</aegov-tab>
<aegov-tab-panel tabId="my-tab">...</aegov-tab-panel>
```

### `Module has no exported member 'DesignSystemModule'`

You are using an older version of the Angular package (`< 0.2.1`). Update to the latest:
```bash
npm install @aegov/designsystem-angular@latest
```

---

## Where to next

- [Validation Surface](validation-overview.html) — unified `isInvalid` / `errorMessage` / `hint` API across all form components.
- [Bring Your Own Validator](validation-byo.html) — manual validation patterns with no external library.
- Per-component docs in the left navigation — every page lists props, events, methods, and accessibility notes.

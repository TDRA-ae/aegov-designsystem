# Using with Angular

<p class="text-lg text-aeblack-500 mb-8">The AEGOV Design System ships generated Angular wrappers for every component — standalone components with typed inputs, typed outputs and <code>OnPush</code> change detection. This page covers installing the Angular package, configuring Tailwind under the Angular CLI, initialising the design system for both standalone and module-based apps, and the Angular-specific conventions: camelCase inputs, required inputs, and how form binding works today.</p>

## Introduction

Two packages, both required:

| Package | Role |
| --- | --- |
| `@aegov/designsystem` | The web components — implementations, CSS and TypeScript types. Required at runtime. |
| `@aegov/designsystem-angular` | Generated standalone component wrappers, the `DIRECTIVES` array, `DesignSystemModule` and `provideDesignSystem()`. |

Declared peer dependencies are `@angular/core` and `@angular/common` at **18.0.0 or newer**.

```ts
import { Component } from '@angular/core';
import { AegovButton } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-root',
  imports: [AegovButton],
  template: `
    <aegov-button variant="primary" (aegovButtonClick)="submit()">
      Submit application
    </aegov-button>
  `,
})
export class AppComponent {
  submit() { /* … */ }
}
```

---

## Step 1 — Install

```bash
npm install @aegov/designsystem @aegov/designsystem-angular
```

---

## Step 2 — Set up Tailwind

The design system ships **source** CSS, so Tailwind v4 must run in your build.

### If you selected Tailwind during `ng new`

The CLI already installed `@tailwindcss/postcss`, created `postcss.config.json`, and put `@import "tailwindcss"` in `src/styles.css`. Add the two design system imports after it:

```css
/* src/styles.css */
@import "tailwindcss";
@source "./**/*.{ts,html}";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

### If you did not select Tailwind during `ng new`

```bash
npm install -D @tailwindcss/postcss postcss
```

Create `postcss.config.json` at the project root — the Angular CLI picks it up automatically:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Then add all four lines to `src/styles.css` as shown above.

### Why `@source`

Tailwind v4 discovers the utility classes you use by scanning your source files. Under the Angular CLI the stylesheet is compiled from `src/styles.css`, so declare explicitly where your templates live:

```css
@source "./**/*.{ts,html}";
```

Without it, utilities used only inside inline `template:` strings or `.html` files may not be generated, and you will see classes present in the DOM with no matching CSS rule.

Import order matters: Tailwind first, then `base` (fonts, resets, global element styles), then `theme` (design tokens).

---

## Step 3 — Initialise the design system

The wrappers render the custom element tags but do not register them. Registration happens once at bootstrap, via an `APP_INITIALIZER` that calls `defineCustomElements()` — the same pattern Ionic uses. This guarantees every `aegov-*` element is defined before your first template renders.

### Standalone applications

```ts
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDesignSystem } from '@aegov/designsystem-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideDesignSystem(),
  ],
};
```

### Module-based applications

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DesignSystemModule } from '@aegov/designsystem-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DesignSystemModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

`DesignSystemModule` both registers the elements and re-exports every wrapper, so components declared in that module can use any `aegov-*` tag without further imports.

---

## Step 4 — Import the components you use

Every tag has a standalone wrapper named `Aegov` + PascalCase.

| Tag | Import |
| --- | --- |
| `<aegov-button>` | `AegovButton` |
| `<aegov-input>` | `AegovInput` |
| `<aegov-select>` | `AegovSelect` |
| `<aegov-form-field>` | `AegovFormField` |
| `<aegov-header-banner>` | `AegovHeaderBanner` |

### Option A — individual imports (recommended)

Explicit dependencies, best tree-shaking:

```ts
import { Component } from '@angular/core';
import { AegovFormField, AegovLabel, AegovInput, AegovButton } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-contact-step',
  imports: [AegovFormField, AegovLabel, AegovInput, AegovButton],
  template: `
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input fieldId="email" type="email" placeholder="name@example.ae" />
    </aegov-form-field>

    <aegov-button variant="primary" size="lg">Continue</aegov-button>
  `,
})
export class ContactStepComponent {}
```

### Option B — everything at once

For prototyping, `DesignSystemModule` brings in all wrappers, or import the `DIRECTIVES` array directly into a standalone component:

```ts
import { DIRECTIVES } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-kitchen-sink',
  imports: [...DIRECTIVES],
  template: `…`,
})
export class KitchenSinkComponent {}
```

Always use the **HTML tag** in templates (`<aegov-button>`), never the class name.

---

## Inputs — camelCase in templates

This is the main difference from plain HTML and Vue. Angular's template compiler resolves inputs by their declared name, and the generated wrappers declare them in camelCase.

```html
<!-- Plain HTML / Vue -->
<aegov-input field-id="email" is-required />

<!-- Angular -->
<aegov-input fieldId="email" [isRequired]="true" />
```

| HTML attribute | Angular input |
| --- | --- |
| `field-id` | `fieldId` |
| `is-disabled` | `isDisabled` |
| `is-required` | `isRequired` |
| `is-invalid` | `isInvalid` |
| `error-message` | `errorMessage` |
| `default-open` | `defaultOpen` |
| `addon-prefix` | `addonPrefix` |
| `label-nav` | `labelNav` |
| `page-current` | `pageCurrent` |

Bind anything that is not a literal string, so Angular passes a real value rather than the string form:

```html
<aegov-input [isRequired]="true" [isDisabled]="form.locked" />
<aegov-pagination [pages]="totalPages" [pageCurrent]="page" />
<aegov-button size="sm md:base xl:lg">Responsive size string</aegov-button>
```

### Required inputs

Four inputs are marked required by their components. Omitting one — or spelling it in kebab-case — is a compile-time error, `NG8008`.

| Component | Required input |
| --- | --- |
| `aegov-tab` | `tabId` |
| `aegov-tab-panel` | `tabId` |
| `aegov-link` | `href` |
| `aegov-radio-group` | `name` |

```html
<!-- NG8008: Required input 'tabId' from component AegovTab must be specified -->
<aegov-tab tab-id="overview">Overview</aegov-tab>

<!-- Correct -->
<aegov-tab tabId="overview">Overview</aegov-tab>
```

---

## Outputs — `(aegovEvent)` syntax

Component events are declared as Angular outputs, keeping the original event name. The `$event` you receive is the `CustomEvent`, so the payload is on `$event.detail`.

```html
<aegov-button (aegovButtonClick)="submit($event)">Submit</aegov-button>

<aegov-input
  (aegovInputChange)="email = $event.detail.value"
  (aegovInputBlur)="touched = true"
/>

<aegov-select (aegovSelectChange)="onEmirate($event)" />

<aegov-badge [isDismissible]="true" (aegovBadgeDismiss)="removeFilter(id)" />
```

```ts
import type { SelectChangeDetail } from '@aegov/designsystem';

onEmirate(e: CustomEvent<SelectChangeDetail>) {
  console.log(e.detail.value, e.detail.label);
}
```

---

## Template refs and imperative methods

Use `ElementRef` with `viewChild` to reach the underlying custom element. Methods are async.

```ts
import { Component, ElementRef, viewChild } from '@angular/core';
import { AegovModal, AegovButton } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-confirm',
  imports: [AegovModal, AegovButton],
  template: `
    <aegov-button (aegovButtonClick)="open()">Review submission</aegov-button>

    <aegov-modal #modal label="Confirm submission">
      <p>Submit your application for review?</p>
      <aegov-button variant="primary" (aegovButtonClick)="close()">Confirm</aegov-button>
    </aegov-modal>
  `,
})
export class ConfirmComponent {
  private modal = viewChild<ElementRef<HTMLAegovModalElement>>('modal');

  async open() { await this.modal()?.nativeElement.show(); }
  async close() { await this.modal()?.nativeElement.close(); }
}
```

For form components:

```ts
const result = await this.emiratesId()?.nativeElement.validate('manual');
if (!result?.valid) this.emiratesId()?.nativeElement.focus();
```

---

## Form binding

The components are web components with their own internal value, and they participate in **native** form submission. They are not yet wired into Angular's forms API.

### What works today

Bind the value in, listen for changes out — the same pattern as any custom element:

```ts
@Component({
  selector: 'app-application-form',
  imports: [AegovFormField, AegovLabel, AegovInput, AegovButton],
  template: `
    <form (submit)="onSubmit($event)">
      <aegov-form-field>
        <aegov-label>Emirates ID</aegov-label>
        <aegov-input
          fieldId="emirates-id"
          name="emiratesId"
          [isRequired]="true"
          hint="15 digits, as printed on your card"
          [value]="emiratesId()"
          (aegovInputChange)="emiratesId.set($event.detail.value)"
        />
      </aegov-form-field>

      <aegov-button type="submit" variant="primary" [isLoading]="isSubmitting()">
        Submit application
      </aegov-button>
    </form>
  `,
})
export class ApplicationFormComponent {
  emiratesId = signal('');
  isSubmitting = signal(false);

  async onSubmit(e: Event) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    this.isSubmitting.set(true);
    try {
      await this.api.submit(data);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
```

Because the controls submit natively, `new FormData(form)` is often all you need and you can skip per-field signals entirely.

### What is not supported yet

`[(ngModel)]` and `formControlName` do **not** bind to `aegov-*` components. There is no `ControlValueAccessor` bridge in the current release — the optional validation package ships the per-field CVA as an explicit stub slated for a later milestone. Do not reach for Reactive Forms bindings on these tags; use the value-in / event-out pattern above, or wrap a component in your own thin Angular component that implements `ControlValueAccessor` if you need Reactive Forms integration in the meantime.

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
  Components,
} from '@aegov/designsystem';

const variant: ButtonVariant = 'primary';
const size: Components.AegovInput['size'] = 'lg';

function onValidate(e: CustomEvent<AegovValidationDetail<string>>) {
  console.log(e.detail.value, e.detail.validity, e.detail.trigger);
}
```

---

## RTL support

Set `dir` on the document or a subtree. The components use logical properties throughout, and the `base` stylesheet switches the body and heading font stacks to Noto Kufi Arabic and Alexandria automatically.

```ts
@Component({
  selector: 'app-shell',
  template: `
    <div [attr.dir]="locale() === 'ar' ? 'rtl' : 'ltr'" [attr.lang]="locale()">
      <router-outlet />
    </div>
  `,
})
export class ShellComponent {
  locale = signal<'en' | 'ar'>('en');
}
```

When locale is switchable at runtime, set it on the document element as well. Portal-based components — toast, dropdown, popover, datepicker — render into `document.body`, outside your Angular component tree, and inherit direction from the document:

```ts
constructor(@Inject(DOCUMENT) private doc: Document) {
  effect(() => {
    this.doc.documentElement.dir = this.locale() === 'ar' ? 'rtl' : 'ltr';
    this.doc.documentElement.lang = this.locale();
  });
}
```

---

## Server-side rendering

Custom elements are browser-only. Under Angular SSR, `provideDesignSystem()` runs its initialiser on the client; guard any code that touches component methods with a platform check.

```ts
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
if (isBrowser) {
  await this.modal()?.nativeElement.show();
}
```

The global stylesheet is SSR-safe and should stay in `src/styles.css` so the server-rendered markup is styled on first paint.

---

## Validation

Form components ship the validation surface described in [Validation Surface](validation-overview.html): `isInvalid`, `errorMessage` and `hint` inputs, `error` and `hint` slots, the `aegovValidate` output, and `validate()` / `setCustomValidity()` methods.

Driving it from signals needs nothing extra:

```ts
@Component({
  imports: [AegovInput],
  template: `
    <aegov-input
      name="email"
      type="email"
      [isInvalid]="!!error()"
      [errorMessage]="error()"
      (aegovValidate)="onValidate($event)"
    />
  `,
})
export class EmailFieldComponent {
  error = signal('');

  onValidate(e: CustomEvent<AegovValidationDetail<string>>) {
    if (e.detail.trigger !== 'blur') return;
    const ok = /\S+@\S+\.\S+/.test(String(e.detail.value));
    this.error.set(ok ? '' : 'Enter a valid email address');
  }
}
```

### Optional — `@aegov/designsystem-validation`

For schema-driven forms there is an **optional** companion package with an Angular directive. Nothing in the design system requires it.

```bash
npm install @aegov/designsystem-validation valibot
```

It exposes a standalone `[aegovForm]` directive that you put on the `<form>` element. Valid submissions emit through `(submitValid)`, and the errors map through `(errorsChange)`.

```ts
import { AegovFormDirective } from '@aegov/designsystem-validation/angular';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Enter a valid email address')),
  password: v.pipe(v.string(), v.minLength(8, 'At least 8 characters')),
});

@Component({
  selector: 'app-login',
  imports: [AegovFormDirective, AegovInput, AegovButton],
  template: `
    <form [aegovForm]="{ schema, adapter, mode: 'onBlur' }" (submitValid)="login($event)">
      <aegov-input name="email" type="email" />
      <aegov-input name="password" type="password" [isRevealable]="true" />
      <aegov-button type="submit" variant="primary">Sign in</aegov-button>
    </form>
  `,
})
export class LoginComponent {
  schema = schema;
  adapter = valibotAdapter();

  login(values: { email: string; password: string }) { /* … */ }
}
```

The directive writes `isInvalid` and `errorMessage` back onto each component as the user interacts. Note that this is form-level orchestration — the per-field `ControlValueAccessor` bridge for Reactive Forms is not implemented in the current release.

---

## Troubleshooting

### Components render unstyled

Check, in order:

1. `src/styles.css` contains all four lines — `@import "tailwindcss"`, `@source`, `base`, `theme` — in that order.
2. `postcss.config.json` exists at the project root with `{ "plugins": { "@tailwindcss/postcss": {} } }`.
3. DevTools → Elements → `:root` lists `--color-primary-600`. If not, the design system CSS never went through Tailwind.

### `NG8008: Required input 'tabId' must be specified`

You wrote `tab-id` instead of `tabId`. Angular resolves inputs by camelCase name. Same applies to `href` on `aegov-link` and `name` on `aegov-radio-group`.

### `'aegov-button' is not a known element`

The wrapper is not imported into that component's `imports` array, or the module does not import `DesignSystemModule`. Note this is a template compile error and distinct from registration — importing the wrapper satisfies the compiler, and `provideDesignSystem()` handles the browser-side element definition.

### Components render as plain text

`provideDesignSystem()` or `DesignSystemModule` is missing from bootstrap. The wrappers render the tags; only the initialiser defines them.

### `Module has no exported member 'DesignSystemModule'`

An older version of the Angular package. Update:

```bash
npm install @aegov/designsystem-angular@latest
```

### A utility class in an inline template has no effect

Tailwind did not scan the file. Add or widen the `@source` glob in `src/styles.css`.

### `ngModel` on an aegov component does nothing

Expected — see [Form binding](#form-binding). Use value-in / event-out, or write your own `ControlValueAccessor` wrapper.

---

## Where to next

- [Installation](installation.html) — build tool configuration, dark mode, the CSS layer model.
- [Using with React](using-with-react.html) and [Using with Vue](using-with-vue.html).
- [Validation Surface](validation-overview.html) — the full form contract.
- [Bring Your Own Validator](validation-byo.html) — manual patterns, no extra package.

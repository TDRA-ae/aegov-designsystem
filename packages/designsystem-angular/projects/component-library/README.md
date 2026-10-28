# AEGOV Design System for Angular

Angular wrappers for the UAE Government Design System web components ([`@aegov/designsystem`](https://www.npmjs.com/package/@aegov/designsystem)): one standalone component per element, with typed inputs and outputs. Supports Angular 18 and later.

## Installation

```bash
npm install @aegov/designsystem @aegov/designsystem-angular
```

**Tailwind CSS v4 is required in your project.** Add three imports to `src/styles.css`, in this order:

```css
@import "tailwindcss";
@import "@aegov/designsystem/base";
@import "@aegov/designsystem/theme";
```

## Usage

Import the wrappers a component uses. Each wrapper registers its own element, so there is nothing else to set up:

```ts
import { Component } from '@angular/core';
import { AegovButton, AegovInput } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-signup',
  imports: [AegovButton, AegovInput],
  template: `
    <aegov-input fieldId="email" type="email" name="email" isRequired />
    <aegov-button variant="primary" size="lg" (aegovButtonClick)="submit()">
      Submit application
    </aegov-button>
  `,
})
export class SignupComponent {
  submit() {}
}
```

Inputs use the camelCase property names and are type-checked under `strictTemplates`. Boolean and number inputs also accept static attributes: `isRequired`, `isDisabled="false"`, `pages="5"`. Events are outputs named after the DOM event, such as `(aegovButtonClick)`.

### Global setup

Add `provideDesignSystem()` to the application's providers to run the design system's global script, which creates the toast live region and `window.aegovToast`. It also registers every `aegov-*` element, including ones you render without importing their wrapper. It loads the design system's lazy loader when the application starts. It is exported only from the `@aegov/designsystem-angular/provider` entry point, so an application that doesn't use it ships none of the loader's files.

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideDesignSystem } from '@aegov/designsystem-angular/provider';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...your existing providers
    provideDesignSystem(),
  ],
};
```

### NgModule applications

`DesignSystemModule` re-exports every wrapper and has no providers. Add `provideDesignSystem()` to the root module for the global setup:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DesignSystemModule } from '@aegov/designsystem-angular';
import { provideDesignSystem } from '@aegov/designsystem-angular/provider';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DesignSystemModule],
  providers: [provideDesignSystem()],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Documentation

The full guide, including server-side rendering and every component's API, is *Using with Angular* on the documentation site: [designsystem.gov.ae](https://designsystem.gov.ae).

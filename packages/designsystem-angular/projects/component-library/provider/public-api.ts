import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

/**
 * Registers every `aegov-*` element through the lazy loader and runs the design
 * system's global script (toast live region, `window.aegovToast`).
 *
 * Add it to the application's providers (`bootstrapApplication`, or the root
 * NgModule's `providers`). It must be an application-level provider: Angular only
 * runs `APP_INITIALIZER` from the root environment injector.
 *
 * The loader is imported dynamically so apps that never call this function don't
 * bundle it (the loader is a side-effect module). It lives in this secondary entry
 * point because a bundler emits the loader's lazy chunks for any `import()` in a
 * module it includes, even inside a function the app never calls: an app that
 * imports only wrappers from `@aegov/designsystem-angular` would otherwise ship
 * ~70 unused chunk files.
 *
 * This is what `provideAppInitializer()` expands to; the token form is used so the
 * package keeps working on Angular 18, which has no `provideAppInitializer()`.
 */
export function provideDesignSystem(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useValue: () => import('@aegov/designsystem/loader').then((loader) => loader.defineCustomElements()),
    },
  ]);
}

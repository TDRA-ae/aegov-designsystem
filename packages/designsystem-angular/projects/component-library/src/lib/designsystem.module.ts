import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders, NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';

/**
 * Registers every `aegov-*` element through the lazy loader and runs the design
 * system's global script (toast live region, `window.aegovToast`).
 *
 * Add it to the application's providers (`bootstrapApplication`, or the root
 * NgModule's `providers`). It must be an application-level provider: Angular only
 * runs `APP_INITIALIZER` from the root environment injector.
 *
 * The loader is imported dynamically so apps that never call this function don't
 * bundle it or its lazy component chunks (the loader is a side-effect module).
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

/**
 * Re-exports every wrapper. Has no providers, so importing it into a standalone
 * component adds no code beyond the wrappers. Each wrapper registers its own element.
 *
 * Apps that want the global setup add `provideDesignSystem()` to their providers.
 * (No `forRoot()`: a static method referencing it would keep the lazy loader in
 * every bundle that imports this module.)
 */
@NgModule({
  imports: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class DesignSystemModule {}

import { EnvironmentProviders, NgModule } from '@angular/core';
import { provideDesignSystem as provideDesignSystemFromProvider } from '@aegov/designsystem-angular/provider';
import { DIRECTIVES } from './stencil-generated';

/**
 * @deprecated Import `provideDesignSystem` from `@aegov/designsystem-angular/provider`.
 * This export will be removed in the next major version: while the main entry point
 * references the provider, every app that imports a wrapper also emits the lazy
 * loader's ~70 chunk files, whether or not it calls `provideDesignSystem()`.
 */
export function provideDesignSystem(): EnvironmentProviders {
  return provideDesignSystemFromProvider();
}

/**
 * Re-exports every wrapper. Has no providers, so importing it into a standalone
 * component adds no code beyond the wrappers. Each wrapper registers its own element.
 *
 * Apps that want the global setup add `provideDesignSystem()` (from
 * `@aegov/designsystem-angular/provider`) to their providers.
 * (No `forRoot()`: a static method referencing it would keep the lazy loader in
 * every bundle that imports this module.)
 */
@NgModule({
  imports: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class DesignSystemModule {}

import { NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';

/**
 * Re-exports every wrapper. Has no providers, so importing it into a standalone
 * component adds no code beyond the wrappers. Each wrapper registers its own element.
 *
 * Apps that want the global setup add `provideDesignSystem()` from
 * `@aegov/designsystem-angular/provider` to their providers. This entry point never
 * references it: a bundler emits the lazy loader's ~70 chunk files for any module it
 * includes that imports the loader, even when the app never calls the function.
 */
@NgModule({
  imports: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class DesignSystemModule {}

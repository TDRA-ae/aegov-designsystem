import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders, NgModule } from '@angular/core';
import { defineCustomElements } from '@aegov/designsystem-testing/loader';
import { DIRECTIVES } from './stencil-generated';

function initializeDesignSystem() {
  return () => defineCustomElements();
}

const APP_INIT_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeDesignSystem,
  multi: true,
};

@NgModule({
  imports: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [APP_INIT_PROVIDER],
})
export class DesignSystemModule {}

export function provideDesignSystem(): EnvironmentProviders {
  return makeEnvironmentProviders([APP_INIT_PROVIDER]);
}

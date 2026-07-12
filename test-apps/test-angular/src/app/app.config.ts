import { ApplicationConfig } from '@angular/core';
import { provideDesignSystem } from '@aegov/design-system-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
  ],
};

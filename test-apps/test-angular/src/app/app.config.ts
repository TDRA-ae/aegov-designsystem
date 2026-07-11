import { ApplicationConfig } from '@angular/core';
import { provideDesignSystem } from '@aegov/designsystem-angular-testing';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
  ],
};

import { ApplicationConfig } from '@angular/core';
import { provideDesignSystem } from '@aegov/designsystem-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
  ],
};

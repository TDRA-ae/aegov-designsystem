import { ApplicationConfig } from '@angular/core';
import { provideDesignSystem } from '@aegov/designsystem-angular/provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
  ],
};

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection , provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors,} from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideFileRouter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor]),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideClientHydration(withEventReplay()),

  ]
};

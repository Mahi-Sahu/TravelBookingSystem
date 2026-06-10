import { ApplicationConfig, provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // Removes the need for zone.js!
    provideRouter(routes),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
  ],
  
};

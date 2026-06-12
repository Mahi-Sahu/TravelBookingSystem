import { ApplicationConfig, provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// --- NEW NGRX IMPORTS ---
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { travelReducer } from './Components/TravelModule/Store/travel.reducer';
import { TravelEffects } from './Components/TravelModule/Store/travel.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    // NgRx Registration
    provideStore({ travel: travelReducer }),
    provideEffects([TravelEffects])
  ],
};
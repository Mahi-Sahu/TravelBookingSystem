import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TravelDataService } from '../../../Services/travel-data';
import * as TravelActions from './travel.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TravelEffects {
  private actions$ = inject(Actions);
  private travelService = inject(TravelDataService);

  loadTravels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TravelActions.loadTravels),
      mergeMap(() =>
        // Calls the service, then maps the result to the Success action
        this.travelService.getPackagesHttpOnly().pipe(
          map(travels => TravelActions.loadTravelsSuccess({ travels })),
          catchError(error => of(TravelActions.loadTravelsFailure({ error: error.message })))
        )
      )
    )
  );
}
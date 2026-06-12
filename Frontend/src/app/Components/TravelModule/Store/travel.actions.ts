import { createAction, props } from '@ngrx/store';
import { TravelItem, TravelFilters } from '../../../Models/travel';

export const loadTravels = createAction('[Travel API] Load Travels');

export const loadTravelsSuccess = createAction(
  '[Travel API] Load Travels Success',
  props<{ travels: TravelItem[] }>()
);

export const loadTravelsFailure = createAction(
  '[Travel API] Load Travels Failure',
  props<{ error: string }>()
);

export const updateFilters = createAction(
  '[Travel Search] Update Filters',
  props<{ filters: Partial<TravelFilters> }>()
);
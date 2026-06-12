import { createReducer, on } from '@ngrx/store';
import { travelAdapter, initialTravelState } from './travel.state';
import * as TravelActions from './travel.actions';

export const travelReducer = createReducer(
  initialTravelState,
  
  on(TravelActions.loadTravels, (state) => ({ ...state, loading: true, error: null })),
  
  // Use Entity Adapter's 'setAll' to populate the list
  on(TravelActions.loadTravelsSuccess, (state, { travels }) => 
    travelAdapter.setAll(travels, { ...state, loading: false })
  ),
  
  on(TravelActions.loadTravelsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(TravelActions.updateFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  }))
);
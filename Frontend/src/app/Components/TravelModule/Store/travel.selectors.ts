import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TravelState, travelAdapter } from './travel.state';

export const selectTravelState = createFeatureSelector<TravelState>('travel');

// Get default entity selectors
const { selectAll } = travelAdapter.getSelectors();

// Basic Selectors
export const selectAllTravels = createSelector(selectTravelState, selectAll);
export const selectTravelFilters = createSelector(selectTravelState, (state) => state.filters);
export const selectTravelLoading = createSelector(selectTravelState, (state) => state.loading);

// Complex Selector (Replaces your Computed Signal)
export const selectFilteredTravels = createSelector(
  selectAllTravels,
  selectTravelFilters,
  (travels, filters) => {
    return travels.filter(item => {
      const matchDestination = !filters.destination || 
        (item.name && item.name.toLowerCase().includes(filters.destination.toLowerCase())) ||
        (item.country && item.country.toLowerCase().includes(filters.destination.toLowerCase()));
        
      const matchType = filters.travelType === 'all' || 
        (item.type && item.type.toLowerCase() === filters.travelType.toLowerCase());
        
      const matchBudget = item.price <= filters.budgetRange;
      const matchRating = item.rating >= filters.rating;

      return matchDestination && matchType && matchBudget && matchRating;
    });
  }
);
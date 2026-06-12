import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateFilters } from '../Store/travel.actions';
import { selectTravelFilters } from '../Store/travel.selectors';

@Component({
  selector: 'app-travel-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-filter-component.html',
  styleUrl: './travel-filter-component.css'
})
export class TravelFilterComponent {
  private store = inject(Store); // Inject the NgRx Store

  // Read the current filters seamlessly as an Angular Signal
  currentFilters = this.store.selectSignal(selectTravelFilters);

  onBudgetChange(event: Event): void {
    const budget = Number((event.target as HTMLInputElement).value);
    // Dispatch the action to the Store
    this.store.dispatch(updateFilters({ filters: { budgetRange: budget } }));
  }

  onRatingChange(minRating: number): void {
    // Dispatch the action to the Store
    this.store.dispatch(updateFilters({ filters: { rating: minRating } }));
  }
}
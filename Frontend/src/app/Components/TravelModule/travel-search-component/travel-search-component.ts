import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateFilters } from '../Store/travel.actions'; // Ensure this path matches your folder structure!

@Component({
  selector: 'app-travel-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './travel-search-component.html',
  styleUrl: './travel-search-component.css'
})
export class TravelSearchComponent {
  private store = inject(Store); // Inject NgRx Store

  destination = '';
  travelType: 'all' | 'flight' | 'hotel' | 'package' = 'all';

  onSearch(): void {
    // Dispatch action to NgRx
    this.store.dispatch(updateFilters({
      filters: {
        destination: this.destination,
        travelType: this.travelType
      }
    }));
  }
}
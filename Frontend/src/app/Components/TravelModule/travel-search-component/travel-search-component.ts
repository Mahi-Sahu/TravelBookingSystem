import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TravelDataService } from '../../../Services/travel-data';

@Component({
  selector: 'app-travel-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './travel-search-component.html',
  styleUrl: './travel-search-component.css'
})
export class TravelSearchComponent {
  protected travelService = inject(TravelDataService);

  destination = '';
  travelType: 'all' | 'flight' | 'hotel' | 'package' = 'all';

  onSearch(): void {
    this.travelService.updateFilters({
      destination: this.destination,
      travelType: this.travelType
    });
  }
}
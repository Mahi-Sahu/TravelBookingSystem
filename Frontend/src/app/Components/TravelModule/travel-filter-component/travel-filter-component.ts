import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common'; 
import { TravelDataService } from '../../../Services/travel-data';

@Component({
  selector: 'app-travel-filter',
  standalone: true,
  imports: [FormsModule, CurrencyPipe], 
  templateUrl: './travel-filter-component.html',
  styleUrl: './travel-filter-component.css'
})
export class TravelFilterComponent {
  protected travelService = inject(TravelDataService);

  onBudgetRangeChange(event: Event): void {
    const budget = +(event.target as HTMLInputElement).value;
    this.travelService.updateFilters({ budgetRange: budget });
  }

  onRatingSelect(minRating: number): void {
    this.travelService.updateFilters({ rating: minRating });
  }
}
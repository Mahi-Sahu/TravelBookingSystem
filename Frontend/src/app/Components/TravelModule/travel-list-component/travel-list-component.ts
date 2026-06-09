import { Component, inject } from '@angular/core';
import { TravelSearchComponent } from '../travel-search-component/travel-search-component';
import { TravelFilterComponent } from '../travel-filter-component/travel-filter-component';
import { TravelCardComponent } from '../travel-card-component/travel-card-component';
import { TravelComaparisonComponent } from '../travel-comaparison-component/travel-comaparison-component';
import { TravelDataService } from '../../../Services/travel-data';
import { TravelItem } from '../../../Models/travel';

@Component({
  selector: 'app-travel-list-component',
  standalone: true,
  imports: [
    TravelSearchComponent,
    TravelFilterComponent,
    TravelCardComponent,
    TravelComaparisonComponent
  ],
  templateUrl: './travel-list-component.html',
  styleUrl: './travel-list-component.css'
})
export class TravelListComponent {
  protected travelService = inject(TravelDataService);

  onItemCompareSelect(item: TravelItem): void {
    this.travelService.addToComparison(item);
  }

  onItemCheckoutSelect(item: TravelItem): void {
    console.log('Initiating transaction workflow logic for listing identifier:', item.id);
    // Integrate router linking directly over to dynamic forms/booking process here
  }
}
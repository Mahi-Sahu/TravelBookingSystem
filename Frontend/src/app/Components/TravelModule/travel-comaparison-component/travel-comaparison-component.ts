import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TravelDataService } from '../../../Services/travel-data';

@Component({
  selector: 'app-travel-comaparison-component',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './travel-comaparison-component.html',
  styleUrl: './travel-comaparison-component.css'
})
export class TravelComaparisonComponent {
  protected travelService = inject(TravelDataService);
}
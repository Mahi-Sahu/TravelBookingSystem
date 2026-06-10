import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelDataService } from '../../../Services/travel-data';
import { TravelCardComponent } from '../travel-card-component/travel-card-component';
import { TravelDetailsComponent } from '../travel-details-component/travel-details-component';
import { TravelSearchComponent } from '../travel-search-component/travel-search-component'; 
import { TravelFilterComponent } from '../travel-filter-component/travel-filter-component'; 
import { TravelComaparisonComponent } from '../travel-comaparison-component/travel-comaparison-component';
import { TravelItem } from '../../../Models/travel'; // Fully verified explicit import declaration

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [
    CommonModule, 
    TravelCardComponent, 
    TravelDetailsComponent,
    TravelSearchComponent,     
    TravelFilterComponent,     
    TravelComaparisonComponent 
  ],
  templateUrl: './travel-list-component.html',
  styleUrl: './travel-list-component.css'
})
export class TravelListComponent implements OnInit {
  protected travelService = inject(TravelDataService);
  
  // Tracks active detail overlay panels using your TravelItem interface model configuration references
  selectedPackage = signal<TravelItem | null>(null);

  ngOnInit(): void {
    this.travelService.loadPackages().subscribe();
  }

  viewPackageDetails(pkg: TravelItem): void {
    this.selectedPackage.set(pkg);
  }

  clearDetailsPane(): void {
    this.selectedPackage.set(null);
  }
}
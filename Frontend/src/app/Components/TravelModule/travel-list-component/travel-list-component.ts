import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TravelDataService } from '../../../Services/travel-data';
import { TravelCardComponent } from '../travel-card-component/travel-card-component';
import { TravelDetailsComponent } from '../travel-details-component/travel-details-component';
import { TravelSearchComponent } from '../travel-search-component/travel-search-component';
import { TravelFilterComponent } from '../travel-filter-component/travel-filter-component';
import { TravelItem, TravelServicePackage } from '../../../Models/travel';
import { NavbarComponent } from '../../Shared/navbar-component/navbar-component';

import { loadTravels } from '../Store/travel.actions';
import { selectFilteredTravels, selectTravelLoading } from '../Store/travel.selectors';
@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [
    CommonModule,
    TravelCardComponent,
    TravelDetailsComponent,
    TravelSearchComponent,
    TravelFilterComponent,
    NavbarComponent
  ],
  templateUrl: './travel-list-component.html',
  styleUrl: './travel-list-component.css'
})
export class TravelListComponent implements OnInit {
  protected travelService = inject(TravelDataService);
  private store = inject(Store); // Inject NgRx Store

  selectedDestination = signal<TravelItem | null>(null);
  selectedPackage = signal<TravelServicePackage | null>(null);

  // Read from NgRx Selectors as Angular Signals
  filteredPackages = this.store.selectSignal(selectFilteredTravels);
  isLoading = this.store.selectSignal(selectTravelLoading);

  ngOnInit(): void {
    // Trigger NgRx Effect to load data
    this.store.dispatch(loadTravels());
  }

  onDestinationSelect(destination: TravelItem): void {
    this.selectedDestination.set(destination);

    // Phase 1: Load active flights/hotels packages
    this.travelService.loadServicesForDestination(destination.id).subscribe();

    // Phase 2: Pull corresponding day plans from db.json itineraryDays entries
    this.travelService.loadItineraryDaysByDestination(destination.id).subscribe();
  }

  onPackageSelect(pkg: TravelServicePackage): void {
    this.selectedPackage.set(pkg);
  }

  backToPackagesList(): void {
    this.selectedPackage.set(null);
  }

  backToDestinationsCatalog(): void {
    this.selectedDestination.set(null);
    this.travelService.selectedDestinationServices.set([]);
    this.travelService.selectedPackageDays.set([]);
  }
}

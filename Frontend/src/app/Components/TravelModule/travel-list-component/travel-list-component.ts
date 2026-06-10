import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelDataService } from '../../../Services/travel-data';
import { TravelCardComponent } from '../travel-card-component/travel-card-component';
import { TravelDetailsComponent } from '../travel-details-component/travel-details-component';
import { TravelItem } from '../../../Models/travel';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [CommonModule, TravelCardComponent, TravelDetailsComponent],
  templateUrl: './travel-list-component.html',
  styleUrl: './travel-list-component.css'
})
export class TravelListComponent implements OnInit {
  protected travelService = inject(TravelDataService);

  // Tracks active detail view overlays
  selectedPackage = signal<TravelItem | null>(null);

  ngOnInit(): void {
    // This call will compile successfully once the service method above is saved
    this.travelService.loadPackages().subscribe();
  }

  viewPackageDetails(pkg: TravelItem): void {
    this.selectedPackage.set(pkg);
  }

  clearDetailsPane(): void {
    this.selectedPackage.set(null);
  }
}
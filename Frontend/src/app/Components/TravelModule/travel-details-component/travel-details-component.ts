import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TravelServicePackage } from '../../../Models/travel';

@Component({
  selector: 'app-travel-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-details-component.html',
  styleUrl: './travel-details-component.css'
})
export class TravelDetailsComponent {
  private router = inject(Router);

  @Input() viewMode: string = 'PACKAGE_DETAILS';
  @Input({ required: true }) selectedPackage!: TravelServicePackage;
  @Input({ required: true }) parentDestination!: any;
  @Input() itineraryDays: any[] = []; 
  @Output() onBack = new EventEmitter<void>();

  /**
   * Navigates to the Booking Module carrying the relational keys
   */
  initiateBookingWorkflow(): void {
    // Safely extract the itineraryId from the first day node if it exists
    const itineraryId = this.itineraryDays.length > 0 ? this.itineraryDays[0].itineraryId : '';

    this.router.navigate(['/customer/booking'], { 
      queryParams: { 
        serviceId: this.selectedPackage.id, 
        destinationId: this.parentDestination.id,
        itineraryId: itineraryId,
      } 
    });
  }
}
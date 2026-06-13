import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itinerary } from '../../../Models/itinerary';
import { ItineraryService } from '../../../Services/itinerary';
import { DayWiseItineraryComponent } from '../day-wise-itinerary-component/day-wise-itinerary-component';
import { DownloadSummaryComponent } from '../download-summary-component/download-summary-component';
import { BookingService } from '../../../Services/booking-service';
import { Traveler } from '../../../Models/traveler';

@Component({
  selector: 'app-itinerary-details',
  standalone: true,
  imports: [CommonModule, DayWiseItineraryComponent, DownloadSummaryComponent],
  templateUrl: './itinerary-details-component.html',
  styleUrl: './itinerary-details-component.css'
})
export class ItineraryDetailsComponent implements OnChanges {
  protected itineraryService = inject(ItineraryService);
  private bookingService = inject(BookingService);

  @Input({ required: true }) itinerary!: Itinerary;
  @Output() onBack = new EventEmitter<void>();

  coTravelers = signal<Traveler[]>([]);
  travelersLoading = signal<boolean>(false);
  travelerError = signal<string>('');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itinerary'] && changes['itinerary'].currentValue) {
      this.loadTravelersForItinerary();
    }
  }

  loadTravelersForItinerary(): void {
    this.coTravelers.set([]);
    this.travelerError.set('');

    if (!this.itinerary?.bookingId) {
      this.travelerError.set('No booking is linked to this itinerary.');
      return;
    }

    this.travelersLoading.set(true);
    this.bookingService.getBookingById(this.itinerary.bookingId).subscribe({
      next: (booking) => {
        if (!booking.travelerIds || booking.travelerIds.length === 0) {
          this.travelersLoading.set(false);
          this.travelerError.set('No travelers are linked to this booking.');
          return;
        }

        this.bookingService.getTravelersByIds(booking.travelerIds).subscribe({
          next: (travelers) => {
            this.coTravelers.set(travelers);
            this.travelersLoading.set(false);
          },
          error: () => {
            this.travelerError.set('Unable to load traveler details.');
            this.travelersLoading.set(false);
          },
        });
      },
      error: () => {
        this.travelerError.set('Unable to load booking details for this itinerary.');
        this.travelersLoading.set(false);
      },
    });
  }
}

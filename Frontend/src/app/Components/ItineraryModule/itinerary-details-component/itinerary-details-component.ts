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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itinerary'] && changes['itinerary'].currentValue) {
      this.fetchTravelerDetailsStrict();
    }
  }

  fetchTravelerDetailsStrict(): void {
    if (!this.itinerary || !this.itinerary.bookingId) return;

    console.log('--- STARTING RELATIONAL DATA FETCH ---');
    console.log('1. Itinerary Booking ID:', this.itinerary.bookingId);

    // Step 1: Go to Booking Array using bookingId
    this.bookingService.getBookingById(this.itinerary.bookingId).subscribe({
      next: (booking) => {
        console.log('2. Successfully fetched Booking:', booking);

        // Step 2: Get travelerIds from that Booking
        if (booking && booking.travelerIds && booking.travelerIds.length > 0) {
          console.log('3. Found Traveler IDs in Booking:', booking.travelerIds);

          // Step 3: Go to Travelers table to get the details
          this.bookingService.getTravelersByUser(this.itinerary.userId).subscribe({
            next: (allTravelers) => {
              
              // Step 4: THE FIX IS HERE. Added '?' to handle strict typing in the closure
              const matchedTravelers = allTravelers.filter(t => 
                booking.travelerIds?.includes(t.id.toString()) || 
                booking.travelerIds?.includes(t.id as any)
              );

              console.log('4. Final Matched Co-Travelers:', matchedTravelers);
              this.coTravelers.set(matchedTravelers); // Pass it to the PDF!
            }
          });

        } else {
          console.warn('⚠️ STOPPING: This specific booking in db.json does NOT have a "travelerIds" array!');
          this.coTravelers.set([]); // Clear the list if the database is missing the array
        }
      },
      error: (err) => console.error('Failed to fetch booking', err)
    });
  }
}
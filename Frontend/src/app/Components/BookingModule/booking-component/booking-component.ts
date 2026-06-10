import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css'
})
export class BookingComponent implements OnInit {
  private route = inject(ActivatedRoute);

  destinationId: string | null = null;
  itineraryId: string | null = null;
  serviceId: string | null = null;

  ngOnInit(): void {
    // Automatically reads the relational keys from the browser URL address bar stream
    this.route.queryParams.subscribe(params => {
      this.destinationId = params['destinationId'] || null;
      this.itineraryId = params['itineraryId'] || null;
      this.serviceId = params['serviceId'] || null;
      
      console.log('Booking initialized for Destination:', this.destinationId);
      console.log('Associated Schedule Itinerary:', this.itineraryId);
      console.log('Service ID:',this.serviceId)
    });
  }
}
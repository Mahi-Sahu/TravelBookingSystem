import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Destination } from '../../../Models/destination';
import { TravelService } from '../../../Models/travel-service';
import { Traveler } from '../../../Models/traveler';
import { BookingService } from '../../../Services/booking-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-review-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-review-component.html',
  styleUrl: './booking-review-component.css',
})
export class BookingReviewComponent implements OnInit {
  bookingData: any;
  destination?: Destination;
  travelService?: TravelService;
  travelers: Traveler[] = [];
  itineraryDays: any[]=[];

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookingData = history.state.bookingData;
    this.itineraryDays=this.bookingData.itineraryDays || [];
    if (!this.bookingData) {
      this.router.navigate(['/customer/booking']);
      return;
    }

    this.loadDestination();
    this.loadService();
    this.loadTravelers();
  }

  loadDestination(): void {
    this.bookingService
      .getDestinationById(this.bookingData.destinationId.toString())
      .subscribe((response) => {
        this.destination = response;
        this.changeDetection.detectChanges();
      });
  }

  loadService(): void {
    this.bookingService.getTravelServiceById(this.bookingData.serviceId).subscribe((response) => {
      this.travelService = response;
      this.changeDetection.detectChanges();
    });
  }

  loadTravelers(): void {
    this.bookingData.travelerIds.forEach((id: string) => {
      this.bookingService.getTravelerById(id).subscribe((response) => {
        this.travelers.push(response);
        this.changeDetection.detectChanges();
      });
    });
  }

  goBack(): void{
    this.router.navigate(['/customer/booking']);
  }

  confirmBooking(): void {
    this.router.navigate(['/customer/booking/confirmation'], {
      state: { bookingData: this.bookingData },
    });
  }

  cancelBooking(): void{
    const confirmation=confirm('Are you sure you want to cancel this booking?');
    if(!confirmation){
      return;
    }
    //notification
    this.router.navigate(['/customer/booking']);
  }
}

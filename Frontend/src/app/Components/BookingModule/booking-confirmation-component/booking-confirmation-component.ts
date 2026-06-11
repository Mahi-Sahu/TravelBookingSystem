import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Booking } from '../../../Models/booking';
import { BookingService } from '../../../Services/booking-service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation-component',
  imports: [CommonModule],
  templateUrl: './booking-confirmation-component.html',
  styleUrl: './booking-confirmation-component.css',
})
export class BookingConfirmationComponent implements OnInit {
  bookingData!: Booking;
  savedBooking?: Booking;
  isSaving = true;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const data = history.state.bookingData;
    if (!data) {
      this.router.navigate(['/customer/booking']);
      return;
    }

    this.bookingData = { ...data, bookingDate: new Date().toISOString().split('T')[0] };
    this.saveBooking();
  }

  saveBooking(): void {
    this.bookingService.createBooking(this.bookingData).subscribe((response) => {
      this.savedBooking = response;
      this.isSaving = false;
      this.changeDetection.detectChanges();
    });
  }

  viewHistory(): void {
    this.router.navigate(['/customer/booking/history']);
  }
}

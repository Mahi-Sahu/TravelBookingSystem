import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingStatusPipe } from '../../../Pipes/booking-status-pipe';
import { StatusHighlight } from '../../../Directives/status-highlight';
import { Booking } from '../../../Models/booking';
import { BookingService } from '../../../Services/booking-service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../Shared/navbar-component/navbar-component';

@Component({
  selector: 'app-booking-history-component',
  imports: [CommonModule, FormsModule, BookingStatusPipe, StatusHighlight, NavbarComponent, RouterLink],
  templateUrl: './booking-history-component.html',
  styleUrl: './booking-history-component.css',
})
export class BookingHistoryComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  destinationsMap: { [key: number]: string } = {};
  searchText = '';

  //to be fetched later
  userId = 1;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingsByUser(this.userId).subscribe((response) => {
      this.bookings = response;
      this.filteredBookings = response;
      this.loadDestinations();
      this.changeDetection.detectChanges();
    });
  }

  loadDestinations(): void {
    this.bookingService.getDestinations().subscribe((response) => {
      response.forEach((destination) => {
        this.destinationsMap[Number(destination.id)] = destination.name;
      });
      this.changeDetection.detectChanges();
    });
  }

  viewBooking(bookingId: number): void {
    this.router.navigate(['/customer/booking', bookingId]);
  }

  goBack(): void{
    this.router.navigate(['/customer-dashboard']);
  }
}

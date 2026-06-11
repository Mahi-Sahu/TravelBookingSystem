import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.service'; // Adjust path if needed

@Component({
  selector: 'app-manage-bookings-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-bookings-component.html',
  styleUrl: './manage-bookings-component.css',
})
export class ManageBookingsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  bookings: any[] = [];

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.adminService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = [...data];
        this.cdr.detectChanges();
        console.log('Fetched Bookings:', this.bookings);
      },
      error: (err) => console.error('Error fetching bookings', err),
    });
  }

  updateStatus(bookingId: number, newStatus: string) {
    // 1. Update the UI optimistically
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.status = newStatus;
    }

    // 2. Trigger the API call to update db.json
    this.adminService.updateBookingStatus(bookingId, newStatus).subscribe({
      next: () => {
        alert(`Booking #${bookingId} successfully updated to ${newStatus}`);
      },
      error: (err) => {
        console.error('Failed to update status', err);
        alert('Failed to update booking status. Please try again.');
        this.fetchBookings(); // Revert UI if the API call fails
      },
    });
  }
}

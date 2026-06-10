import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StatusHighlight } from '../../../Directives/status-highlight';
import { BookingStatusPipe } from '../../../Pipes/booking-status-pipe';
import { User } from '../../../Models/user';
import { Booking } from '../../../Models/booking';
import { CustomerDashboardService } from '../../../Services/customer-dashboard.service';
import { NotificationModel } from '../../../Models/notification';

@Component({
  selector: 'app-customer-dashboard-component',
  standalone: true,
  imports: [CommonModule, StatusHighlight, BookingStatusPipe],
  templateUrl: './customer-dashboard-component.html',
  styleUrl: './customer-dashboard-component.css',
})
export class CustomerDashboardComponent implements OnInit {
  // Fixed: Changed from user!: User to allow null initially until the async HTTP service returns data
  user: User | null = null;

  bookings: Booking[] = [];

  notifications: NotificationModel[] = [];

  totalBookings = 0;

  upcomingTrips = 0;

  constructor(private dashboardService: CustomerDashboardService) {}

  ngOnInit(): void {
    const userId = 1;

    this.loadUser(userId);

    this.loadBookings(userId);

    this.loadNotifications(userId);
  }

  loadUser(id: number): void {
    this.dashboardService.getUser(id).subscribe((response) => {
      this.user = response;
    });
  }

  loadBookings(userId: number): void {
    this.dashboardService.getBookingsByUser(userId).subscribe((response) => {
      this.bookings = response;

      this.totalBookings = response.length;

      this.upcomingTrips = response.filter((booking) => booking.status === 'CONFIRMED').length;
    });
  }

  loadNotifications(userId: number): void {
    this.dashboardService.getNotificationsByUser(userId).subscribe((response) => {
      this.notifications = response;
    });
  }
}
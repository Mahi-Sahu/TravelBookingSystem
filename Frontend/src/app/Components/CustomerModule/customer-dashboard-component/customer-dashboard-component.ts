import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { StatusHighlight } from '../../../Directives/status-highlight';
import { BookingStatusPipe } from '../../../Pipes/booking-status-pipe';
import { User } from '../../../Models/user';
import { Booking } from '../../../Models/booking';
import { CustomerDashboardService } from '../../../Services/customer-dashboard.service';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../Shared/navbar-component/navbar-component';

@Component({
  selector: 'app-customer-dashboard-component',
  standalone: true,
  imports: [NavbarComponent, CommonModule, StatusHighlight, BookingStatusPipe],
  templateUrl: './customer-dashboard-component.html',
  styleUrl: './customer-dashboard-component.css',
})
export class CustomerDashboardComponent implements OnInit {
  // 1. Convert to Signals for Zoneless Change Detection
  user = signal<User | null>(null);
  bookings = signal<Booking[]>([]);

  // 2. Computed signals automatically calculate based on bookings
  totalBookings = computed(() => this.bookings().length);
  upcomingTrips = computed(() => this.bookings().filter((b) => b.status === 'CONFIRMED').length);

  private dashboardService = inject(CustomerDashboardService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    // 3. Dynamically get the logged-in user instead of hardcoding '1'
    const currentUser = this.authService.currentUser();

    if (currentUser && currentUser.id) {
      this.loadUser(currentUser.id);
      this.loadBookings(currentUser.id);
    } else {
      this.router.navigate(['/login']); // Redirect if not logged in
    }
  }

  loadUser(id: number): void {
    this.dashboardService.getUser(id).subscribe({
      next: (response) => this.user.set(response), // Use .set() for signals
      error: (err) => console.error('Failed to load user', err),
    });
  }

  loadBookings(userId: number): void {
    this.dashboardService.getBookingsByUser(userId).subscribe({
      next: (response) => this.bookings.set(response),
    });
  }


  goToProfile(): void{
    this.router.navigate(['customer/profile']);
  }

}
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-reports-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-component.html',
  styleUrl: './reports-component.css',
})
export class ReportsComponent implements OnInit {
  stats = {
    totalRevenue: 0,
    activeBookings: 0,
    totalCustomers: 0,
    cancelledBookings: 0,
  };

  recentBookings: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData() {
    this.adminService.getReportData().subscribe({
      next: ({ users, bookings }) => {
        this.stats.totalRevenue = bookings.reduce(
          (sum, booking) => sum + Number(booking.totalPrice),
          0,
        );

        this.stats.activeBookings = bookings.filter(
          (booking) => booking.status === 'CONFIRMED' || booking.status === 'PENDING',
        ).length;

        this.stats.cancelledBookings = bookings.filter(
          (booking) => booking.status === 'CANCELLED',
        ).length;

        this.stats.totalCustomers = users.filter((user) => user.role === 'CUSTOMER').length;

        this.recentBookings = bookings.slice(-5).reverse();

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  downloadCsvReport() {
    const csvData = [
      ['Metric', 'Value'],
      ['Total Revenue', this.stats.totalRevenue],
      ['Active Bookings', this.stats.activeBookings],
      ['Total Customers', this.stats.totalCustomers],
      ['Cancelled Bookings', this.stats.cancelledBookings],
      [],
      ['Recent Bookings'],
      ['Booking ID', 'User ID', 'Destination ID', 'Status', 'Total Price'],
    ];

    this.recentBookings.forEach((booking) => {
      csvData.push([
        booking.id,
        booking.userId,
        booking.destinationId,
        booking.status,
        booking.totalPrice,
      ]);
    });

    const csvContent = csvData.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.setAttribute('download', `travel-report-${new Date().getTime()}.csv`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  }
}

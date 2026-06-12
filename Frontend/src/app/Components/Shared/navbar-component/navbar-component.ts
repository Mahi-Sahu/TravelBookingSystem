import { Component, OnInit, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Added Router import
import { NotificationService } from '../../../Services/notification-service';
import { AuthService } from '../../../Services/auth-service';
import { NotificationListComponent } from '../../NotificationModule/notification-list-component/notification-list-component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationListComponent],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  private router = inject(Router); // Injected Router
  private elementRef = inject(ElementRef);

  isNotificationOpen = false;

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && user.id) {
      this.notificationService.startPolling(user.id);
    }
  }

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isNotificationOpen = false;
    }
  }

  // NEW: Secure Logout Flow
  logout() {
    this.notificationService.stopPolling(); // Stop fetching background alerts
    this.authService.logout(); // Clears Signals and LocalStorage
    this.router.navigate(['/login']); // Redirect to login page
  }
}

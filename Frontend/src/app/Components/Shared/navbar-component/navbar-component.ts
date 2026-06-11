import { Component, OnInit, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../../Services/notification-service';
import { AuthService } from '../../../Services/auth-service';
import { NotificationListComponent } from '../../NotificationModule/notification-list-component/notification-list-component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // Ensure we import the NotificationListComponent so we can use its selector in the HTML
  imports: [CommonModule, RouterModule, NotificationListComponent],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  private elementRef = inject(ElementRef); // Used to detect clicks outside the navbar

  isNotificationOpen = false;

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && user.id) {
      // Fetch notifications globally when the navbar loads
      this.notificationService.loadUserNotifications(user.id).subscribe();
    }
  }

  toggleNotifications(event: Event) {
    event.stopPropagation(); // Prevents the click from immediately bubbling to the document
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  // Closes the dropdown if the user clicks anywhere else on the screen
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isNotificationOpen = false;
    }
  }
}

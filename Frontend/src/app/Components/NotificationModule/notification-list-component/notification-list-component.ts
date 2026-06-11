import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../Services/notification-service';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list-component.html',
  styleUrl: './notification-list-component.css',
})
export class NotificationListComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  // Bind to the updated service signals
  notifications = this.notificationService.allNotifications;
  unreadCount = this.notificationService.unreadCount;

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && user.id) {
      this.notificationService.loadUserNotifications(user.id).subscribe();
    }
  }

  markRead(id: number | undefined) {
    if (id) {
      this.notificationService.markAsRead(id).subscribe();
    }
  }
}

import { Component, OnInit, inject, computed } from '@angular/core';
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

  // Directly link to the service's signal for automatic UI updates
  unreadNotes = this.notificationService.unreadNotifications;

  // Computed signal for the badge count
  unreadCount = computed(() => this.unreadNotes().length);

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

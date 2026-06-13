import { Component, OnInit, inject, Input, Output, EventEmitter, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Needed for the "Show All" link
import { NotificationService } from '../../../Services/notification-service';
import { AuthService } from '../../../Services/auth-service';
import { NavbarComponent } from '../../Shared/navbar-component/navbar-component';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule, RouterModule, forwardRef(() => NavbarComponent)],
  templateUrl: './notification-list-component.html',
  styleUrl: './notification-list-component.css',
})
export class NotificationListComponent implements OnInit {
  // Configures how the component looks and behaves
  @Input() viewMode: 'dropdown' | 'full' = 'full';

  // Emits an event to tell the Navbar to close the dropdown when navigating
  @Output() closeRequested = new EventEmitter<void>();

  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  allNotifications = this.notificationService.allNotifications;
  unreadCount = this.notificationService.unreadCount;

  // DYNAMIC LIST: Filters based on where the component is rendered
  displayNotes = computed(() => {
    if (this.viewMode === 'dropdown') {
      return this.allNotifications().filter((n) => !n.isRead); // Unread only
    }
    return this.allNotifications(); // All history
  });

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && user.id) {
      this.notificationService.startPolling(user.id);
    }
  }

  markRead(id: number | undefined) {
    if (id) {
      this.notificationService.markAsRead(id).subscribe();
    }
  }

  onShowAllClicked() {
    this.closeRequested.emit(); // Tell navbar to close the overlay
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NotificationModel } from '../Models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/notifications';

  // Global reactive state for unread count/list
  unreadNotifications = signal<NotificationModel[]>([]);

  // Fetch notifications for a specific user (and global 'ALL' broadcasts)
  loadUserNotifications(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.apiUrl}`).pipe(
      tap((allNotifications) => {
        // Filter for this user OR global broadcasts, and only unread ones
        const relevantUnread = allNotifications.filter(
          (n) => (n.userId === userId || n.userId === 'ALL') && !n.isRead,
        );
        this.unreadNotifications.set(relevantUnread);
      }),
    );
  }

  // Mark as read and instantly update the signal
  markAsRead(notificationId: number): Observable<NotificationModel> {
    return this.http
      .patch<NotificationModel>(`${this.apiUrl}/${notificationId}`, { isRead: true })
      .pipe(
        tap(() => {
          this.unreadNotifications.update((current) =>
            current.filter((n) => n.id !== notificationId),
          );
        }),
      );
  }

  // Admin function to send a notification
  sendNotification(payload: NotificationModel): Observable<NotificationModel> {
    return this.http.post<NotificationModel>(this.apiUrl, {
      ...payload,
      isRead: false,
      timestamp: new Date().toISOString(),
    });
  }
}

import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NotificationModel } from '../Models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/notifications';

  // State now holds ALL notifications (read and unread)
  allNotifications = signal<NotificationModel[]>([]);

  // Automatically calculates the unread count whenever allNotifications changes
  unreadCount = computed(() => this.allNotifications().filter((n) => !n.isRead).length);

  loadUserNotifications(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.apiUrl).pipe(
      tap((allNotes) => {
        // BUG FIX: Wrap IDs in Number() to prevent strict equality failures with JSON strings
        let relevant = allNotes.filter(
          (n) => Number(n.userId) === Number(userId) || String(n.userId).toUpperCase() === 'ALL',
        );

        relevant.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        this.allNotifications.set(relevant);
      }),
    );
  }

  markAsRead(notificationId: number): Observable<NotificationModel> {
    return this.http
      .patch<NotificationModel>(`${this.apiUrl}/${notificationId}`, { isRead: true })
      .pipe(
        tap(() => {
          // Update the specific notification's read status in the signal without deleting it
          this.allNotifications.update((current) =>
            current.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
          );
        }),
      );
  }

  sendNotification(payload: NotificationModel): Observable<NotificationModel> {
    return this.http.post<NotificationModel>(this.apiUrl, {
      ...payload,
      isRead: false,
      timestamp: new Date().toISOString(),
    });
  }
}

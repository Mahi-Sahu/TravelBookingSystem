import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, timer, Subscription, switchMap } from 'rxjs';
import { NotificationModel } from '../Models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/notifications';
  private pollingSub?: Subscription;

  allNotifications = signal<NotificationModel[]>([]);
  unreadCount = computed(() => this.allNotifications().filter((n) => !n.isRead).length);

  // Replaces loadUserNotifications for continuous real-time updates
  startPolling(userId: number): void {
    this.stopPolling(); // Clear existing timers to prevent memory leaks

    // Poll every 10 seconds (0ms initial delay, 10000ms interval)
    this.pollingSub = timer(0, 10000)
      .pipe(switchMap(() => this.http.get<NotificationModel[]>(this.apiUrl)))
      .subscribe((allNotes) => {
        let relevant = allNotes.filter(
          (n) => Number(n.userId) === Number(userId) || String(n.userId).toUpperCase() === 'ALL',
        );

        relevant.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        // Instantly updates the UI signal
        this.allNotifications.set(relevant);
      });
  }

  stopPolling(): void {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  markAsRead(notificationId: number): Observable<NotificationModel> {
    return this.http
      .patch<NotificationModel>(`${this.apiUrl}/${notificationId}`, { isRead: true })
      .pipe(
        tap(() => {
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

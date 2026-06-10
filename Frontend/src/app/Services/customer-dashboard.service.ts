import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { Booking } from '../Models/booking';
import { NotificationModel } from '../Models/notification';

@Injectable({
  providedIn: 'root',
})
export class CustomerDashboardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  getBookingsByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings?userId=${userId}`);
  }

  getNotificationsByUser(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.baseUrl}/notifications?userId=${userId}`);
  }
}

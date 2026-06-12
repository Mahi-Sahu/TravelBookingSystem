import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Destination } from '../Models/destination';
import { Observable, tap } from 'rxjs';
import { TravelService } from '../Models/travel-service';
import { Traveler } from '../Models/traveler';
import { Availaibility } from '../Models/availaibility';
import { Booking } from '../Models/booking';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService); // Inject it
  private apiUrl = 'http://localhost:3000/bookings';

  constructor() {}

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.baseUrl}/destinations`);
  }

  getTravelServices(): Observable<TravelService[]> {
    return this.http.get<TravelService[]>(`${this.baseUrl}/travelServices`);
  }

  getTravelServiceById(id: string): Observable<TravelService> {
    return this.http.get<TravelService>(`${this.baseUrl}/travelServices/${id}`);
  }

  getDestinationById(id: string): Observable<Destination> {
    return this.http.get<Destination>(`${this.baseUrl}/destinations/${id}`);
  }

  getTravelersByUser(userId: number): Observable<Traveler[]> {
    return this.http.get<Traveler[]>(`${this.baseUrl}/travelers?userId=${userId}`);
  }

  getTravelerById(id: string): Observable<Traveler> {
    return this.http.get<Traveler>(`${this.baseUrl}/travelers/${id}`);
  }

  getAvailabilityByService(serviceId: string): Observable<Availaibility[]> {
    return this.http.get<Availaibility[]>(`${this.baseUrl}/availability?serviceId=${serviceId}`);
  }

  getBookingsByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings?userId=${userId}`);
  }

  createBooking(bookingPayload: any): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, bookingPayload).pipe(
      tap((newBooking) => {
        // Automatically fire a notification to db.json on success
        this.notificationService
          .sendNotification({
            userId: newBooking.userId, // Target the user who just booked
            title: 'Booking Confirmed!',
            message: `Your booking (ID: ${newBooking.id}) has been successfully confirmed. Have a great trip!`,
            type: 'ALERT',
            isRead: false,
            timestamp: new Date().toISOString(),
          })
          .subscribe(); // Fire and forget
      }),
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destination } from '../Models/destination';
import { Observable } from 'rxjs';
import { TravelService } from '../Models/travel-service';
import { Traveler } from '../Models/traveler';
import { Availaibility } from '../Models/availaibility';
import { Booking } from '../Models/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

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

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/bookings`, booking);
  }

  getBookingsByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings?userId=${userId}`);
  }
}

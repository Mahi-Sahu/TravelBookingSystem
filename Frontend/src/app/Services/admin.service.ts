import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // --- BOOKINGS API ---

  getAllBookings(): Observable<any[]> {
    // 1. Fetch all three endpoints simultaneously using forkJoin
    return forkJoin({
      bookings: this.http.get<any[]>(`${this.apiUrl}/bookings`),
      users: this.http.get<any[]>(`${this.apiUrl}/users`),
      destinations: this.http.get<any[]>(`${this.apiUrl}/destinations`),
    }).pipe(
      // 2. Use the map operator to manually combine the data
      map(({ bookings, users, destinations }) => {
        return bookings.map((booking) => ({
          ...booking,

          user: users.find((u) => Number(u.id) === Number(booking.userId)),

          destination: destinations.find((d) => Number(d.id) === Number(booking.destinationId)),
        }));
      }),
    );
  }

  // Update a booking status
  updateBookingStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/bookings/${id}`, { status });
  }

  // DESTINATIONS API

  getAllDestinations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/destinations`);
  }

  deleteDestination(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/destinations/${id}`);
  }

  addDestination(destination: any) {
    return this.http.post(`${this.apiUrl}/destinations`, destination);
  }

  getDestinations() {
    return this.http.get<any[]>(`${this.apiUrl}/destinations`);
  }

  getAllTravelServices() {
    return forkJoin({
      travelServices: this.http.get<any[]>(`${this.apiUrl}/travelServices`),
      destinations: this.http.get<any[]>(`${this.apiUrl}/destinations`),
    }).pipe(
      map(({ travelServices, destinations }) => {
        return travelServices.map((service) => ({
          ...service,

          destination:
            destinations.find((d) => Number(d.id) === Number(service.destinationId)) || null,
        }));
      }),
    );
  }

  addTravelService(data: any) {
    return this.http.post(`${this.apiUrl}/travelServices`, data);
  }

  deleteTravelService(id: string) {
    return this.http.delete(`${this.apiUrl}/travelServices/${id}`);
  }

  updateTravelService(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/travelServices/${id}`, data);
  }

  getPriceRules() {
    return this.http.get<any[]>(`${this.apiUrl}/priceRules`);
  }

  addPriceRule(data: any) {
    return this.http.post(`${this.apiUrl}/priceRules`, data);
  }

  updatePriceRule(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/priceRules/${id}`, data);
  }

  deletePriceRule(id: string) {
    return this.http.delete(`${this.apiUrl}/priceRules/${id}`);
  }

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getNotifications() {
    return forkJoin({
      notifications: this.http.get<any[]>(`${this.apiUrl}/notifications`),
      users: this.http.get<any[]>(`${this.apiUrl}/users`),
    }).pipe(
      map(({ notifications, users }) => {
        return notifications.map((notification) => ({
          ...notification,

          user: users.find((u) => Number(u.id) === Number(notification.userId)),
        }));
      }),
    );
  }

  addNotification(data: any) {
    return this.http.post(`${this.apiUrl}/notifications`, data);
  }

  updateNotification(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/notifications/${id}`, data);
  }

  deleteNotification(id: string) {
    return this.http.delete(`${this.apiUrl}/notifications/${id}`);
  }

  getReportData() {
    return forkJoin({
      users: this.http.get<any[]>(`${this.apiUrl}/users`),
      bookings: this.http.get<any[]>(`${this.apiUrl}/bookings`),
    });
  }

  getAvailability() {
    return forkJoin({
      availability: this.http.get<any[]>(`${this.apiUrl}/availability`),
      services: this.http.get<any[]>(`${this.apiUrl}/travelServices`),
    }).pipe(
      map(({ availability, services }) => {
        return availability.map((item) => ({
          ...item,
          service: services.find((s) => Number(s.id) === Number(item.serviceId)),
        }));
      }),
    );
  }

  addAvailability(data: any) {
    return this.http.post(`${this.apiUrl}/availability`, data);
  }

  updateAvailability(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/availability/${id}`, data);
  }

  deleteAvailability(id: string) {
    return this.http.delete(`${this.apiUrl}/availability/${id}`);
  }

  getTravelServices() {
    return this.http.get<any[]>(`${this.apiUrl}/travelServices`);
  }

  getItineraries() {
    return forkJoin({
      itineraries: this.http.get<any[]>(`${this.apiUrl}/itineraries`),
      destinations: this.http.get<any[]>(`${this.apiUrl}/destinations`),
      itineraryDays: this.http.get<any[]>(`${this.apiUrl}/itineraryDays`),
    }).pipe(
      map(({ itineraries, destinations, itineraryDays }) => {
        return itineraries.map((itinerary) => {
          const destination = destinations.find(
            (d) => Number(d.id) === Number(itinerary.destinationId),
          );

          const days = itineraryDays.filter((d) => Number(d.itineraryId) === Number(itinerary.id));

          return {
            ...itinerary,
            destination,
            totalDays: days.length,
          };
        });
      }),
    );
  }

  addItinerary(data: any) {
    return this.http.post(`${this.apiUrl}/itineraries`, data);
  }

  updateItinerary(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/itineraries/${id}`, data);
  }

  deleteItinerary(id: string) {
    return this.http.delete(`${this.apiUrl}/itineraries/${id}`);
  }
}

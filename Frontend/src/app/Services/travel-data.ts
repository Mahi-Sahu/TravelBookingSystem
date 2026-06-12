import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TravelItem, TravelServicePackage } from '../Models/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  // These signals stay because they manage the Itinerary details (not search)
  selectedDestinationServices = signal<TravelServicePackage[]>([]);
  selectedPackageDays = signal<any[]>([]); 
  comparedItems = signal<TravelServicePackage[]>([]);
  loading = signal<boolean>(false);

  // --- NEW: PURE HTTP CALL FOR NGRX EFFECT ---
  getPackagesHttpOnly(): Observable<TravelItem[]> {
    return this.http.get<TravelItem[]>(`${this.baseUrl}/destinations`);
  }

  loadServicesForDestination(destinationId: string): Observable<TravelServicePackage[]> {
    this.loading.set(true);
    return this.http.get<TravelServicePackage[]>(`${this.baseUrl}/travelServices?destinationId=${destinationId}`).pipe(
      tap({
        next: (services) => {
          this.selectedDestinationServices.set(services);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }

  loadItineraryDaysByDestination(destinationId: string): Observable<any[]> {
    this.loading.set(true);
    return this.http.get<any[]>(`${this.baseUrl}/itineraries?destinationId=${destinationId}`).pipe(
      switchMap((itineraries) => {
        if (itineraries && itineraries.length > 0) {
          const itineraryId = itineraries[0].id;
          return this.http.get<any[]>(`${this.baseUrl}/itineraryDays?itineraryId=${itineraryId}`);
        }
        return new Observable<any[]>((subscriber) => subscriber.next([]));
      }),
      tap({
        next: (days) => {
          const sortedDays = days.sort((a, b) => a.dayNumber - b.dayNumber);
          this.selectedPackageDays.set(sortedDays);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }
}
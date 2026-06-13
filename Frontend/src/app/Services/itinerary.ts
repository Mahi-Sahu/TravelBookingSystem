import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Itinerary, ItineraryDay } from '../Models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  itineraries = signal<Itinerary[]>([]);
  selectedItineraryDays = signal<ItineraryDay[]>([]);
  loading = signal<boolean>(false);

  loadUserItineraries(userId: number): Observable<Itinerary[]> {
    this.loading.set(true);
    return this.http.get<Itinerary[]>(`${this.baseUrl}/itineraries?userId=${userId}`).pipe(
      tap({
        next: (data) => {
          this.itineraries.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }

  loadItineraryDetails(itineraryId: number): Observable<ItineraryDay[]> {
    return this.http.get<ItineraryDay[]>(`${this.baseUrl}/itineraryDays?itineraryId=${itineraryId}`).pipe(
      tap((days) => {
        const sortedDays = days.sort((a, b) => a.dayNumber - b.dayNumber);
        this.selectedItineraryDays.set(sortedDays);
      })
    );
  }
}

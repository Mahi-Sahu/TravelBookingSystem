import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Itinerary, ItineraryDay } from '../Models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  // State Management via Signals
  itineraries = signal<Itinerary[]>([]);
  selectedItineraryDays = signal<ItineraryDay[]>([]);
  loading = signal<boolean>(false);

  /**
   * Load all itineraries associated with a logged-in user
   */
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

  /**
   * Load day-wise schedule milestones details for a chosen itinerary container id
   */
  loadItineraryDetails(itineraryId: number): Observable<ItineraryDay[]> {
    return this.http.get<ItineraryDay[]>(`${this.baseUrl}/itineraryDays?itineraryId=${itineraryId}`).pipe(
      tap((days) => {
        // Sort explicitly by numerical order sequences
        const sortedDays = days.sort((a, b) => a.dayNumber - b.dayNumber);
        this.selectedItineraryDays.set(sortedDays);
      })
    );
  }
}
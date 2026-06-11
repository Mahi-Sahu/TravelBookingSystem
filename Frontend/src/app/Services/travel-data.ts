import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TravelItem, TravelServicePackage, TravelFilters } from '../Models/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  allPackages = signal<TravelItem[]>([]); 
  selectedDestinationServices = signal<TravelServicePackage[]>([]);
  selectedPackageDays = signal<any[]>([]); // New State: Caches chronological daily itinerary data
  comparedItems = signal<TravelServicePackage[]>([]);
  loading = signal<boolean>(false);

  filters = signal<TravelFilters>({
    destination: '',
    travelType: 'all',
    budgetRange: 50000,
    departureDate: '',
    duration: '',
    rating: 0
  });

  filteredPackages = computed(() => {
    const list = this.allPackages();
    const currentFilters = this.filters();

    return list.filter(item => {
      const matchDestination = !currentFilters.destination || 
        (item.name && item.name.toLowerCase().includes(currentFilters.destination.toLowerCase())) ||
        (item.country && item.country.toLowerCase().includes(currentFilters.destination.toLowerCase()));
        
      const matchType = currentFilters.travelType === 'all' || 
        (item.type && item.type.toLowerCase() === currentFilters.travelType.toLowerCase());
        
      const matchBudget = item.price <= currentFilters.budgetRange;
      const matchRating = item.rating >= currentFilters.rating;

      return matchDestination && matchType && matchBudget && matchRating;
    });
  });

  loadPackages(): Observable<TravelItem[]> {
    this.loading.set(true);
    return this.http.get<TravelItem[]>(`${this.baseUrl}/destinations`).pipe(
      tap({
        next: (data) => {
          this.allPackages.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
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

  /**
   * New Functional Mapping Rule: Queries itineraries to find matching day plans from db.json
   */
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
          // Sorts the timeline entries chronologically by day number
          const sortedDays = days.sort((a, b) => a.dayNumber - b.dayNumber);
          this.selectedPackageDays.set(sortedDays);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }

  updateFilters(newFilters: Partial<TravelFilters>): void {
    this.filters.update(prev => ({ ...prev, ...newFilters }));
  }
}
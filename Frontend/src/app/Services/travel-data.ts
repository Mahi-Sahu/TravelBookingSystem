import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TravelItem, TravelFilters } from '../Models/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  // State Management with Signals
  allPackages = signal<TravelItem[]>([]);
  filteredPackages = signal<TravelItem[]>([]);
  loading = signal<boolean>(false);

  /**
   * Loads all active travel item inventory listings from the database server.
   * Named explicitly to resolve the component compilation dependency.
   */
  loadPackages(): Observable<TravelItem[]> {
    this.loading.set(true);
    return this.http.get<TravelItem[]>(`${this.baseUrl}/travelItems`).pipe(
      tap({
        next: (data) => {
          this.allPackages.set(data);
          this.filteredPackages.set(data); // initially unfiltered
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }
}
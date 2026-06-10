import { Injectable, inject, signal, computed } from '@angular/core';
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

  // State Management with Angular Signals
  allPackages = signal<TravelItem[]>([]);
  comparedItems = signal<TravelItem[]>([]);
  loading = signal<boolean>(false);

  // Default initial filters state assignment matching model guidelines
  filters = signal<TravelFilters>({
    destination: '',
    travelType: 'all',
    budgetRange: 500000, // Reasonable high ceiling cap matching INR bounds
    departureDate: '',
    duration: '',
    rating: 0
  });

  /**
   * Computed selector to apply search filter parameters on top of allPackages stream
   */
  filteredPackages = computed(() => {
    const data = this.allPackages();
    const currentFilters = this.filters();

    return data.filter(item => {
      const matchDestination = !currentFilters.destination || 
        item.destination.toLowerCase().includes(currentFilters.destination.toLowerCase());
        
      const matchType = currentFilters.travelType === 'all' || 
        item.serviceType.toLowerCase() === currentFilters.travelType.toLowerCase();
        
      const matchBudget = item.price <= currentFilters.budgetRange;
      
      const matchRating = item.rating >= currentFilters.rating;

      return matchDestination && matchType && matchBudget && matchRating;
    });
  });

  loadPackages(): Observable<TravelItem[]> {
    this.loading.set(true);
    return this.http.get<TravelItem[]>(`${this.baseUrl}/travelItems`).pipe(
      tap({
        next: (data) => {
          this.allPackages.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }

  /**
   * Updates partial properties into the current filter criteria signal state
   */
  updateFilters(newFilters: Partial<TravelFilters>): void {
    this.filters.update(prev => ({ ...prev, ...newFilters }));
  }

  /**
   * Adds an item to the comparison selection deck (max 3 items)
   */
  addToComparison(item: TravelItem): void {
    const current = this.comparedItems();
    if (current.length < 3 && !current.some(i => i.id === item.id)) {
      this.comparedItems.set([...current, item]);
    }
  }

  /**
   * Removes a targeted entry item from comparison state selection matrix
   */
  removeFromComparison(id: string): void {
    this.comparedItems.update(items => items.filter(item => item.id !== id));
  }
}
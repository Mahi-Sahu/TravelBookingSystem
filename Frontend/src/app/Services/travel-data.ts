import { Injectable, signal, computed } from '@angular/core';
import { TravelItem, TravelFilters } from '../Models/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  // Mock Data mimicking catalog listings from your Backend system
  private allTravelCatalog = signal<TravelItem[]>([
    { id: '1', destination: 'Paris', travelDate: '2026-07-15', serviceType: 'flight', price: 450, duration: '8h', availability: 2, rating: 4.5, timing: 'Morning departure', features: ['In-flight Wi-Fi', '1 Checked Bag', 'Direct Flight'] },
    { id: '2', destination: 'Paris', travelDate: '2026-07-15', serviceType: 'hotel', price: 150, duration: '5 nights', availability: 1, rating: 4.2, timing: 'Check-in 2 PM', features: ['Free Breakfast', 'Pool Access', 'Free Cancelation'] },
    { id: '3', destination: 'Goa', travelDate: '2026-10-20', serviceType: 'package', price: 600, duration: '4 days', availability: 12, rating: 4.8, timing: 'Full Day Tour', features: ['All Meals Included', 'Airport Transfer', 'Beachfront Resort'] },
    { id: '4', destination: 'London', travelDate: '2026-08-05', serviceType: 'flight', price: 550, duration: '11h', availability: 8, rating: 4.6, timing: 'Overnight Flight', features: ['In-seat Entertainment', 'Premium Snacks'] }
  ]);

  // Reactive state management for tracking discovery filter properties
  filters = signal<TravelFilters>({
    destination: '',
    travelType: 'all',
    budgetRange: 1000,
    departureDate: '',
    duration: '',
    rating: 0
  });

  // Track an active comparison array (Functional target limit: 3 slots)
  comparedItems = signal<TravelItem[]>([]);

  // Computed selector compiling exact context configurations reactively
  filteredCatalog = computed(() => {
    const catalog = this.allTravelCatalog();
    const activeFilters = this.filters();

    return catalog.filter(item => {
      const matchesDest = !activeFilters.destination || 
        item.destination.toLowerCase().includes(activeFilters.destination.toLowerCase());
      const matchesType = activeFilters.travelType === 'all' || 
        item.serviceType === activeFilters.travelType;
      const matchesBudget = item.price <= activeFilters.budgetRange;
      const matchesDate = !activeFilters.departureDate || 
        item.travelDate === activeFilters.departureDate;
      const matchesRating = item.rating >= activeFilters.rating;

      return matchesDest && matchesType && matchesBudget && matchesDate && matchesRating;
    });
  });

  updateFilters(newFilters: Partial<TravelFilters>): void {
    this.filters.update(prev => ({ ...prev, ...newFilters }));
  }

  addToComparison(item: TravelItem): void {
    const currentList = this.comparedItems();
    if (currentList.length < 3 && !currentList.some(existing => existing.id === item.id)) {
      this.comparedItems.update(prev => [...prev, item]);
    }
  }

  removeFromComparison(id: string): void {
    this.comparedItems.update(prev => prev.filter(item => item.id !== id));
  }
}
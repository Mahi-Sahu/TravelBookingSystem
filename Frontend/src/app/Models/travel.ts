export interface TravelItem {
  id: string;
  destination: string;
  travelDate: string;
  serviceType: 'flight' | 'hotel' | 'package';
  price: number;
  duration: string;
  availability: number; // Low availability tracking rules apply below 3 items
  rating: number;
  features: string[];
  timing: string;
}

export interface TravelFilters {
  destination: string;
  travelType: 'all' | 'flight' | 'hotel' | 'package';
  budgetRange: number;
  departureDate: string;
  duration: string;
  rating: number;
}
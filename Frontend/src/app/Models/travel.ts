export interface Destination {
  id: number;
  name: string;
  country: string;
  price: number;
  duration: string;
  rating: number;
  type: string;
}

export interface TravelServiceItem {
  id: number;
  destinationId: number;
  serviceName: string;
  serviceType: 'FLIGHT' | 'HOTEL' | 'PACKAGE';
  provider: string;
  price: number;
  duration: string;
  rating: number;
  serviceUrl?: string;
}

// New filter interface specifically for pre-loading and filtering destinations
export interface DestinationFilters {
  destinationName: string;
  maxBudget: number;
  durationDays: string;
  type: string;
}

// DO NOT REMOVE: Keep the legacy interface exactly as it is to clear the TS compiler errors
export interface TravelFilters {
  destination: string;
  travelType: 'all' | 'flight' | 'hotel' | 'package';
  budgetRange: number;
  departureDate: string;
  duration: string;
  rating: number;
}

export interface TravelItem {
  id: string;
  destination: string;
  travelDate: string;
  name: string;         // Maps to destination city name (e.g. "Goa")
  country: string;      // Maps to destination country (e.g. "India")
  type: string;         // Maps to category landscaping (e.g. "Beach", "Hill Station")
  serviceType: 'flight' | 'hotel' | 'package';
  price: number;
  duration: string;
  availability: number;
  rating: number;
  features: string[];
  timing: string;
  url?: string;
}

export interface TravelServicePackage {
  id: string;
  destinationId: string;
  serviceName: string;
  serviceType: 'FLIGHT' | 'HOTEL' | 'PACKAGE';
  provider: string;
  price: number;
  duration: string;
  rating: number;
  serviceUrl?: string;
}
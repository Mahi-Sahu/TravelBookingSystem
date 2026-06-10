export interface ItineraryActivity {
  activityName: string;
  activityTime: string;
}

export interface ItineraryDay {
  id: number;
  itineraryId: number;
  dayNumber: number;
  date: string;
  transportType: string;
  transportFrom: string;
  transportTo: string;
  transportTime: string;
  hotel: string;
  checkInTime: string;
  activities: ItineraryActivity[];
}

export interface Itinerary {
  id: number;
  bookingId: number;
  userId: number;
  destinationId: number;
  title: string;
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
}
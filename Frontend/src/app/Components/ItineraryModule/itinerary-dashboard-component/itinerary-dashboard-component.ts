import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryService } from '../../../Services/itinerary';
import { ItineraryCardComponent } from '../itinerary-card-component/itinerary-card-component';
import { ItineraryDetailsComponent } from '../itinerary-details-component/itinerary-details-component';
import { Itinerary } from '../../../Models/itinerary';


@Component({
  selector: 'app-itinerary-dashboard-component',
  standalone: true,
  imports: [CommonModule, ItineraryCardComponent, ItineraryDetailsComponent],
  templateUrl: './itinerary-dashboard-component.html',
  styleUrl: './itinerary-dashboard-component.css'
})
export class ItineraryDashboardComponent implements OnInit {
  protected itineraryService = inject(ItineraryService);
  
  // Mock tracking current authenticated customer (Rahul Sharma id: 1)
  private currentUserId = 8; 
  selectedItinerary = signal<Itinerary | null>(null);

  ngOnInit(): void {
    this.itineraryService.loadUserItineraries(this.currentUserId).subscribe();
  }

  onSelectItinerary(itinerary: Itinerary): void {
    this.selectedItinerary.set(itinerary);
    this.itineraryService.loadItineraryDetails(itinerary.id).subscribe();
  }

  closeDetails(): void {
    this.selectedItinerary.set(null);
  }
}
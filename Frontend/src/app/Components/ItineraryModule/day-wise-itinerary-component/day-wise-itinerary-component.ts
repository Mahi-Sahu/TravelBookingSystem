import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryDay } from '../../../Models/itinerary';
import { AccommodationComponent } from '../accommodation-component/accommodation-component';
import { TransportComponent } from '../transport-component/transport-component';
import { ActivityListComponent } from '../activity-list-component/activity-list-component';

@Component({
  selector: 'app-day-wise-itinerary',
  standalone: true,
  imports: [
    CommonModule, 
    AccommodationComponent, 
    TransportComponent, 
    ActivityListComponent
  ],
  templateUrl: './day-wise-itinerary-component.html',
  styleUrl: './day-wise-itinerary-component.css'
})
export class DayWiseItineraryComponent {
  @Input({ required: true }) dayPlan!: ItineraryDay;
}
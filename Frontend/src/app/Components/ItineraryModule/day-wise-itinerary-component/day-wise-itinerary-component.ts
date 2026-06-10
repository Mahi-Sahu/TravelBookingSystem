import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryDay } from '../../../Models/itinerary';

@Component({
  selector: 'app-day-wise-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-wise-itinerary-component.html',
  styleUrl: './day-wise-itinerary-component.css'
})
export class DayWiseItineraryComponent {
  @Input({ required: true }) dayPlan!: ItineraryDay;
}
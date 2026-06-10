import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryActivity } from '../../../Models/itinerary';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-list-component.html',
  styleUrl: './activity-list-component.css'
})
export class ActivityListComponent {
  @Input({ required: true }) activities: ItineraryActivity[] = [];
}
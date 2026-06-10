import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itinerary } from '../../../Models/itinerary';

@Component({
  selector: 'app-itinerary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itinerary-card-component.html',
  styleUrl: './itinerary-card-component.css'
})
export class ItineraryCardComponent {
  @Input({ required: true }) itinerary!: Itinerary;
  @Input() isActive = false;
}
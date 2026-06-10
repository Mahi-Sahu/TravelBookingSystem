import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accommodation-component.html',
  styleUrl: './accommodation-component.css'
})
export class AccommodationComponent {
  @Input({ required: true }) hotelName!: string;
  @Input({ required: true }) checkInTime!: string;

  /**
   * Evaluates if a valid lodging placement exists.
   * Double negation (!!) explicitly casts truthy/falsy string evaluations into a strict boolean type.
   */
  hasValidHotel(): boolean {
    return !!this.hotelName && this.hotelName !== '-';
  }
}
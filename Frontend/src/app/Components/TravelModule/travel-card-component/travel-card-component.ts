import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelItem } from '../../../Models/travel'; // Updated import here

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-card-component.html',
  styleUrl: './travel-card-component.css'
})
export class TravelCardComponent {
  @Input({ required: true }) travelItem!: TravelItem; // Updated type here
  @Output() onSelect = new EventEmitter<TravelItem>(); // Updated type here

  handleCardClick(): void {
    this.onSelect.emit(this.travelItem);
  }
}
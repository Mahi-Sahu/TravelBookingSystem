import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelItem } from '../../../Models/travel';

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-card-component.html',
  styleUrl: './travel-card-component.css'
})
export class TravelCardComponent {
  // Fixed: Expects travelItem matching your parent template [travelItem]="item" declaration
  @Input({ required: true }) travelItem!: TravelItem;
}
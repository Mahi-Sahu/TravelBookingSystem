import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TravelItem } from '../../../Models/travel';

@Component({
  selector: 'app-travel-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-details-component.html',
  styleUrl: './travel-details-component.css'
})
export class TravelDetailsComponent {
  private router = inject(Router);

  @Input({ required: true }) travelItem!: TravelItem;
  @Output() onBack = new EventEmitter<void>();

  // Fixed: Changed travelItem.slotsAvailable to travelItem.availability
  isSoldOut = computed(() => (this.travelItem?.availability ?? 0) <= 0);

  initiateBookingWorkflow(): void {
    if (!this.isSoldOut()) {
      // Direct user into the reservation entry wizard, passing package metadata state
      this.router.navigate(['/book-trip'], { 
        queryParams: { packageId: this.travelItem.id } 
      });
    }
  }
}
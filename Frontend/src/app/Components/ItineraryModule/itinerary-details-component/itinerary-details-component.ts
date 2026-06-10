import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itinerary } from '../../../Models/itinerary';
import { ItineraryService } from '../../../Services/itinerary';
import { DayWiseItineraryComponent } from '../day-wise-itinerary-component/day-wise-itinerary-component';
import { DownloadSummaryComponent } from '../download-summary-component/download-summary-component';

@Component({
  selector: 'app-itinerary-details',
  standalone: true,
  imports: [CommonModule, DayWiseItineraryComponent, DownloadSummaryComponent],
  templateUrl: './itinerary-details-component.html',
  styleUrl: './itinerary-details-component.css'
})
export class ItineraryDetailsComponent {
  protected itineraryService = inject(ItineraryService);
  
  @Input({ required: true }) itinerary!: Itinerary;
  @Output() onBack = new EventEmitter<void>();
}
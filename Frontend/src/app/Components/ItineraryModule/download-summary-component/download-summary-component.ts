import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itinerary, ItineraryDay } from '../../../Models/itinerary';

@Component({
  selector: 'app-download-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-summary-component.html',
  styleUrl: './download-summary-component.css'
})
export class DownloadSummaryComponent {
  @Input({ required: true }) itinerary!: Itinerary;
  @Input({ required: true }) days!: ItineraryDay[];

  /**
   * Invokes native window print engines[cite: 129]. 
   * CSS media rules automatically switch standard desktop viewports over onto printable PDF format templates.
   */
  triggerPrintExport(): void {
    window.print();
  }
}
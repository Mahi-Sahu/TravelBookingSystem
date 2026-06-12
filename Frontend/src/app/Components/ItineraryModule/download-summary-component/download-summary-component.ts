import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itinerary, ItineraryDay } from '../../../Models/itinerary';
import { AuthService } from '../../../Services/auth-service';
import { Traveler } from '../../../Models/traveler';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  
  // NEW: Accept co-travelers as an input (defaults to empty array if none provided)
@Input() coTravelers: Traveler[] = [];

  protected authService = inject(AuthService);
  user = this.authService.currentUser(); 
  generationDate = Date.now();

  get filteredCoTravelers(): Traveler[] {
    if (!this.coTravelers || this.coTravelers.length === 0) return [];

    // Get the logged-in user's full name (lowercased for safe comparison)
    const primaryName = this.user ? `${this.user.firstName} ${this.user.lastName}`.toLowerCase().trim() : '';

    return this.coTravelers.filter(t => {
      const travelerName = t.fullName?.toLowerCase().trim();
      
      // Remove them from the list if their name matches the Primary User, 
      // OR if their database relationship is marked as 'Self'
      const isSameName = travelerName === primaryName;
      const isSelf = (t as any).relationship === 'Self';

      return !isSameName && !isSelf;
    });
  }

  downloadPdf(): void {
    const contentToPrint = document.getElementById('pdfContent');
    
    if (contentToPrint) {
      html2canvas(contentToPrint, { 
        scale: 2, 
        useCORS: true,
        scrollY: -window.scrollY 
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = position - pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        
        const safeTitle = this.itinerary.title ? this.itinerary.title.replace(/\s+/g, '_') : 'Trip';
        pdf.save(`${safeTitle}_Itinerary.pdf`);
      });
    }
  }
}
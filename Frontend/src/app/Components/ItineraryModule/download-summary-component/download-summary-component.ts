import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itinerary, ItineraryDay } from '../../../Models/itinerary';
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
  @Input({ required: true }) itinerary: Itinerary|null=null;
  @Input({ required: true }) days!: ItineraryDay[]; 

  downloadPdf(): void {
    // 1. Get the HTML element we want to turn into a PDF
    const contentToPrint = document.getElementById('pdfContent');
    
    if (contentToPrint) {
      // 2. Use html2canvas to take a high-quality picture of the HTML
      html2canvas(contentToPrint, { scale: 2 }).then((canvas) => {
        // Convert the canvas to an image
        const imgData = canvas.toDataURL('image/png');
        
        // 3. Create a new PDF document (A4 size)
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Calculate the width and height to fit the A4 page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // 4. Add the image to the PDF and trigger the download
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        const safeTitle = this.itinerary?.title ? this.itinerary.title.replace(/\s+/g, '_') : 'Trip';
        pdf.save(`${safeTitle}_Itinerary.pdf`);
      });
    }
  }
}
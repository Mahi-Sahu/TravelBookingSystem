import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-manage-itineraries-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-itineraries-component.html',
  styleUrl: './manage-itineraries-component.css',
})
export class ManageItinerariesComponent implements OnInit {
  itineraries: any[] = [];
  destinations: any[] = [];

  showModal = false;
  isEditMode = false;

  selectedId = '';

  itineraryForm = {
    bookingId: '',
    userId: '',
    destinationId: '',
    title: '',
    startDate: '',
    endDate: '',
    status: 'UPCOMING',
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadItineraries();
    this.loadDestinations();
  }

  loadItineraries() {
    this.adminService.getItineraries().subscribe({
      next: (data) => {
        this.itineraries = data;
        this.cdr.detectChanges();
      },
    });
  }

  loadDestinations() {
    this.adminService.getDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
      },
    });
  }

  openAddForm() {
    this.isEditMode = false;

    this.itineraryForm = {
      bookingId: '',
      userId: '',
      destinationId: '',
      title: '',
      startDate: '',
      endDate: '',
      status: 'UPCOMING',
    };

    this.showModal = true;
  }

  editItinerary(item: any) {
    this.isEditMode = true;

    this.selectedId = item.id;

    this.itineraryForm = {
      bookingId: item.bookingId,
      userId: item.userId,
      destinationId: String(item.destinationId),
      title: item.title,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status,
    };

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveItinerary() {
    this.isEditMode ? this.updateItinerary() : this.addItinerary();
  }

  addItinerary() {
    const nextId = Math.max(...this.itineraries.map((x) => Number(x.id)), 0) + 1;

    const payload = {
      id: String(nextId),
      ...this.itineraryForm,
      bookingId: Number(this.itineraryForm.bookingId),
      userId: Number(this.itineraryForm.userId),
      destinationId: Number(this.itineraryForm.destinationId),
    };

    this.adminService.addItinerary(payload).subscribe({
      next: () => {
        this.loadItineraries();
        this.closeModal();
      },
    });
  }

  updateItinerary() {
    const payload = {
      id: this.selectedId,
      ...this.itineraryForm,
      bookingId: Number(this.itineraryForm.bookingId),
      userId: Number(this.itineraryForm.userId),
      destinationId: Number(this.itineraryForm.destinationId),
    };

    this.adminService.updateItinerary(this.selectedId, payload).subscribe({
      next: () => {
        this.loadItineraries();
        this.closeModal();
      },
    });
  }

  deleteItinerary(id: string) {
    if (confirm('Delete itinerary?')) {
      this.adminService.deleteItinerary(id).subscribe(() => {
        this.loadItineraries();
      });
    }
  }
}

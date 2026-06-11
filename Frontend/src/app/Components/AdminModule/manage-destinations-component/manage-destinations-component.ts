import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-manage-destinations-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-destinations-component.html',
  styleUrl: './manage-destinations-component.css',
})
export class ManageDestinationsComponent implements OnInit {
  destinations: any[] = [];

  showAddForm = false;
  isEditMode = false;

  selectedDestinationId = '';

  newDestination = {
    name: '',
    country: '',
    type: '',
    duration: '',
    price: 0,
    rating: 0,
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchDestinations();
  }

  fetchDestinations() {
    this.adminService.getAllDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  openAddForm() {
    this.isEditMode = false;

    this.newDestination = {
      name: '',
      country: '',
      type: '',
      duration: '',
      price: 0,
      rating: 0,
    };

    this.showAddForm = true;
  }

  closeAddForm() {
    this.showAddForm = false;
  }

  editDestination(destination: any) {
    this.isEditMode = true;

    this.selectedDestinationId = destination.id;

    this.newDestination = {
      name: destination.name,
      country: destination.country,
      type: destination.type,
      duration: destination.duration,
      price: destination.price,
      rating: destination.rating,
    };

    this.showAddForm = true;
  }

  saveDestination() {
    if (this.isEditMode) {
      this.updateDestination();
    } else {
      this.addDestination();
    }
  }

  addDestination() {
    const numericIds = this.destinations.map((d) => Number(d.id)).filter((id) => !isNaN(id));

    const nextId = Math.max(...numericIds, 0) + 1;

    const payload = {
      id: String(nextId),
      ...this.newDestination,
    };

    this.adminService.addDestination(payload).subscribe({
      next: () => {
        this.fetchDestinations();
        this.closeAddForm();
      },
      error: (err) => console.error(err),
    });
  }

  updateDestination() {
    const payload = {
      id: this.selectedDestinationId,
      ...this.newDestination,
    };

    this.adminService.updateDestination(this.selectedDestinationId, payload).subscribe({
      next: () => {
        this.fetchDestinations();

        this.isEditMode = false;
        this.selectedDestinationId = '';

        this.closeAddForm();
      },
      error: (err) => console.error(err),
    });
  }

  deleteDestination(id: string) {
    if (confirm('Delete this destination?')) {
      this.adminService.deleteDestination(id).subscribe({
        next: () => {
          this.fetchDestinations();
        },
        error: (err) => console.error(err),
      });
    }
  }
}

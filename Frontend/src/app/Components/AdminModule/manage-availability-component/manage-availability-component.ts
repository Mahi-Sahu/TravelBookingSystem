import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-manage-availability-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-availability-component.html',
  styleUrl: './manage-availability-component.css',
})
export class ManageAvailabilityComponent implements OnInit {
  availabilities: any[] = [];
  services: any[] = [];

  showModal = false;
  isEditMode = false;

  selectedId = '';

  availabilityForm = {
    serviceId: '',
    availableSlots: null,
    status: 'AVAILABLE',
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAvailability();
    this.loadServices();
  }

  loadAvailability() {
    this.adminService.getAvailability().subscribe({
      next: (data) => {
        this.availabilities = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  loadServices() {
    this.adminService.getTravelServices().subscribe({
      next: (data) => {
        this.services = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  openAddForm() {
    this.isEditMode = false;

    this.availabilityForm = {
      serviceId: '',
      availableSlots: null,
      status: 'AVAILABLE',
    };

    this.showModal = true;
  }

  editAvailability(item: any) {
    this.isEditMode = true;

    this.selectedId = item.id;

    this.availabilityForm = {
      serviceId: String(item.serviceId),
      availableSlots: item.availableSlots,
      status: item.status,
    };

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveAvailability() {
    this.isEditMode ? this.updateAvailability() : this.addAvailability();
  }

  addAvailability() {
    const nextId = Math.max(...this.availabilities.map((x) => Number(x.id)), 0) + 1;

    const payload = {
      id: String(nextId),
      serviceId: Number(this.availabilityForm.serviceId),
      availableSlots: Number(this.availabilityForm.availableSlots),
      status: this.availabilityForm.status,
    };

    this.adminService.addAvailability(payload).subscribe({
      next: () => {
        this.loadAvailability();
        this.closeModal();
      },
    });
  }

  updateAvailability() {
    const payload = {
      id: this.selectedId,
      serviceId: Number(this.availabilityForm.serviceId),
      availableSlots: Number(this.availabilityForm.availableSlots),
      status: this.availabilityForm.status,
    };

    this.adminService.updateAvailability(this.selectedId, payload).subscribe({
      next: () => {
        this.loadAvailability();
        this.closeModal();
      },
    });
  }

  deleteAvailability(id: string) {
    if (!confirm('Delete Availability?')) {
      return;
    }

    this.adminService.deleteAvailability(id).subscribe({
      next: () => {
        this.loadAvailability();
      },
    });
  }
}

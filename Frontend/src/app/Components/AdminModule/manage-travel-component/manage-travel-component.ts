import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-manage-travel-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-travel-component.html',
  styleUrl: './manage-travel-component.css',
})
export class ManageTravelComponent implements OnInit {
  travelList: any[] = [];
  destinations: any[] = [];

  showModal = false;
  isEditMode = false;

  selectedTravelId = '';

  travelForm = {
    destinationId: '',
    serviceName: '',
    serviceType: '',
    provider: '',
    price: null as number | null,
    duration: '',
    rating: null as number | null,
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchTravelServices();
    this.fetchDestinations();
  }

  fetchTravelServices() {
    this.adminService.getAllTravelServices().subscribe({
      next: (data) => {
        this.travelList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  fetchDestinations() {
    this.adminService.getDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  openAddForm() {
    this.isEditMode = false;

    this.travelForm = {
      destinationId: '',
      serviceName: '',
      serviceType: '',
      provider: '',
      price: null,
      duration: '',
      rating: null,
    };

    this.showModal = true;
    this.cdr.detectChanges();
  }

  editTravel(travel: any) {
    this.isEditMode = true;

    this.selectedTravelId = travel.id;

    this.travelForm = {
      destinationId: String(travel.destinationId),
      serviceName: travel.serviceName,
      serviceType: travel.serviceType,
      provider: travel.provider,
      price: travel.price,
      duration: travel.duration,
      rating: travel.rating,
    };

    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.cdr.detectChanges();
  }

  saveTravelService() {
    if (this.isEditMode) {
      this.updateTravelService();
    } else {
      this.addTravelService();
    }
  }

  addTravelService() {
    const numericIds = this.travelList.map((item) => Number(item.id)).filter((id) => !isNaN(id));

    const nextId = Math.max(...numericIds, 0) + 1;

    const payload = {
      id: String(nextId),
      destinationId: Number(this.travelForm.destinationId),
      serviceName: this.travelForm.serviceName,
      serviceType: this.travelForm.serviceType,
      provider: this.travelForm.provider,
      price: this.travelForm.price,
      duration: this.travelForm.duration,
      rating: this.travelForm.rating,
    };

    this.adminService.addTravelService(payload).subscribe({
      next: () => {
        this.fetchTravelServices();
        this.closeModal();
      },
      error: (err) => console.error(err),
    });
  }

  updateTravelService() {
    const payload = {
      id: this.selectedTravelId,
      destinationId: Number(this.travelForm.destinationId),
      serviceName: this.travelForm.serviceName,
      serviceType: this.travelForm.serviceType,
      provider: this.travelForm.provider,
      price: this.travelForm.price,
      duration: this.travelForm.duration,
      rating: this.travelForm.rating,
    };

    this.adminService.updateTravelService(this.selectedTravelId, payload).subscribe({
      next: () => {
        this.fetchTravelServices();
        this.closeModal();
      },
      error: (err) => console.error(err),
    });
  }

  deleteTravel(id: string) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.adminService.deleteTravelService(id).subscribe({
        next: () => {
          this.fetchTravelServices();
        },
        error: (err) => console.error(err),
      });
    }
  }
}

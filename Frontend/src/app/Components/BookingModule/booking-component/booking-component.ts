import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Destination } from '../../../Models/destination';
import { TravelService } from '../../../Models/travel-service';
import { Traveler } from '../../../Models/traveler';
import { Availaibility } from '../../../Models/availaibility';
import { BookingService } from '../../../Services/booking-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  destinations: Destination[] = [];

  travelServices: TravelService[] = [];

  filteredServices: TravelService[] = [];

  travelers: Traveler[] = [];

  selectedTravelerIds: string[] = [];

  availability?: Availaibility;

  totalPrice = 0;

  userId = 1;

  constructor(private fb: FormBuilder,private bookingService: BookingService,private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDestinations();
    this.loadServices();
    this.loadTravelers();
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      destinationId: ['', Validators.required],
      serviceId: ['', Validators.required],
      travelDate: ['', Validators.required],
    });
  }

  loadDestinations(): void {
    this.bookingService.getDestinations().subscribe((response) => {
      this.destinations = response;
    });
    
  }

  loadTravelers(): void {
    this.bookingService.getTravelersByUser(this.userId).subscribe((response) => {
      this.travelers = response;
    });
  }

  onDestinationChange(): void {
    const destinationId = Number(this.bookingForm.get('destinationId')?.value);

    this.filteredServices = this.travelServices.filter(
      (service) => service.destinationId === destinationId,
    );

    this.bookingForm.patchValue({
      serviceId: '',
    });

    this.totalPrice = 0;
  }

  loadServices(): void {
    this.bookingService.getTravelServices().subscribe((response) => {
      this.travelServices = response;
    });
  }

  onServiceChange(): void {
    const serviceId = this.bookingForm.get('serviceId')?.value;

    this.bookingService.getAvailabilityByService(serviceId).subscribe((response) => {
      this.availability = response[0];
    });

    this.calculatePrice();
  }

  calculatePrice(): void {
    const serviceId = this.bookingForm.get('serviceId')?.value;

    const service = this.travelServices.find((service) => service.id === serviceId);

    if (!service) {
      this.totalPrice = 0;
      return;
    }

    this.totalPrice = service.price * this.selectedTravelerIds.length;
  }

  toggleTraveler(travelerId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedTravelerIds.push(travelerId);
    } else {
      this.selectedTravelerIds = this.selectedTravelerIds.filter((id) => id !== travelerId);
    }

    this.calculatePrice();
  }

  proceedToReview(): void {
    if (this.bookingForm.invalid || this.selectedTravelerIds.length === 0) {
      return;
    }

    const bookingData = {
      userId: this.userId,
      destinationId: Number(this.bookingForm.value.destinationId),
      serviceId: this.bookingForm.value.serviceId,
      travelDate: this.bookingForm.value.travelDate,
      travelerIds: this.selectedTravelerIds,
      travelers: this.selectedTravelerIds.length,
      totalPrice: this.totalPrice,
      status: 'PENDING',
    };

    this.router.navigate(['/customer/booking/review'], {
      state: { bookingData },
    });
  }
}

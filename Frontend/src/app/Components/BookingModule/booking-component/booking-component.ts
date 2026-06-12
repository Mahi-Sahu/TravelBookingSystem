import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Destination } from '../../../Models/destination';
import { TravelService } from '../../../Models/travel-service';
import { Traveler } from '../../../Models/traveler';
import { Availaibility } from '../../../Models/availaibility';
import { BookingService } from '../../../Services/booking-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { NavbarComponent } from '../../Shared/navbar-component/navbar-component';

@Component({
  selector: 'app-booking-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})
export class BookingComponent implements OnInit {
  destination?: Destination;
  selectedService?: TravelService;
  itineraryId = '';
  itineraryDays: any[] = [];

  bookingForm!: FormGroup;

  destinations: Destination[] = [];

  travelServices: TravelService[] = [];

  filteredServices: TravelService[] = [];

  travelers: Traveler[] = [];

  selectedTravelerIds: string[] = [];

  availability?: Availaibility;

  totalPrice = 0;

  userId = 0;

  private authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    const currentUser = this.authService.currentUser();
    if (currentUser && currentUser.id) {
      this.userId = currentUser.id;
    } else {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadTravelers();
    this.route.queryParams.subscribe((params) => {
      const destinationId = params['destinationId'];
      const serviceId = params['serviceId'];
      this.itineraryId = params['itineraryId'];

      if (destinationId) {
        this.loadDestinations(destinationId);
      }

      if (serviceId) {
        this.loadSelectedService(serviceId);
      }
    });
    this.itineraryDays = history.state.itineraryDays || [];
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      travelDate: ['', Validators.required],
    });
  }

  loadDestinations(destinationId: string): void {
    this.bookingService.getDestinationById(destinationId).subscribe((response) => {
      this.destination = response;
      this.cdr.detectChanges();
    });
  }

  loadSelectedService(serviceId: string): void {
    this.bookingService.getTravelServiceById(serviceId).subscribe((response) => {
      this.selectedService = response;
      this.calculatePrice();
      this.cdr.detectChanges();
    });
  }

  loadTravelers(): void {
    console.log("user id:", this.userId);
    this.bookingService.getTravelersByUser(this.userId).subscribe((response) => {
      console.log('Travelers:', response);
      this.travelers = response;
      this.cdr.detectChanges();
    });
  }

  calculatePrice(): void {
    if (!this.selectedService) {
      this.totalPrice = 0;
      return;
    }

    this.totalPrice = this.selectedService.price * this.selectedTravelerIds.length;
  }

  addTraveler(): void {
    this.router.navigate(['/customer/traveler/add'], {
      state: {
        destination: this.destination,
        selectedService: this.selectedService,
        itineraryId: this.itineraryId,
        itineraryDays: this.itineraryDays,
      },
    });
    this.cdr.detectChanges();
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
    if (!this.bookingForm.get('travelDate')?.value || this.selectedTravelerIds.length === 0) {
      return;
    }

    const bookingData = {
      userId: this.userId,
      destinationId: Number(this.destination?.id),
      serviceId: this.selectedService?.id,
      itineraryId: this.itineraryId,
      itineraryDays: this.itineraryDays,
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

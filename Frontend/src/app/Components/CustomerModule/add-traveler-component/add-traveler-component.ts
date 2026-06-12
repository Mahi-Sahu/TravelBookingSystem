import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../Services/booking-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-add-traveler-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-traveler-component.html',
  styleUrl: './add-traveler-component.css',
})
export class AddTravelerComponent implements OnInit {
  travelerForm!: FormGroup;
  userId = 0;
  navigationState: any;

  private authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
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
    this.navigationState = history.state;
  }

  initializeForm(): void {
    this.travelerForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      passportNumber: ['', Validators.required],
      relationship: ['', Validators.required],
    });
  }

  saveTraveler(): void {
    if (this.travelerForm.invalid) {
      return;
    }

    const traveler = {
      userId: Number(this.userId),
      ...this.travelerForm.value,
    };

    this.bookingService.createTraveler(traveler).subscribe({
      next: () => {
        alert('Traveler Added successfully');

        this.router.navigate(['/customer/booking'], {
          queryParams: {
            destinationId: this.navigationState.destination.id,
            serviceId: this.navigationState.selectedService.id,
            itineraryId: this.navigationState.itineraryId,
          },
          state: {
            itineraryDays: this.navigationState.itineraryDays,
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/customer/booking']);
  }
}

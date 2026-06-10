import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService); // Added AuthService

  registerForm = this.fb.nonNullable.group({
    userDetails: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      city: ['', Validators.required],
    }),
    travelerInfo: this.fb.group({
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', Validators.required],
      passportNumber: ['', Validators.required],
    }),
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.getRawValue();

      // Use Type Assertion (as Partial<User>) to resolve the nullability conflict
      const newUser = {
        role: 'CUSTOMER' as const,
        ...formData.userDetails,
      } as Partial<User>;

      console.log('User Payload for DB:', newUser);
      console.log('Traveler Payload for DB:', formData.travelerInfo);

      // Call API to save to db.json
      this.authService.register(newUser).subscribe({
        next: (createdUser) => {
          console.log('User created in DB:', createdUser);

          alert('Registration Successful! Let’s set up your preferences.');
          this.router.navigate(['/profile-preferences']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          alert('An error occurred during registration.');
        },
      });
    }
  }
}

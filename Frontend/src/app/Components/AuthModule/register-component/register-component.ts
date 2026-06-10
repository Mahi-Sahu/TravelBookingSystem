import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  registerForm = this.fb.nonNullable.group({
    // Matches the "users" table in db.json
    userDetails: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      city: ['', Validators.required],
    }),
    // Matches the "travelers" table in db.json (Primary Traveler)
    travelerInfo: this.fb.group({
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', Validators.required],
      passportNumber: ['', Validators.required],
    }),
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.getRawValue();

      // Construct the User object for db.json
      const newUser = {
        role: 'CUSTOMER', // Default role
        ...formData.userDetails,
      };

      console.log('User Payload for DB:', newUser);
      console.log('Traveler Payload for DB:', formData.travelerInfo);

      // After successful API post, redirect to login
      alert('Registration Successful! Please login.');
      this.router.navigate(['/login']);
    }
  }
}

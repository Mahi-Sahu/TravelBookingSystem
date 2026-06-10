import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          const role = this.authService.currentUser()?.role;

          // The correct routing flow based on your thought process:
          if (role === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']); // Admins go here
          } else {
            this.router.navigate(['/customer-dashboard']); // Customers go here
          }
        } else {
          this.loginError = 'Invalid email or password';
        }
      },
      error: () => {
        this.loginError = 'An error occurred while connecting to the server.';
      },
    });
  }
}

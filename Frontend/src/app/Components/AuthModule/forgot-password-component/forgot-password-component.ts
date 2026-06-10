import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.css',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  forgotForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;
      // Dummy logic fulfilling the requirement without actual SMS/Email backend
      alert(
        `Password Recovery Alert: A secure reset link has been sent to ${email}. Please check your inbox.`,
      );
      this.router.navigate(['/login']);
    }
  }
}

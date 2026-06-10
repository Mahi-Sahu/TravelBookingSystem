import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-preferences-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-preferences-component.html',
  styleUrl: './profile-preferences-component.css',
})
export class ProfilePreferencesComponent {
  private router = inject(Router);

  savePreferences(formValue: any) {
    console.log('Saved Preferences Payload:', formValue);

    // In a real app, you would POST this to a /preferences endpoint.
    alert('Preferences Updated Successfully! Redirecting to Dashboard...');

    // Onboarding complete, go to dynamic dashboard
    this.router.navigate(['/customer-dashboard']);
  }
}

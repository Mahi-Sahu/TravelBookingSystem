import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-preferences-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-preferences-component.html',
  styleUrl: './profile-preferences-component.css',
})
export class ProfilePreferencesComponent {
  savePreferences(formValue: any) {
    console.log('Saved Preferences:', formValue);
    alert('Preferences Updated Successfully!');
  }
}

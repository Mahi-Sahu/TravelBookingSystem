import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar-component.html',
  styleUrl: './admin-navbar-component.css',
})
export class AdminNavbarComponent {
  private router = inject(Router);

  authService = inject(AuthService);

  adminName = 'Admin';

  logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}

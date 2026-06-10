import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  // Using Angular Signals for reactive state management
  currentUser = signal<User | null>(this.loadUserFromStorage());

  login(email: string, password: string): Observable<boolean> {
    // Query json-server for matching credentials
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          delete user.password; // Remove password from memory

          this.currentUser.set(user);
          localStorage.setItem('sessionUser', JSON.stringify(user));
          return true;
        }
        return false;
      }),
    );
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('sessionUser');
  }

  hasRole(role: 'CUSTOMER' | 'ADMIN'): boolean {
    return this.currentUser()?.role === role;
  }

  private loadUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('sessionUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

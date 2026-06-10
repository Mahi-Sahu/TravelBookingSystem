import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
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
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users.length > 0) {
          this.setSession(users[0]);
          return true;
        }
        return false;
      }),
    );
  }

  // NEW: Register method that POSTs to db.json and logs the user in
  register(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData).pipe(
      tap((newUser) => {
        // Automatically log the user in after successful registration
        this.setSession(newUser);
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

  // Helper method to keep logic DRY
  private setSession(user: User) {
    const safeUser = { ...user };
    delete safeUser.password; // Remove password from memory
    this.currentUser.set(safeUser);
    localStorage.setItem('sessionUser', JSON.stringify(safeUser));
  }

  private loadUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('sessionUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

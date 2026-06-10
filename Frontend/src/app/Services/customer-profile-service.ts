import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerProfileService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/users/${id}`
    );
  }

  updateUser(
    id: number,
    user: User
  ): Observable<User> {

    return this.http.put<User>(
      `${this.baseUrl}/users/${id}`,
      user
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationRequestsService {
  constructor(private httpClient: HttpClient) {}

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<{ success: string; error: string }> {
    return this.httpClient.post<{ success: string; error: string }>(
      'http://localhost:5000/users/signup',
      user
    );
  }

  login(user: {
    email: string;
    password: string;
  }): Observable<{ success: string; user: User; error: string }> {
    const cart = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    return this.httpClient.post<{ success: string; user: User; error: string }>(
      'http://localhost:5000/users/login',
      { ...user, cart }
    );
  }
}

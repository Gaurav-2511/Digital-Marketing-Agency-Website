import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginRequest, LoginResponse, UserResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/auth';

  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem(this.tokenKey, response.token);

        localStorage.setItem(this.userKey, JSON.stringify(response.user));
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): UserResponse | null {
    const user = localStorage.getItem(this.userKey);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as UserResponse;
    } catch {
      return null;
    }
  }


  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payloadPart = token.split('.')[1];

      if (!payloadPart) {
        this.logout();
        return false;
      }

      const normalizedPayload = payloadPart
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const paddedPayload = normalizedPayload.padEnd(
        normalizedPayload.length +
        ((4 - (normalizedPayload.length % 4)) % 4),
        '=',
      );

      const payload = JSON.parse(atob(paddedPayload)) as {
        exp?: number;
      };

      if (
        typeof payload.exp !== 'number' ||
        payload.exp * 1000 <= Date.now()
      ) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      this.logout();
      return false;
    }
  }


  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'ADMIN';
  }
}

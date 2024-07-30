import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { loginSuccess } from '../actions/auth.actions';
import { logout } from '../actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private store: Store) {}

  signUp(signUpData: {
    name: string;
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/auth/signup`,
      signUpData
    );
  }

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          // Store the token and user data in localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          // Log the stored data for verification
          console.log('Stored token:', localStorage.getItem('token'));
          console.log('Stored user:', localStorage.getItem('user'));

          // Dispatch loginSuccess action with user data
          this.store.dispatch(loginSuccess({ user: response.user }));
        })
      );
  }

  logout(): void {
    // Clear any stored tokens or user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Dispatch logout action to update the state
    this.store.dispatch(logout());
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgotten-password`, { email });
  }

  resetPassword(resetPasswordData: {
    email: string;
    passwordResetToken: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/auth/reset-password`,
      resetPasswordData
    );
  }

  assignRole(userId: string, role: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/assign-role/${userId}`, {
      userId,
      role,
    });
  }

  deleteUserById(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/auth/delete/${userId}`);
  }

    // Fetch total number of users
    getUserCount(): Observable<{ count: number }> {
      return this.http.get<{ count: number }>(`${this.apiUrl}/auth/count`);
    }

    getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/auth/users`);
    }
}

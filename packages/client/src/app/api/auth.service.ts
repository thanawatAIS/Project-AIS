import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { loginSuccess } from '../actions/auth.actions';
import { logout } from '../actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private store: Store) {}

  signUp(signUpData: { name: string, email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/signup`, signUpData);
  }
  
  login(email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        console.log('Dispatching loginSuccess with user:', response.user);
        this.store.dispatch(loginSuccess({ user: response.user }));
      })
    );
  }

  logout(): void {
    // Clear any stored tokens or user data
    localStorage.removeItem('token'); // Remove token from localStorage

    // Dispatch logout action to update the state
    this.store.dispatch(logout());
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgotten-password`, { email });
  }

  resetPassword(resetPasswordData: { email: string, passwordResetToken: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/reset-password`, resetPasswordData);
  }

}
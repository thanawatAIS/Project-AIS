import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from '../actions/auth.actions';
import { User } from '../models/user.model';

export interface AuthState {
  user: User | null;
  error: any;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true,
    error: null,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    isLoggedIn: false,
    error: null,
  }))
);
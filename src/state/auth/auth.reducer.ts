import { createReducer, on } from '@ngrx/store';
import { User } from 'firebase/auth';
import {
  logIn,
  logInFailure,
  logInSuccess,
  logOut,
  logOutSuccess,
} from './auth.actions';

export interface AuthState {
  user: User | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'loggedin';
}

export const initialState: AuthState = {
  user: null,
  error: null,
  status: 'pending',
};

export const loginReducer = createReducer(
  initialState,
  on(logIn, (state, { user }) => ({ ...state, user })),

  on(logInSuccess, (state, { user }) => ({
    ...state,
    status: 'loggedin',
    user,
    error: null,
  })),

  on(logInFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),

  on(logOut, (state) => ({ ...state, user: null })),

  on(logOutSuccess, (state) => ({ ...state, status: 'pending', error: null }))
);

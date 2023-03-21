import { createAction, props } from '@ngrx/store';
import { User } from 'firebase/auth';

export const logIn = createAction(
  '[login page] Login',
  props<{ user: User }>()
);

export const logInSuccess = createAction(
  '[login API] Login Success',
  props<{ user: User }>()
);

export const logInFailure = createAction(
  '[login API] Login Failure',
  props<{ error: string }>()
);

export const logOut = createAction('[login page] Logout');

export const logOutSuccess = createAction('[login API] Logout Success');

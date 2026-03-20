import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from './login.model';

export const login = createAction(
  '[Login] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ data: LoginResponse }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);

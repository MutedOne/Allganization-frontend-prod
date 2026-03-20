import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.model';

export const selectLoginState =
  createFeatureSelector<LoginState>('loginReducer');

export const selectLoginToken = createSelector(
  selectLoginState,
  (state) => state.token
);

export const selectLoginError = createSelector(
  selectLoginState,
  (state) => state.error
);
export const checkIsAdminAccount = createSelector(
  selectLoginState,
  (state) => state.isAdmin
);

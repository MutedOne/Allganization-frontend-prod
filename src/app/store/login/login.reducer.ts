import { createReducer, on } from '@ngrx/store';

import { login, loginFailure, loginSuccess } from './login.actions';
import { initialState } from './login.state';

export const loginReducer = createReducer(
  initialState,

  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loginSuccess, (state, { data }) => ({
    ...state,
    token: data.token,
    isAdmin: data.isAdmin,
    loading: false,
    error: null,
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    token: null,
    isAdmin: 0,
  }))
);

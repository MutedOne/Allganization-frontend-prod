import { createReducer, on } from '@ngrx/store';

import {
  addAccount,
  addAccountFailure,
  addAccountSuccess,
} from './addAccount.actions';
import { initialState } from './addAccount.state';
import { AddAccountDefault } from 'src/app/interface/admin/account/account';

export const addAccountsReducer = createReducer(
  initialState,

  on(addAccount, (state) => ({
    ...state,
    data: AddAccountDefault(),
    message: '',
    error: null,
  })),

  on(addAccountSuccess, (state, { message }) => ({
    ...state,
    message: message,
    error: null,
  })),

  on(addAccountFailure, (state, { error }) => ({
    ...state,
    data: AddAccountDefault(),
    message: '',
    error: error,
  }))
);

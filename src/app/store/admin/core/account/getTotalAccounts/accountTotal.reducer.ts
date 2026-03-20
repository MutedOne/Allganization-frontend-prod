import { createReducer, on } from '@ngrx/store';

import {
  getTotalAccounts,
  getTotalAccountsFailure,
  getTotalAccountsSuccess,
} from './accountTotal.actions';
import { initialAccountTotalState } from './accountTotal.state';

export const accountTotalReducer = createReducer(
  initialAccountTotalState,

  on(getTotalAccounts, (state) => ({
    ...state,
    total: 0,
    loading: true,
    error: null,
  })),

  on(getTotalAccountsSuccess, (state, { data }) => ({
    ...state,
    total: data[0].total,
    loading: false,
    error: null,
  })),

  on(getTotalAccountsFailure, (state, { error }) => ({
    ...state,
    total: 0,
    loading: true,
    error: error,
  }))
);

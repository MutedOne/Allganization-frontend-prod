import { createReducer, on } from '@ngrx/store';

import {
  getAccounts,
  getAccountsFailure,
  getAccountsSuccess,
} from './account.actions';
import { initialState } from './account.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const accountReducer = createReducer(
  initialState,

  on(getAccounts, (state) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(getAccountsSuccess, (state, { data, pagination, total }) => ({
    ...state,
    data: data,
    total: total,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(getAccountsFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  }))
);

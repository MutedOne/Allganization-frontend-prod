import { createReducer, on } from '@ngrx/store';

import {
  getTotalBorrow,
  getTotalBorrowFailure,
  getTotalBorrowSuccess,
} from './requestTotal.action';
import { initialAccountTotalState } from './requestTotal.state';

export const borrowRequestTotalReducer = createReducer(
  initialAccountTotalState,

  on(getTotalBorrow, (state) => ({
    ...state,
    total: 0,
    loading: true,
    error: null,
  })),

  on(getTotalBorrowSuccess, (state, { data }) => ({
    ...state,
    total: data[0].total,
    loading: false,
    error: null,
  })),

  on(getTotalBorrowFailure, (state, { error }) => ({
    ...state,
    total: 0,
    loading: true,
    error: error,
  }))
);

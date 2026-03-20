import { createReducer, on } from '@ngrx/store';

import {
  getTotalBorrowCompleted,
  getTotalBorrowCompletedFailure,
  getTotalBorrowCompletedSuccess,
} from './requestTotal.action';
import { initialAccountTotalState } from './requestTotal.state';

export const borrowCompletedRequestTotalReducer = createReducer(
  initialAccountTotalState,

  on(getTotalBorrowCompleted, (state) => ({
    ...state,
    total: 0,
    loading: true,
    error: null,
  })),

  on(getTotalBorrowCompletedSuccess, (state, { data }) => ({
    ...state,
    total: data[0].total,
    loading: false,
    error: null,
  })),

  on(getTotalBorrowCompletedFailure, (state, { error }) => ({
    ...state,
    total: 0,
    loading: true,
    error: error,
  })),
);

import { createReducer, on } from '@ngrx/store';

import {
  getTotalApprovers,
  getTotalApproversFailure,
  getTotalApproversSuccess,
} from './approverTotal.actions';
import { initialAccountTotalState } from './formsTotal.state';

export const approverTotalReducer = createReducer(
  initialAccountTotalState,

  on(getTotalApprovers, (state) => ({
    ...state,
    total: 0,
    loading: true,
    error: null,
  })),

  on(getTotalApproversSuccess, (state, { data }) => ({
    ...state,
    total: data[0].total,
    loading: false,
    error: null,
  })),

  on(getTotalApproversFailure, (state, { error }) => ({
    ...state,
    total: 0,
    loading: true,
    error: error,
  }))
);

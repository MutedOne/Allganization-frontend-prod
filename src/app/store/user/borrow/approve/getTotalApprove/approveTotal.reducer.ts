import { createReducer, on } from '@ngrx/store';

import {
  getTotalApprove,
  getTotalApproveFailure,
  getTotalApproveSuccess,
} from './approveTotal.actions';
import { initialAccountTotalState } from './approveTotal.state';

export const approveRequestTotalReducer = createReducer(
  initialAccountTotalState,

  on(getTotalApprove, (state) => ({
    ...state,
    total: 0,
    loading: true,
    error: null,
  })),

  on(getTotalApproveSuccess, (state, { data }) => ({
    ...state,
    total: data[0].total,
    loading: false,
    error: null,
  })),

  on(getTotalApproveFailure, (state, { error }) => ({
    ...state,
    total: 0,
    loading: true,
    error: error,
  }))
);

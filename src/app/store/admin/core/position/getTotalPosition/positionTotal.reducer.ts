import { createReducer, on } from '@ngrx/store';

import {
  getTotalPosition,
  getTotalPositionFailure,
  getTotalPositionSuccess,
} from './positionTotal.actions';
import { initialPositionTotalState } from './positionTotal.state';

export const positionTotalReducer = createReducer(
  initialPositionTotalState,

  on(getTotalPosition, (state) => ({
    ...state,
    total: 0,
    loading: true,
    error: null,
  })),

  on(getTotalPositionSuccess, (state, { data }) => ({
    ...state,
    total: data[0].total,
    loading: false,
    error: null,
  })),

  on(getTotalPositionFailure, (state, { error }) => ({
    ...state,
    total: 0,
    loading: true,
    error: error,
  }))
);

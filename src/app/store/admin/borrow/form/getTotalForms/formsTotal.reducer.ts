import { createReducer, on } from '@ngrx/store';

import {
  getTotalForms,
  getTotalFormsFailure,
  getTotalFormsSuccess,
} from './formsTotal.actions';
import { initialAccountTotalState } from './formsTotal.state';

export const formsTotalReducer = createReducer(
  initialAccountTotalState,

  on(getTotalForms, (state) => ({
    ...state,
    total: 0,
    loading: true,
    error: null,
  })),

  on(getTotalFormsSuccess, (state, { data }) => ({
    ...state,
    total: data[0].total,
    loading: false,
    error: null,
  })),

  on(getTotalFormsFailure, (state, { error }) => ({
    ...state,
    total: 0,
    loading: true,
    error: error,
  }))
);

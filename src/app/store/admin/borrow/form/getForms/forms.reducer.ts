import { createReducer, on } from '@ngrx/store';

import { getForms, getFormsFailure, getFormsSuccess } from './forms.actions';
import { initialState } from './forms.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const formsReducer = createReducer(
  initialState,

  on(getForms, (state) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(getFormsSuccess, (state, { data, pagination, total }) => ({
    ...state,
    data: data,
    total: total,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(getFormsFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  }))
);

import { createReducer, on } from '@ngrx/store';

import {
  getBorrowRequest,
  getBorrowRequestFailure,
  getBorrowRequestSuccess,
} from './request.actions';
import { initialState } from './request.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const borrowRequestReducer = createReducer(
  initialState,

  on(getBorrowRequest, (state) => ({
    ...state,
    data: [],
    total: 0,
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(getBorrowRequestSuccess, (state, { data, pagination, total }) => ({
    ...state,
    data: data,
    total: total,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(getBorrowRequestFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  }))
);

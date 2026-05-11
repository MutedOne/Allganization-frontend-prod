import { createReducer, on } from '@ngrx/store';

import {
  BorrowRequestCompleted,
  BorrowRequestCompletedFailure,
  BorrowRequestCompletedSuccess,
} from './request.actions';
import { initialState } from './request.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const borrowCompletedRequestReducer = createReducer(
  initialState,

  on(BorrowRequestCompleted, (state) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(BorrowRequestCompletedSuccess, (state, { data, pagination, total }) => ({
    ...state,
    data: data,
    total: total,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(BorrowRequestCompletedFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  })),
);

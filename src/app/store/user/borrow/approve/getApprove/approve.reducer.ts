import { createReducer, on } from '@ngrx/store';

import {
  getApproveRequest,
  getApproveRequestFailure,
  getApproveRequestSuccess,
} from './approve.actions';
import { initialState } from './approve.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const approveRequestReducer = createReducer(
  initialState,

  on(getApproveRequest, (state) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(getApproveRequestSuccess, (state, { data, pagination }) => ({
    ...state,
    data: data,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(getApproveRequestFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  }))
);

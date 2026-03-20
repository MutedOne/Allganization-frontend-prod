import { createReducer, on } from '@ngrx/store';

import {
  getApprover,
  getApproverFailure,
  getApproverSuccess,
} from './approver.actions';
import { initialState } from './approver.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const approverReducer = createReducer(
  initialState,

  on(getApprover, (state) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(getApproverSuccess, (state, { data, pagination }) => ({
    ...state,
    data: data,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(getApproverFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  }))
);

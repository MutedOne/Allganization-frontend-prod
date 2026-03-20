import { createReducer, on } from '@ngrx/store';

import {
  getDepartment,
  getDepartmentFailure,
  getDepartmentSuccess,
} from './department.actions';
import { initialState } from './department.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const departmentReducer = createReducer(
  initialState,

  on(getDepartment, (state) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(getDepartmentSuccess, (state, { data, pagination }) => ({
    ...state,
    data: data,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(getDepartmentFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  }))
);

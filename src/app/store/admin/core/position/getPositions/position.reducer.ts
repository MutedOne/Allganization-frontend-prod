import { createReducer, on } from '@ngrx/store';

import {
  getPosition,
  getPositionFailure,
  getPositionSuccess,
} from './position.actions';
import { initialState } from './position.state';
import { defaultPagination } from 'src/app/interface/pagination';

export const positionReducer = createReducer(
  initialState,

  on(getPosition, (state) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: true,
    error: null,
  })),

  on(getPositionSuccess, (state, { data, pagination }) => ({
    ...state,
    data: data,
    pagination: pagination,
    loading: false,
    error: null,
  })),

  on(getPositionFailure, (state, { error }) => ({
    ...state,
    data: [],
    pagination: defaultPagination(),
    loading: false,
    error: error,
  }))
);

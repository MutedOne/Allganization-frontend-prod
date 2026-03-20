import { createReducer, on } from '@ngrx/store';

import { initialState } from './request.state';
import { defaultPagination } from 'src/app/interface/pagination';
import { AddBorrowRequestDefault } from 'src/app/interface/admin/borrow/borrow';
import {
  addBorrowRequest,
  addBorrowRequestFailure,
  addBorrowRequestSuccess,
} from './request.actions';

export const addBorrowRequestReducer = createReducer(
  initialState,

  on(addBorrowRequest, (state) => ({
    ...state,
    data: AddBorrowRequestDefault(),
    message: '',
    error: null,
  })),

  on(addBorrowRequestSuccess, (state, { message }) => ({
    ...state,
    message: message,
    error: null,
  })),

  on(addBorrowRequestFailure, (state, { error }) => ({
    ...state,
    data: AddBorrowRequestDefault(),
    message: '',
    error: error,
  }))
);

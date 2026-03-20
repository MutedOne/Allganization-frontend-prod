import { createReducer, on } from '@ngrx/store';

import {
  addPosition,
  addPositionFailure,
  addPositionSuccess,
} from './addPosition.actions';
import { initialState } from './addPosition.state';
import { defaultPagination } from 'src/app/interface/pagination';
import { formDefault } from 'src/app/interface/admin/borrow/form';
import { AddDepartmentDefault } from 'src/app/interface/admin/account/department';

export const addPositionsReducer = createReducer(
  initialState,

  on(addPosition, (state) => ({
    ...state,
    data: AddDepartmentDefault(),
    message: '',
    error: null,
  })),

  on(addPositionSuccess, (state, { message }) => ({
    ...state,
    message: message,
    error: null,
  })),

  on(addPositionFailure, (state, { error }) => ({
    ...state,
    data: AddDepartmentDefault(),
    message: '',
    error: error,
  }))
);

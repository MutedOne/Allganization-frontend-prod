import { createReducer, on } from '@ngrx/store';

import { addForm, addFormFailure, addFormSuccess } from './addform.actions';
import { initialState } from './addform.state';
import { defaultPagination } from 'src/app/interface/pagination';
import { formDefault } from 'src/app/interface/admin/borrow/form';

export const addFormsReducer = createReducer(
  initialState,

  on(addForm, (state) => ({
    ...state,
    data: formDefault(),
    message: '',
    error: null,
  })),

  on(addFormSuccess, (state, { message }) => ({
    ...state,
    message: message,
    error: null,
  })),

  on(addFormFailure, (state, { error }) => ({
    ...state,
    data: formDefault(),
    message: '',
    error: error,
  }))
);

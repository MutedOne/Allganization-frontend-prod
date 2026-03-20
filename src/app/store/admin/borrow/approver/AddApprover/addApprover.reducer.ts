import { createReducer, on } from '@ngrx/store';

import {
  addApprover,
  addApproverFailure,
  addApproverSuccess,
} from './addApprover.actions';
import { initialState } from './addApprover.state';
import { defaultPagination } from 'src/app/interface/pagination';
import { formDefault } from 'src/app/interface/admin/borrow/form';
import { AddApproverDefault } from 'src/app/interface/admin/borrow/approver';

export const addApproversReducer = createReducer(
  initialState,

  on(addApprover, (state) => ({
    ...state,
    data: AddApproverDefault(),
    message: '',
    error: null,
  })),

  on(addApproverSuccess, (state, { message }) => ({
    ...state,
    message: message,
    error: null,
  })),

  on(addApproverFailure, (state, { error }) => ({
    ...state,
    data: AddApproverDefault(),
    message: '',
    error: error,
  }))
);

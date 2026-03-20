import { createAction, props } from '@ngrx/store';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';
import { AddBorrowRequest } from 'src/app/interface/admin/borrow/borrow';

export const addBorrowRequest = createAction(
  '[Borrow Request] addBorrowRequest',
  (data: AddBorrowRequest) => ({ data })
);

export const addBorrowRequestSuccess = createAction(
  '[Borrow Request] addBorrowRequestSuccess',
  props<{ message: string }>()
);

export const addBorrowRequestFailure = createAction(
  '[Borrow Request] addBorrowRequestFailure',
  props<{ error: string }>()
);

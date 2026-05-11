import { createAction, props } from '@ngrx/store';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

import { BorrowRequest } from 'src/app/interface/admin/borrow/borrow';

export const getBorrowRequest = createAction(
  '[Borrow Request] getBorrowRequest',
  (pagination: Pagination, viewId: ViewId) => ({ pagination, viewId })
);

export const getBorrowRequestSuccess = createAction(
  '[Borrow Request] getBorrowRequestSuccess',
  props<{ data: BorrowRequest[]; pagination: Pagination, total: number }>()
);

export const getBorrowRequestFailure = createAction(
  '[Borrow Request] getBorrowRequestFailure',
  props<{ error: string }>()
);

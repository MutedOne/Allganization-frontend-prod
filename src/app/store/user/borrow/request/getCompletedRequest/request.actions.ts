import { createAction, props } from '@ngrx/store';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

import { BorrowRequest } from 'src/app/interface/admin/borrow/borrow';

export const BorrowRequestCompleted = createAction(
  '[Borrow Request] BorrowRequestCompleted',
  (pagination: Pagination, viewId: ViewId) => ({ pagination, viewId }),
);

export const BorrowRequestCompletedSuccess = createAction(
  '[Borrow Request] BorrowRequestCompletedSuccess',
  props<{ data: BorrowRequest[]; pagination: Pagination, total: number }>(),
);

export const BorrowRequestCompletedFailure = createAction(
  '[Borrow Request] BorrowRequestCompletedFailure',
  props<{ error: string }>(),
);

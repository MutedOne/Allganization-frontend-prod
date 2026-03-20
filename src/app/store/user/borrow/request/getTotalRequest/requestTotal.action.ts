import { createAction, props } from '@ngrx/store';

import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getTotalBorrow = createAction(
  '[Borrow Request] getTotalBorrow',
  (viewId: ViewId) => ({ viewId })
);

export const getTotalBorrowSuccess = createAction(
  '[Borrow Request] getTotalBorrowSuccess',
  props<{ data: Totalpage[] }>()
);

export const getTotalBorrowFailure = createAction(
  '[Borrow Request] getTotalBorrowFailure',
  props<{ error: string }>()
);

import { createAction, props } from '@ngrx/store';

import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getTotalBorrowCompleted = createAction(
  '[Borrow Request] getTotalBorrowCompleted',
  (viewId: ViewId) => ({ viewId }),
);

export const getTotalBorrowCompletedSuccess = createAction(
  '[Borrow Request] getTotalBorrowCompletedSuccess',
  props<{ data: Totalpage[] }>(),
);

export const getTotalBorrowCompletedFailure = createAction(
  '[Borrow Request] getTotalBorrowCompletedFailure',
  props<{ error: string }>(),
);

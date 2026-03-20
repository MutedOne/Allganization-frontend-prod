import { createAction, props } from '@ngrx/store';

import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getTotalApprove = createAction(
  '[Approve Request] getTotalApprove',
  (viewId: ViewId) => ({ viewId })
);

export const getTotalApproveSuccess = createAction(
  '[Approve Request] getTotalApproveSuccess',
  props<{ data: Totalpage[] }>()
);

export const getTotalApproveFailure = createAction(
  '[Approve Request] getTotalApproveFailure',
  props<{ error: string }>()
);

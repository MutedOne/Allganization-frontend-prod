import { createAction, props } from '@ngrx/store';

import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getTotalApprovers = createAction(
  '[Approver] getTotalApprovers',
  (viewId: ViewId) => ({ viewId })
);

export const getTotalApproversSuccess = createAction(
  '[Approver] getTotalApproversSuccess',
  props<{ data: Totalpage[] }>()
);

export const getTotalApproversFailure = createAction(
  '[Approver] getTotalApproversFailure',
  props<{ error: string }>()
);

import { createAction, props } from '@ngrx/store';

import { Pagination } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

import { Approver } from 'src/app/interface/admin/borrow/approver';

export const getApprover = createAction(
  '[Approver] getApprover',
  (pagination: Pagination, viewId: ViewId) => ({ pagination, viewId })
);

export const getApproverSuccess = createAction(
  '[Approver] getApproverSuccess',
  props<{ data: Approver[]; pagination: Pagination; total: number }>()
);

export const getApproverFailure = createAction(
  '[Approver] getApproverFailure',
  props<{ error: string }>()
);

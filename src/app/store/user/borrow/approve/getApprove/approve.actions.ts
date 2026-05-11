import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

import {
  Approver,
  ApproveRequest,
} from 'src/app/interface/admin/borrow/approver';

export const getApproveRequest = createAction(
  '[Approve Request] getApproveRequest',
  (pagination: Pagination, viewId: ViewId) => ({ pagination, viewId })
);

export const getApproveRequestSuccess = createAction(
  '[Approve Request] getApproveRequestSuccess',
  props<{ data: ApproveRequest[]; pagination: Pagination; total: number }>()
);

export const getApproveRequestFailure = createAction(
  '[Approve Request] getApproveRequestFailure',
  props<{ error: string }>()
);

import { createAction, props } from '@ngrx/store';

import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';
import { Message, ViewId } from 'src/app/interface/global';
import { Form } from 'src/app/interface/admin/borrow/form';
import { AddApprover } from 'src/app/interface/admin/borrow/approver';

export const addApprover = createAction(
  '[Approver] addApprover',
  (data: AddApprover) => ({
    data,
  })
);

export const addApproverSuccess = createAction(
  '[Approver] addApproverSuccess',
  props<{ message: string }>()
);

export const addApproverFailure = createAction(
  '[Approver] addApproverFailure',
  props<{ error: string }>()
);

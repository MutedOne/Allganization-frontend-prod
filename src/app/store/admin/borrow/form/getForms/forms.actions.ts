import { createAction, props } from '@ngrx/store';

import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';
import { Form } from 'src/app/interface/admin/borrow/form';

export const getForms = createAction(
  '[Forms] getForms',
  (pagination: Pagination, viewId: ViewId) => ({ pagination, viewId })
);

export const getFormsSuccess = createAction(
  '[Forms] getFormsSuccess',
  props<{ data: Form[]; pagination: Pagination }>()
);

export const getFormsFailure = createAction(
  '[Forms] getFormsFailure',
  props<{ error: string }>()
);

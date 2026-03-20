import { createAction, props } from '@ngrx/store';

import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';
import { Message, ViewId } from 'src/app/interface/global';
import { Form } from 'src/app/interface/admin/borrow/form';

export const addForm = createAction('[Forms] addForm', (data: any) => ({
  data,
}));

export const addFormSuccess = createAction(
  '[Forms] addFormSuccess',
  props<{ message: string }>(),
);

export const addFormFailure = createAction(
  '[Forms] addFormFailure',
  props<{ error: string }>(),
);

import { createAction, props } from '@ngrx/store';

import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';
import { Message, ViewId } from 'src/app/interface/global';
import { Form } from 'src/app/interface/admin/borrow/form';
import { AddDepartment } from 'src/app/interface/admin/account/department';

export const addPosition = createAction(
  '[Position] addPosition',
  (data: AddDepartment) => ({
    data,
  })
);

export const addPositionSuccess = createAction(
  '[Position] addPositionSuccess',
  props<{ message: string }>()
);

export const addPositionFailure = createAction(
  '[Position] addPositionFailure',
  props<{ error: string }>()
);

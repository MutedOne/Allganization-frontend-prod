import { createAction, props } from '@ngrx/store';

import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';
import { Position } from 'src/app/interface/admin/account/position';
import { Department } from 'src/app/interface/admin/account/department';

export const getDepartment = createAction(
  '[Position] getDepartment',
  (pagination: Pagination, viewId: ViewId) => ({ pagination, viewId })
);

export const getDepartmentSuccess = createAction(
  '[Position] getDepartmentSuccess',
  props<{ data: Department[]; pagination: Pagination }>()
);

export const getDepartmentFailure = createAction(
  '[getDepartment] getDepartmentFailure',
  props<{ error: string }>()
);

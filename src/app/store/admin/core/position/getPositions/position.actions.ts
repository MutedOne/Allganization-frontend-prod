import { createAction, props } from '@ngrx/store';

import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';
import { Position } from 'src/app/interface/admin/account/position';

export const getPosition = createAction(
  '[Position] getPosition',
  (pagination: Pagination, viewId: ViewId) => ({ pagination, viewId })
);

export const getPositionSuccess = createAction(
  '[Position] getPositionSuccess',
  props<{ data: Position[]; pagination: Pagination }>()
);

export const getPositionFailure = createAction(
  '[getPosition] getPositionFailure',
  props<{ error: string }>()
);

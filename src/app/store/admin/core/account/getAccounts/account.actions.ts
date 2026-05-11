import { createAction, props } from '@ngrx/store';

import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getAccounts = createAction(
  '[Account] getAccounts',
  (pagination: Pagination, accountId: ViewId) => ({ pagination, accountId })
);

export const getAccountsSuccess = createAction(
  '[Account] getAccountsSuccess',
  props<{ data: Account[]; pagination: Pagination; total: number }>()
);

export const getAccountsFailure = createAction(
  '[Account] getAccountsFailure',
  props<{ error: string }>()
);

import { createAction, props } from '@ngrx/store';

import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getTotalAccounts = createAction(
  '[Account] getTotalAccounts',
  (viewId: ViewId) => ({ viewId })
);

export const getTotalAccountsSuccess = createAction(
  '[Account] getTotalAccountsSuccess',
  props<{ data: Totalpage[] }>()
);

export const getTotalAccountsFailure = createAction(
  '[Account] getTotalAccountsFailure',
  props<{ error: string }>()
);

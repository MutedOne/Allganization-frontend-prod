import { createAction, props } from '@ngrx/store';

import { AddAccount } from 'src/app/interface/admin/account/account';

export const addAccount = createAction(
  '[Account] addAccount',
  (data: AddAccount) => ({
    data,
  })
);

export const addAccountSuccess = createAction(
  '[Account] addAccountSuccess',
  props<{ message: string }>()
);

export const addAccountFailure = createAction(
  '[Account] addAccountFailure',
  props<{ error: string }>()
);

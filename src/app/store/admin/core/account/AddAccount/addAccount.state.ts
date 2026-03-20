import { addAccount } from './addAccount.model';

import { AddAccountDefault } from 'src/app/interface/admin/account/account';

export const initialState: addAccount = {
  data: AddAccountDefault(),
  message: '',
  error: null,
};

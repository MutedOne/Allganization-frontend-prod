import { AddAccount } from 'src/app/interface/admin/account/account';

export interface addAccount {
  data: AddAccount;
  message: string;
  error: string | null;
}

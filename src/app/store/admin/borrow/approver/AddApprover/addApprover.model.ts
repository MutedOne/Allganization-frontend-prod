import { Account } from 'src/app/interface/admin/account/account';
import { AddApprover } from 'src/app/interface/admin/borrow/approver';

export interface addApprover {
  data: AddApprover;
  message: string;
  error: string | null;
}

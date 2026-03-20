import { Account } from 'src/app/interface/admin/account/account';
import { Approver } from 'src/app/interface/admin/borrow/approver';
import { Form } from 'src/app/interface/admin/borrow/form';
import { Pagination } from 'src/app/interface/pagination';

export interface getApprover {
  data: Approver[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

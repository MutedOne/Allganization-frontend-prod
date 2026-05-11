import { Account } from 'src/app/interface/admin/account/account';
import { Form } from 'src/app/interface/admin/borrow/form';
import { Pagination } from 'src/app/interface/pagination';

export interface GetForms {
  data: Form[];
  total: number;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

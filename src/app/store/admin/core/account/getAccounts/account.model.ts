import { Account } from 'src/app/interface/admin/account/account';
import { Pagination } from 'src/app/interface/pagination';

export interface GetAccount {
  data: Account[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

import { Account } from 'src/app/interface/admin/account/account';
import { Department } from 'src/app/interface/admin/account/department';
import { Position } from 'src/app/interface/admin/account/position';
import { Pagination } from 'src/app/interface/pagination';

export interface getDepartment {
  data: Department[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

import { Account } from 'src/app/interface/admin/account/account';
import { Position } from 'src/app/interface/admin/account/position';
import { Pagination } from 'src/app/interface/pagination';

export interface GetPosition {
  data: Position[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

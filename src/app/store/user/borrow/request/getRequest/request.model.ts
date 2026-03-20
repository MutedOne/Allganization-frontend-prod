import { BorrowRequest } from 'src/app/interface/admin/borrow/borrow';
import { Pagination } from 'src/app/interface/pagination';

export interface getBorrowRequest {
  data: BorrowRequest[];

  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

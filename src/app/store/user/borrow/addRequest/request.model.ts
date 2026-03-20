import { AddBorrowRequest } from 'src/app/interface/admin/borrow/borrow';
import { Pagination } from 'src/app/interface/pagination';

export interface addBorrowRequest {
  data: AddBorrowRequest;
  message: string;
  error: string | null;
}

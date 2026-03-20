import { defaultPagination } from 'src/app/interface/pagination';
import { AddBorrowRequestDefault } from 'src/app/interface/admin/borrow/borrow';
import { addBorrowRequest } from './request.model';

export const initialState: addBorrowRequest = {
  data: AddBorrowRequestDefault(),
  message: '',
  error: null,
};

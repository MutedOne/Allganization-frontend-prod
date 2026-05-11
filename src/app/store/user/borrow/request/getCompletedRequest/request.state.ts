import { defaultPagination } from 'src/app/interface/pagination';
import { getBorrowRequest } from './request.model';

export const initialState: getBorrowRequest = {
  data: [],
  pagination: defaultPagination(),
  total: 0,
  loading: false,
  error: null,
};

import { defaultPagination } from 'src/app/interface/pagination';
import { getBorrowRequest } from './request.model';

export const initialState: getBorrowRequest = {
  data: [],
  total: 0,
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

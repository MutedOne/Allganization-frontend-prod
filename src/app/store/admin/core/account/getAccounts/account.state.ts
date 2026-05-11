import { defaultPagination } from 'src/app/interface/pagination';
import { GetAccount } from './account.model';

export const initialState: GetAccount = {
  data: [],
  total: 0,
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

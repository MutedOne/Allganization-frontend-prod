import { defaultPagination } from 'src/app/interface/pagination';
import { GetAccount } from './account.model';

export const initialState: GetAccount = {
  data: [],
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

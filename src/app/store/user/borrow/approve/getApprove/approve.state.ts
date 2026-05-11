import { defaultPagination } from 'src/app/interface/pagination';
import { getApproveRequest } from './approve.model';

export const initialState: getApproveRequest = {
  data: [],
  total: 0,
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

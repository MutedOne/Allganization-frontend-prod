import { defaultPagination } from 'src/app/interface/pagination';
import { getApprover } from './approver.model';

export const initialState: getApprover = {
  data: [],
  total: 0,
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

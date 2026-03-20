import { defaultPagination } from 'src/app/interface/pagination';
import { getApprover } from './approver.model';

export const initialState: getApprover = {
  data: [],
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

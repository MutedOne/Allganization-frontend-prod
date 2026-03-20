import { defaultPagination } from 'src/app/interface/pagination';
import { getApproveRequest } from './approve.model';

export const initialState: getApproveRequest = {
  data: [],
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

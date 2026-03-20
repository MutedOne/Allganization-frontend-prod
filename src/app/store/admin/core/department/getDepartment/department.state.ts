import { defaultPagination } from 'src/app/interface/pagination';
import { getDepartment } from './department.model';

export const initialState: getDepartment = {
  data: [],
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

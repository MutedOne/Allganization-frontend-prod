import { defaultPagination } from 'src/app/interface/pagination';
import { GetForms } from './forms.model';

export const initialState: GetForms = {
  data: [],
  total: 0,
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

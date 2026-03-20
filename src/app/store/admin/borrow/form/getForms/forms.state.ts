import { defaultPagination } from 'src/app/interface/pagination';
import { GetForms } from './forms.model';

export const initialState: GetForms = {
  data: [],
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

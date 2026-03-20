import { defaultPagination } from 'src/app/interface/pagination';
import { GetPosition } from './position.model';

export const initialState: GetPosition = {
  data: [],
  pagination: defaultPagination(),
  loading: false,
  error: null,
};

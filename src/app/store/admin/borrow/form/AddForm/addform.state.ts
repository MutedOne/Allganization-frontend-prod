import { defaultPagination } from 'src/app/interface/pagination';
import { addForm } from './addform.model';
import { formDefault } from 'src/app/interface/admin/borrow/form';

export const initialState: addForm = {
  data: formDefault(),
  message: '',
  error: null,
};

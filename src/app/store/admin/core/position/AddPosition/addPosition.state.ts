import { defaultPagination } from 'src/app/interface/pagination';
import { addPosition } from './addPosition.model';
import { formDefault } from 'src/app/interface/admin/borrow/form';
import { AddDepartmentDefault } from 'src/app/interface/admin/account/department';

export const initialState: addPosition = {
  data: AddDepartmentDefault(),
  message: '',
  error: null,
};

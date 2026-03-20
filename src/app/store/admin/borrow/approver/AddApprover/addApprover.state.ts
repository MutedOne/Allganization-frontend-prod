import { defaultPagination } from 'src/app/interface/pagination';
import { addApprover } from './addApprover.model';
import { formDefault } from 'src/app/interface/admin/borrow/form';
import { AddApproverDefault } from 'src/app/interface/admin/borrow/approver';

export const initialState: addApprover = {
  data: AddApproverDefault(),
  message: '',
  error: null,
};

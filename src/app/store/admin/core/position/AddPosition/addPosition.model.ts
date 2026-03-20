import { Account } from 'src/app/interface/admin/account/account';
import { AddDepartment } from 'src/app/interface/admin/account/department';
import { Form } from 'src/app/interface/admin/borrow/form';
import { Message } from 'src/app/interface/global';
import { Pagination } from 'src/app/interface/pagination';

export interface addPosition {
  data: AddDepartment;
  message: string;
  error: string | null;
}

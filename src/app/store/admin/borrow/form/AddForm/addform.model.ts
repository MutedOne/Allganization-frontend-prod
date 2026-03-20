import { Account } from 'src/app/interface/admin/account/account';
import { Form } from 'src/app/interface/admin/borrow/form';
import { Message } from 'src/app/interface/global';
import { Pagination } from 'src/app/interface/pagination';

export interface addForm {
  data: Form;
  message: string;
  error: string | null;
}

import { PaginationDetails } from "../../pagination";

export interface Account {
  account_history_id: number;
  department: string;
  end: Date;
  id: number;
  name: string;
  position: string;
  username: string;
}

export interface AddAccount {
  username: string;
  name: string;
  password: string;
  position_id: number;
  department_id: number;
  isAdmin: boolean;
}

export const AddAccountDefault = (): AddAccount => ({
  username: '',
  name: '',
  password: '',
  position_id: 0,
  department_id: 0,
  isAdmin: false,
});

export interface AccountList extends PaginationDetails {
  listAccount: Account[];
}
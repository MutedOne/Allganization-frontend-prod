import { Totalpage } from 'src/app/interface/pagination';

export interface getTotalAccountsState {
  total: number;
  loading: boolean;
  error: null | string;
}

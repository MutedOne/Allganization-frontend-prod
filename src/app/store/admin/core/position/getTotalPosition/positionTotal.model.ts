import { Totalpage } from 'src/app/interface/pagination';

export interface getTotalPositionState {
  total: number;
  loading: boolean;
  error: null | string;
}

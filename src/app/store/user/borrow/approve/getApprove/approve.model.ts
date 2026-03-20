import { Pagination } from 'src/app/interface/pagination';
import { ApproveRequest } from 'src/app/interface/user/borrow/request/request';

export interface getApproveRequest {
  data: ApproveRequest[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

import { PaginationDetails } from "../../pagination";

export interface BorrowRequest {
  created_on: Date;
  currentApprovers: number;
  form_id: number;
  form_name: string;
  id: number;
  next_approver_name: string;
  purpose: string;
  totalApprovers: number;
}

export interface AddBorrowRequest {
  form_id: number;
  purpose: string;
}
export const AddBorrowRequestDefault = (): AddBorrowRequest => ({
  form_id: 0,
  purpose: ''
});
export interface GetAllBorrowRequest {
  countApprovers: number;
  id: number;
  name: string;
  description: string;
}


export interface requestList extends PaginationDetails {
  listAssetRequest: BorrowRequest[];
}


export interface completedRequestList extends PaginationDetails {
  listOfCompletedAssetRequest: BorrowRequest[];
}

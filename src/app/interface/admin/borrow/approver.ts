import { PaginationDetails } from "../../pagination";

export interface Approver {
  form_name: string;
  form_id: number;
  approvers: string[];
}
export const PositionDefault = (): Approver => ({
  form_name: '',
  form_id: 0,
  approvers: [''],
});

export interface ApproveRequest {
  approver_id: number;
  countApprover: number;
  created_on: Date;
  id: number;
  name: string;
  purpose: string;
  requester_name: string;
}
export const ApproveRequestDefault = (): ApproveRequest => ({
  approver_id: 0,
  countApprover: 0,
  created_on: new Date(),
  id: 0,
  name: '',
  purpose: '',
  requester_name: '',
});

export interface AddApprover {
  form_id: number;
  approvers: number[];
}
export const AddApproverDefault = (): AddApprover => ({
  form_id: 0,
  approvers: [],
});


export interface approverList extends PaginationDetails {
  listApprover: Approver[];
}

export interface approveRequestList extends PaginationDetails {
  listOfApprovalRequest: ApproveRequest[];
}
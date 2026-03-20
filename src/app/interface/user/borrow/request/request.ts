export interface Request {
  next_approver_name: string;
  id: number;
  purpose: string;
  form_name: string;
  form_id: number;
  created_on: string;
  totalApprovers: number;
  currentApprovers: number;
}

export interface ApproveRequest {
  approver_id: number;
  countApprover: number;
  created_on: Date;
  id: number;
  name: string;
  purpose: string;
  requester_name: string;
}

export interface Form {
  name: string;
  description: string;
  countApprovers: number;
  placedSignature: number[];
  id?: number;
}

export const formDefault = (): Form => ({
  name: '',
  description: '',
  countApprovers: 1,
  placedSignature: [],
  id: 0,
});

export interface AddForm {
  approvers: number[];
  form_id: number;
}
export const AddFormDefault = (): AddForm => ({
  approvers: [],
  form_id: 0,
});

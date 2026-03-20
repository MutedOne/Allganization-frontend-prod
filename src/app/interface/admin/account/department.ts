export interface AddDepartment {
  id: number;
  level: number;
  position: string;
  department: string;
  code: string;
}

export const AddDepartmentDefault = (): AddDepartment => ({
  id: 0,
  level: 0,
  position: '',
  department: '',
  code: '',
});
export interface Department {
  id: number;
  name: string;
  occupiedLevel: number;
}

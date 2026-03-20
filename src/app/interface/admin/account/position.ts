export interface AddPosition {
  id: number;
  level: number;
  position: string;
  department: string;
  quantity: number;
}

export interface Position {
  id: number;
  level: number;
  position: string;
  department: string;
  quantity: number;
}
export const PositionDefault = (): Position => ({
  id: 0,
  level: 0,
  position: '',
  department: '',
  quantity: 0,
});
export interface ViewPosition {
  id: number;
  level: number;
  position: string;
  department: string;
  quantity: number;
}

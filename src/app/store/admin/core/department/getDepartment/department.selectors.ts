import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getDepartment } from './department.model';
import { Position } from 'src/app/interface/admin/account/position';
import { Department } from 'src/app/interface/admin/account/department';

export const selectDepartmentState =
  createFeatureSelector<getDepartment>('departmentReducer');

export const selectDepartment = createSelector(
  selectDepartmentState,
  (state): Department[] => state.data
);
export const selectDepartmentPagination = createSelector(
  selectDepartmentState,
  (state) => state.pagination
);
export const selectDepartmentError = createSelector(
  selectDepartmentState,
  (state) => state.error
);

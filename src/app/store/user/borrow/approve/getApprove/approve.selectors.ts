import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getApproveRequest } from './approve.model';

export const selectApprovedState = createFeatureSelector<getApproveRequest>(
  'approveRequestReducer'
);

export const selectApproved = createSelector(
  selectApprovedState,
  (state) => state.data
);
export const selectApprovedPagination = createSelector(
  selectApprovedState,
  (state) => state.pagination
);
export const selectApprovedTotal = createSelector(
  selectApprovedState,
  (state) => state.total
);
export const selectApprovedLoading = createSelector(
  selectApprovedState,
  (state) => state.loading
);
export const selectApprovedError = createSelector(
  selectApprovedState,
  (state) => state.error
);

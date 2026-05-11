import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getApprover } from './approver.model';

export const selectApproverState =
  createFeatureSelector<getApprover>('approverReducer');

export const selectApprover = createSelector(
  selectApproverState,
  (state) => state.data
);
export const selectApproverPagination = createSelector(
  selectApproverState,
  (state) => state.pagination
);
export const selectListApproverTotal = createSelector(
  selectApproverState,
  (state) => state.total
);
export const selectApproverError = createSelector(
  selectApproverState,
  (state) => state.error
);
export const selectApproverLoading = createSelector(
  selectApproverState,
  (state) => state.loading
);

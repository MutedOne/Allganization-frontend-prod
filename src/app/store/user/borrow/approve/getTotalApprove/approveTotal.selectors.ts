import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTotalApproveState } from './approveTotal.model';

export const selectApprovedTotalState =
  createFeatureSelector<getTotalApproveState>('approveRequestTotalReducer');

export const selectApprovedTotal = createSelector(
  selectApprovedTotalState,
  (state) => state.total
);

export const selectApprovedTotalFailure = createSelector(
  selectApprovedTotalState,
  (state) => state.error
);

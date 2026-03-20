import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTotalApproversState } from './approverTotal.model';

export const selectApproverTotalState =
  createFeatureSelector<getTotalApproversState>('approverTotalReducer');

export const selectTotalApprovers = createSelector(
  selectApproverTotalState,
  (state) => state.total
);

export const selectTotalApproversFailure = createSelector(
  selectApproverTotalState,
  (state) => state.error
);

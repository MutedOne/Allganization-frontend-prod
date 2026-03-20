import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTotalBorrowState } from './requestTotal.model';

export const selectBorrowTotalState =
  createFeatureSelector<getTotalBorrowState>(
    'borrowCompletedRequestTotalReducer',
  );

export const selectBorrowTotalCompleted = createSelector(
  selectBorrowTotalState,
  (state) => state.total,
);

export const selectBorrowTotalCompletedFailure = createSelector(
  selectBorrowTotalState,
  (state) => state.error,
);

export const selectBorrowTotalCompletedLoading = createSelector(
  selectBorrowTotalState,
  (state) => state.loading,
);

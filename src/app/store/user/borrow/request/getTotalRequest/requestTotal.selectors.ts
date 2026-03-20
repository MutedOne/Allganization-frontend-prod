import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTotalBorrowState } from './requestTotal.model';

export const selectBorrowTotalState =
  createFeatureSelector<getTotalBorrowState>('borrowRequestTotalReducer');

export const selectBorrowTotal = createSelector(
  selectBorrowTotalState,
  (state) => state.total
);

export const selectBorrowTotalFailure = createSelector(
  selectBorrowTotalState,
  (state) => state.error
);

export const selectBorrowTotalLoading = createSelector(
  selectBorrowTotalState,
  (state) => state.loading
);

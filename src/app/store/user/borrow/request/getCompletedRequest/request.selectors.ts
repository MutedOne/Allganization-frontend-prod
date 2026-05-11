import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getBorrowRequest } from './request.model';

export const selectBorrowState = createFeatureSelector<getBorrowRequest>(
  'borrowCompletedRequestReducer',
);

export const selectBorrowCompleted = createSelector(
  selectBorrowState,
  (state) => state.data,
);
export const selectBorrowCompletedPagination = createSelector(
  selectBorrowState,
  (state) => state.pagination,
);

export const selectBorrowCompletedtotal = createSelector(
  selectBorrowState,
  (state) => state.total,
);

export const selectBorrowCompletedLoading = createSelector(
  selectBorrowState,
  (state) => state.loading,
);
export const selectBorrowCompletedError = createSelector(
  selectBorrowState,
  (state) => state.error,
);

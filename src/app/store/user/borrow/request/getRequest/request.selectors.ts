import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getBorrowRequest } from './request.model';

export const selectBorrowState = createFeatureSelector<getBorrowRequest>(
  'borrowRequestReducer'
);

export const selectBorrow = createSelector(
  selectBorrowState,
  (state) => state.data
);
export const selectBorrowPagination = createSelector(
  selectBorrowState,
  (state) => state.pagination
);
export const selectBorrowError = createSelector(
  selectBorrowState,
  (state) => state.error
);

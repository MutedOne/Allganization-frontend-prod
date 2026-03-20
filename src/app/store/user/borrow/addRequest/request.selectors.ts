import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addBorrowRequest } from './request.model';

export const selectBorrowState = createFeatureSelector<addBorrowRequest>(
  'addBorrowRequestReducer'
);

export const selectBorrowSuccess = createSelector(
  selectBorrowState,
  (state) => state.message
);
export const selectBorrowError = createSelector(
  selectBorrowState,
  (state) => state.error
);

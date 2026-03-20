import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTotalAccountsState } from './accountTotal.model';

export const selectAccountTotalState =
  createFeatureSelector<getTotalAccountsState>('accountTotalReducer');

export const selectTotalAccounts = createSelector(
  selectAccountTotalState,
  (state) => state.total
);

export const selectTotalAccountsFailure = createSelector(
  selectAccountTotalState,
  (state) => state.error
);

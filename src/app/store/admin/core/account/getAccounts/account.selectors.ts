import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GetAccount } from './account.model';

export const selectAccountState =
  createFeatureSelector<GetAccount>('accountReducer');

export const selectAccount = createSelector(
  selectAccountState,
  (state) => state.data
);
export const selectAccountPagination = createSelector(
  selectAccountState,
  (state) => state.pagination
);
export const selectAccountError = createSelector(
  selectAccountState,
  (state) => state.error
);

export const selectAccountLoading = createSelector(
  selectAccountState,
  (state) => state.loading
);

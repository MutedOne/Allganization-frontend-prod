import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addAccount } from './addAccount.model';

export const selectPositionState =
  createFeatureSelector<addAccount>('addAccountsReducer');

export const addAccountSuccess = createSelector(
  selectPositionState,
  (state) => state.message
);

export const addAccountError = createSelector(
  selectPositionState,
  (state) => state.error
);

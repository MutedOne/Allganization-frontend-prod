import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addApprover } from './addApprover.model';

export const selectFormState = createFeatureSelector<addApprover>(
  'addApproversReducer'
);

export const addApproverSuccess = createSelector(
  selectFormState,
  (state) => state.message
);

export const selectLoginError = createSelector(
  selectFormState,
  (state) => state.error
);

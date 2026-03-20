import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTotalFormsState } from './formsTotal.model';

export const selectFormsTotalState =
  createFeatureSelector<getTotalFormsState>('formsTotalReducer');

export const selectTotalforms = createSelector(
  selectFormsTotalState,
  (state) => state.total
);

export const selectTotalFormsFailure = createSelector(
  selectFormsTotalState,
  (state) => state.error
);

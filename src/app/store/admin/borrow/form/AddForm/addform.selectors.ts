import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addForm } from './addform.model';

export const selectFormState =
  createFeatureSelector<addForm>('addFormsReducer');

export const addFormSuccess = createSelector(
  selectFormState,
  (state) => state.message
);

export const selectLoginError = createSelector(
  selectFormState,
  (state) => state.error
);

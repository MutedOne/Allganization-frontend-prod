import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GetForms } from './forms.model';

export const selectFormState = createFeatureSelector<GetForms>('formsReducer');

export const selectForm = createSelector(
  selectFormState,
  (state) => state.data
);
export const selectFormPagination = createSelector(
  selectFormState,
  (state) => state.pagination
);
export const selectFormError = createSelector(
  selectFormState,
  (state) => state.error
);
export const selectFormLoading = createSelector(
  selectFormState,
  (state) => state.loading
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addPosition } from './addPosition.model';

export const selectPositionState = createFeatureSelector<addPosition>(
  'addPositionsReducer'
);

export const addPositionSuccess = createSelector(
  selectPositionState,
  (state) => state.message
);

export const addPositionFailure = createSelector(
  selectPositionState,
  (state) => state.error
);

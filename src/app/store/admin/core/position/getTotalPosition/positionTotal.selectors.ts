import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTotalPositionState } from './positionTotal.model';

export const selectTotalPositionState =
  createFeatureSelector<getTotalPositionState>('positionTotalReducer');

export const selectTotalPosition = createSelector(
  selectTotalPositionState,
  (state) => state.total
);

export const selectTotalPositionFailure = createSelector(
  selectTotalPositionState,
  (state) => state.error
);

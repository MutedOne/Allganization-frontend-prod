import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GetPosition } from './position.model';
import { Position } from 'src/app/interface/admin/account/position';

export const selectPositionState =
  createFeatureSelector<GetPosition>('positionReducer');

export const selectPosition = createSelector(
  selectPositionState,
  (state): Position[] => state.data
);
export const selectPositionPagination = createSelector(
  selectPositionState,
  (state) => state.pagination
);
export const selectPositionError = createSelector(
  selectPositionState,
  (state) => state.error
);
export const selectPositionLoading = createSelector(
  selectPositionState,
  (state) => state.loading
);

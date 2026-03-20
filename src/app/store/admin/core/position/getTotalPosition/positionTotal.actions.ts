import { createAction, props } from '@ngrx/store';

import { Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getTotalPosition = createAction(
  '[Position] getTotalPosition',
  (viewId: ViewId) => ({ viewId })
);

export const getTotalPositionSuccess = createAction(
  '[Position] getTotalPositionSuccess',
  props<{ data: Totalpage[] }>()
);

export const getTotalPositionFailure = createAction(
  '[Position] getTotalPositionFailure',
  props<{ error: string }>()
);

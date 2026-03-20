import { createAction, props } from '@ngrx/store';

import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { ViewId } from 'src/app/interface/global';

export const getTotalForms = createAction(
  '[Forms] getTotalForms',
  (viewId: ViewId) => ({ viewId })
);

export const getTotalFormsSuccess = createAction(
  '[Forms] getTotalFormsSuccess',
  props<{ data: Totalpage[] }>()
);

export const getTotalFormsFailure = createAction(
  '[Forms] getTotalFormsFailure',
  props<{ error: string }>()
);

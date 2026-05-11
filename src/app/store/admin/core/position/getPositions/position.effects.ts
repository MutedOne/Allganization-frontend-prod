import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  getPosition,
  getPositionFailure,
  getPositionSuccess,
} from './position.actions';
import { PositionService } from 'src/app/services/admin/account/position.service';

@Injectable()
export class PositionEffects {
  private actions$ = inject(Actions);
  private positionService = inject(PositionService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPosition),

      exhaustMap((action) =>
        this.positionService
          .getAllPosition(action.pagination, action.viewId)
          .pipe(
            map((response) => {
              const { listPosition, total, ...pagination } = response
              return getPositionSuccess({
                data: response.listPosition,
                total: response.total,
                pagination: pagination,
              })
            }),

            catchError((error: any) => {
              return of(getPositionFailure({ error: error.error.message }));
            })
          )
      )
    );
  });
}

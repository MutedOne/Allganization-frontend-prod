import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/admin/account/account.service';
import {
  getTotalPosition,
  getTotalPositionFailure,
  getTotalPositionSuccess,
} from './positionTotal.actions';
import { PositionService } from 'src/app/services/admin/account/position.service';

@Injectable()
export class PositionTotalEffects {
  private actions$ = inject(Actions);
  private positionService = inject(PositionService);

  getTotalPosition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalPosition),
      tap((action) => console.log('Action received in Effect:', action)),
      exhaustMap((action) =>
        this.positionService.getAllTotalPosition(action.viewId).pipe(
          map((response) =>
            getTotalPositionSuccess({
              data: response,
            })
          ),

          catchError((error: any) => {
            return of(getTotalPositionFailure({ error: error.error.message }));
          })
        )
      )
    );
  });
}

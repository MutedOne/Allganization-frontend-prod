import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  getTotalBorrow,
  getTotalBorrowFailure,
  getTotalBorrowSuccess,
} from './requestTotal.action';

import { RequestService } from 'src/app/services/user/borrow/request.service';

@Injectable()
export class BorrowRequestTotalEffects {
  private actions$ = inject(Actions);
  private requestService = inject(RequestService);

  getTotalBorrow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalBorrow),

      exhaustMap((action) =>
        this.requestService.getTotalRequest(action.viewId).pipe(
          map((response) => getTotalBorrowSuccess({ data: response })),
          tap((action) => console.log('Action received in Effect:', action)),
          catchError((error: any) => {
            return of(getTotalBorrowFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  getTotalBorrowCompleted,
  getTotalBorrowCompletedFailure,
  getTotalBorrowCompletedSuccess,
} from './requestTotal.action';

import { RequestService } from 'src/app/services/user/borrow/request.service';

@Injectable()
export class BorrowCompletedRequestTotalEffects {
  private actions$ = inject(Actions);
  private requestService = inject(RequestService);

  getTotalBorrowCompleted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalBorrowCompleted),

      exhaustMap((action) =>
        this.requestService.getTotalCompletedRequest(action.viewId).pipe(
          map((response) => getTotalBorrowCompletedSuccess({ data: response })),
          tap((action) => console.log('Action received in Effect:', action)),
          catchError((error: any) => {
            return of(
              getTotalBorrowCompletedFailure({ error: error.error.message }),
            );
          }),
        ),
      ),
    );
  });
}

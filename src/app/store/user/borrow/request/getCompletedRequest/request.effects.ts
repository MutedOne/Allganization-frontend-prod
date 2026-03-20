import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import {
  BorrowRequestCompleted,
  BorrowRequestCompletedFailure,
  BorrowRequestCompletedSuccess,
} from './request.actions';
import { RequestService } from 'src/app/services/user/borrow/request.service';
@Injectable()
export class BorrowCompletedRequestEffects {
  private actions$ = inject(Actions);
  private requestService = inject(RequestService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BorrowRequestCompleted),

      switchMap((action) =>
        this.requestService
          .getAllCompletedRequests(action.pagination, action.viewId)
          .pipe(
            map((response) =>
              BorrowRequestCompletedSuccess({
                data: response,
                pagination: action.pagination,
              }),
            ),

            catchError((error: any) => {
              return of(
                BorrowRequestCompletedFailure({ error: error.error.message }),
              );
            }),
          ),
      ),
    );
  });
}

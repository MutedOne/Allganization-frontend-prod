import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import {
  getBorrowRequest,
  getBorrowRequestFailure,
  getBorrowRequestSuccess,
} from './request.actions';
import { RequestService } from 'src/app/services/user/borrow/request.service';
@Injectable()
export class BorrowRequestEffects {
  private actions$ = inject(Actions);
  private requestService = inject(RequestService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBorrowRequest),

      switchMap((action) =>
        this.requestService
          .getAllRequests(action.pagination, action.viewId)
          .pipe(
            map((response) => {
              const { listAssetRequest, total, ...pagination } = response

              return getBorrowRequestSuccess({
                data: response.listAssetRequest,
                total: response.total,
                pagination: pagination,
              })
            }),

            catchError((error: any) => {
              return of(
                getBorrowRequestFailure({ error: error.error.message }),
              );
            }),
          ),
      ),
    );
  });
}

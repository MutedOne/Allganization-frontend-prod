import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  getApproveRequest,
  getApproveRequestFailure,
  getApproveRequestSuccess,
} from './approve.actions';
import { RequestService } from 'src/app/services/user/borrow/request.service';
@Injectable()
export class ApproveRequestEffects {
  private actions$ = inject(Actions);
  private requestService = inject(RequestService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getApproveRequest),

      exhaustMap((action) =>
        this.requestService
          .approveListRequest(action.pagination, action.viewId)
          .pipe(
            map((response) =>
              getApproveRequestSuccess({
                data: response,
                pagination: action.pagination,
              }),
            ),
            tap((res) => console.log('Action received in Effect:', res)),

            catchError((error: any) => {
              return of(
                getApproveRequestFailure({ error: error.error.message }),
              );
            }),
          ),
      ),
    );
  });
}

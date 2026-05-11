import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  getApprover,
  getApproverFailure,
  getApproverSuccess,
} from './approver.actions';

import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { ApproversService } from 'src/app/services/admin/borrow/approvers.service';
@Injectable()
export class ApproverEffects {
  private actions$ = inject(Actions);
  private approverService = inject(ApproversService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getApprover),

      exhaustMap((action) =>
        this.approverService
          .getAllApprover(action.pagination, action.viewId)
          .pipe(
            map((response) => {
              const { listApprover, total, ...pagination } = response

              return getApproverSuccess({
                data: response.listApprover,
                total: response.total,
                pagination: pagination,
              })
            }),

            catchError((error: any) => {
              return of(getApproverFailure({ error: error.error.message }));
            })
          )
      )
    );
  });
}

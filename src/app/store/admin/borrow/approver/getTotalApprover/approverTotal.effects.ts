import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/admin/account/account.service';
import {
  getTotalApprovers,
  getTotalApproversFailure,
  getTotalApproversSuccess,
} from './approverTotal.actions';
import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { ApproversService } from 'src/app/services/admin/borrow/approvers.service';

@Injectable()
export class ApproverTotalEffects {
  private actions$ = inject(Actions);
  private approverService = inject(ApproversService);

  getTotalApprovers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalApprovers),
      tap((action) => console.log('Action received in Effect:', action)),
      exhaustMap((action) =>
        this.approverService.getTotalApprover(action.viewId).pipe(
          map((response) => getTotalApproversSuccess({ data: response })),

          catchError((error: any) => {
            return of(getTotalApproversFailure({ error: error.error.message }));
          })
        )
      )
    );
  });
}

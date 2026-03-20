import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/admin/account/account.service';
import {
  getTotalApprove,
  getTotalApproveFailure,
  getTotalApproveSuccess,
} from './approveTotal.actions';
import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { ApproversService } from 'src/app/services/admin/borrow/approvers.service';
import { RequestService } from 'src/app/services/user/borrow/request.service';

@Injectable()
export class ApproveRequestTotalEffects {
  private actions$ = inject(Actions);
  private requestService = inject(RequestService);

  getTotalApprove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalApprove),

      exhaustMap((action) =>
        this.requestService.approveTotalListRequest(action.viewId).pipe(
          map((response) => getTotalApproveSuccess({ data: response })),

          catchError((error: any) => {
            return of(getTotalApproveFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

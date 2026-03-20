import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  addApprover,
  addApproverFailure,
  addApproverSuccess,
} from './addApprover.actions';

import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { ApproversService } from 'src/app/services/admin/borrow/approvers.service';
import { NotificationService } from 'src/app/services/confirmation.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Injectable()
export class addApproversEffects {
  private actions$ = inject(Actions);
  private approversService = inject(ApproversService);
  private notificationService = inject(NotificationService);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addApprover),

      exhaustMap((action) =>
        this.approversService.addApprover(action.data).pipe(
          tap((response) => {
            this.notificationService.success(response.message);
          }),
          map((response) =>
            addApproverSuccess({
              message: response.message,
            }),
          ),
          delay(500),
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/admin/borrow/approvers']);
                this.dialog.closeAll();
              });
          }),
          catchError((error: any) => {
            this.notificationService.error(error.error.message);
            return of(addApproverFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

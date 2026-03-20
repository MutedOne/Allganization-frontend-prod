import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import {
  addAccount,
  addAccountFailure,
  addAccountSuccess,
} from './addAccount.actions';
import { AccountService } from 'src/app/services/admin/account/account.service';
import { NotificationService } from 'src/app/services/confirmation.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Injectable()
export class addAccountsEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);
  private notificationService = inject(NotificationService);
  constructor(private router: Router) {}
  readonly dialog = inject(MatDialog);
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addAccount),

      exhaustMap((action) =>
        this.accountService.addAccount(action.data).pipe(
          tap((response) => {
            this.notificationService.success(response.message);
          }),
          map((response) =>
            addAccountSuccess({
              message: response.message,
            }),
          ),
          delay(500),
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/admin/account']);
                this.dialog.closeAll();
              });
          }),
          catchError((error: any) => {
            this.notificationService.error(error.error.message);
            return of(addAccountFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

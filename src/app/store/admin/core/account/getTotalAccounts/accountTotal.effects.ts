import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/admin/account/account.service';
import {
  getTotalAccounts,
  getTotalAccountsFailure,
  getTotalAccountsSuccess,
} from './accountTotal.actions';

@Injectable()
export class AccountTotalEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);

  getTotalAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalAccounts),
      tap((action) => console.log('Action received in Effect:', action)),
      exhaustMap((action) =>
        this.accountService.getTotalAccount(action.viewId).pipe(
          map((response) =>
            getTotalAccountsSuccess({
              data: response,
            })
          ),

          catchError((error: any) => {
            return of(getTotalAccountsFailure({ error: error.error.message }));
          })
        )
      )
    );
  });
}

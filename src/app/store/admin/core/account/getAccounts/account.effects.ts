import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  getAccounts,
  getAccountsFailure,
  getAccountsSuccess,
} from './account.actions';

import { AccountService } from 'src/app/services/admin/account/account.service';
@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAccounts),

      exhaustMap((action) =>
        this.accountService
          .getAllAccount(action.pagination, action.accountId)
          .pipe(
            map((response) => {
              const { listAccount, total, ...pagination } = response

              return getAccountsSuccess({
                data: response.listAccount,
                total: response.total,
                pagination: pagination,
              })
            }

            ),

            catchError((error: any) => {

              return of(getAccountsFailure({ error: error.error.message }));
            })
          )
      )
    );
  });
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/admin/account/account.service';
import {
  getTotalForms,
  getTotalFormsFailure,
  getTotalFormsSuccess,
} from './formsTotal.actions';
import { FormsService } from 'src/app/services/admin/borrow/forms.service';

@Injectable()
export class FormsTotalEffects {
  private actions$ = inject(Actions);
  private formsService = inject(FormsService);

  getTotalForms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalForms),
      tap((action) => console.log('Action received in Effect:', action)),
      exhaustMap((action) =>
        this.formsService.getTotalForms(action.viewId).pipe(
          map((response) => getTotalFormsSuccess({ data: response })),

          catchError((error: any) => {
            return of(getTotalFormsFailure({ error: error.error.message }));
          })
        )
      )
    );
  });
}

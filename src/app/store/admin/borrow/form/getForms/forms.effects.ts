import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import { getForms, getFormsFailure, getFormsSuccess } from './forms.actions';

import { FormsService } from 'src/app/services/admin/borrow/forms.service';
@Injectable()
export class FormsEffects {
  private actions$ = inject(Actions);
  private formService = inject(FormsService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getForms),

      exhaustMap((action) =>
        this.formService.getAllforms(action.pagination, action.viewId).pipe(
          map((response) =>
            getFormsSuccess({
              data: response,
              pagination: action.pagination,
            })
          ),

          catchError((error: any) => {
            return of(getFormsFailure({ error: error.error.message }));
          })
        )
      )
    );
  });
}

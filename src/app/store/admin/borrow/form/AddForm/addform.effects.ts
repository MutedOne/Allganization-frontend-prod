import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  debounceTime,
  delay,
  EMPTY,
  exhaustMap,
  map,
  of,
  tap,
} from 'rxjs';

import { addForm, addFormFailure, addFormSuccess } from './addform.actions';

import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { NotificationService } from 'src/app/services/confirmation.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { getForms } from '../getForms/forms.actions';
@Injectable()
export class AddFormsEffects {
  private actions$ = inject(Actions);
  private formService = inject(FormsService);
  private notificationService = inject(NotificationService);
  readonly dialog = inject(MatDialog);
  constructor(private router: Router) {}
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addForm),

      exhaustMap((action) =>
        this.formService.addForms(action.data).pipe(
          map((response) =>
            addFormSuccess({
              message: response.message,
            }),
          ),
          tap((response) => {
            this.notificationService.success(response.message);
          }),
          delay(500),
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/admin/borrow/forms']);
                this.dialog.closeAll();
              });
          }),
          catchError((error: any) => {
            this.notificationService.error(error.error.message);
            return of(addFormFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

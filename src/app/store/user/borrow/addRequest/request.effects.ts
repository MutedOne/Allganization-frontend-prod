import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  delay,
  EMPTY,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import {
  addBorrowRequest,
  addBorrowRequestFailure,
  addBorrowRequestSuccess,
} from './request.actions';
import { RequestService } from 'src/app/services/user/borrow/request.service';
import { NotificationService } from 'src/app/services/confirmation.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Injectable()
export class AddBorrowRequestEffects {
  private actions$ = inject(Actions);
  private requestService = inject(RequestService);
  private notificationService = inject(NotificationService);
  constructor(private router: Router) {}
  readonly dialog = inject(MatDialog);
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addBorrowRequest),

      switchMap((action) =>
        this.requestService.addrequest(action.data).pipe(
          tap((response) => {
            this.notificationService.success(response.message);
          }),
          map((response) =>
            addBorrowRequestSuccess({
              message: response.message,
            }),
          ),
          delay(500),
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/borrow']);
                this.dialog.closeAll();
              });
          }),
          catchError((error: any) => {
            this.notificationService.error(error.error.message);
            return of(addBorrowRequestFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

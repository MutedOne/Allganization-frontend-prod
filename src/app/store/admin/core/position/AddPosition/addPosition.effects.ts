import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  addPosition,
  addPositionFailure,
  addPositionSuccess,
} from './addPosition.actions';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/admin/account/department.service';
import { NotificationService } from 'src/app/services/confirmation.service';
@Injectable()
export class addPositionsEffects {
  private actions$ = inject(Actions);
  private departmentService = inject(DepartmentService);
  private notificationService = inject(NotificationService);
  constructor(private router: Router) {}
  readonly dialog = inject(MatDialog);
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPosition),

      exhaustMap((action) =>
        this.departmentService.addDepartment(action.data).pipe(
          tap((response) => {
            this.notificationService.success(response.message);
          }),
          map((response) =>
            addPositionSuccess({
              message: response.message,
            }),
          ),
          delay(500),
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/admin/account/department']);
                this.dialog.closeAll();
              });
          }),
          catchError((error: any) => {
            this.notificationService.error(error.error.message);
            return of(addPositionFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

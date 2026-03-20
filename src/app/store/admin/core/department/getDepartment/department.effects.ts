import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

import {
  getDepartment,
  getDepartmentFailure,
  getDepartmentSuccess,
} from './department.actions';
import { PositionService } from 'src/app/services/admin/account/position.service';
import { DepartmentService } from 'src/app/services/admin/account/department.service';

@Injectable()
export class DepartmentEffects {
  private actions$ = inject(Actions);
  private departmentService = inject(DepartmentService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDepartment),

      exhaustMap((action) =>
        this.departmentService
          .getAllDepartment(action.pagination, action.viewId)
          .pipe(
            map((response) =>
              getDepartmentSuccess({
                data: response,
                pagination: action.pagination,
              })
            ),

            catchError((error: any) => {
              return of(getDepartmentFailure({ error: error.error.message }));
            })
          )
      )
    );
  });
}

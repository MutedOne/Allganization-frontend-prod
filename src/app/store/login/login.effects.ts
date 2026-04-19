import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { login, loginFailure, loginSuccess } from './login.actions';
import { Router } from '@angular/router';
@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),

      exhaustMap((action) =>
        this.authenticationService.getLogin(action.credentials).pipe(
          tap((response) => {
            sessionStorage.setItem('access_token', response.token);
            sessionStorage.setItem('isAdmin', response.isAdmin.toString());
            this.router.navigate(['/users']);
            return response;
          }),
          map((response) =>
            loginSuccess({
              data: {
                token: response.token,
                isAdmin: response.isAdmin,
              },
            }),
          ),

          catchError((error: any) => {
            tap(() => {
              this.router.navigate(['/login']);
            });
            return of(loginFailure({ error: error.error.message }));
          }),
        ),
      ),
    );
  });
}

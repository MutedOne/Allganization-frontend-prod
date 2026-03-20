import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  const token = sessionStorage.getItem('access_token');

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return next(clonedRequest).pipe(
    catchError((err) => {
      if (err.error.message == 'Renew token.') {
        return authService.refreshToken().pipe(
          switchMap((res) => {
            sessionStorage.setItem('access_token', res.token);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`,
              },
              withCredentials: true,
            });

            return next(retryReq);
          }),
          catchError((refreshError) => {
            return throwError(() => new Error(refreshError));
          }),
        );
      } else if (err.error.message == 'Required to relogin.') {
        authService.logOut();
      }
      return throwError(() => err);
    }),
  );
};

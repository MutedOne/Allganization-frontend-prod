import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) {}
  token = sessionStorage.getItem('access_token');
  canActivateChild(): Observable<boolean | UrlTree> {
    if (this.token == '') {
      this.router.navigate(['/login']);
    }
    return of(true);
  }
}

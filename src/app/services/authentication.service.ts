import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { BehaviorSubject, catchError, filter, map, Observable, of, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../store/login/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  constructor(private router: Router) {}

  token = new BehaviorSubject('');
  
  getLogin(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiURL}/login`, data);
  }

  refreshToken() {
    return this.http.get<LoginResponse>(`${environment.apiURL}/refresh`);
  }
  logOut() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    sessionStorage.removeItem('isAdmin');

    return;
  }

  getCurrentAccountLogin() {
    return this.http.get(`${environment.apiURL}/login/current`);
  }
}

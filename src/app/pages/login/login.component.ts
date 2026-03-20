import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';
import { BrandingComponent } from 'src/app/layouts/full/sidebar/branding.component';

import { Store } from '@ngrx/store';
import { login } from 'src/app/store/login/login.actions';
import { selectLoginError, selectLoginToken } from 'src/app/store/login/login.selectors';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrandingComponent,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  private authService = inject(AuthenticationService);
  private storeService = inject(Store);
  private fb = inject(FormBuilder);
  isError: Observable<string | null> =
    this.storeService.select(selectLoginError);
  token:Observable<string | null> =
    this.storeService.select(selectLoginToken);

  ngOnInit(): void {
    this.login = this.fb.group({
      username: [environment.accountUser, Validators.required],
      password: [environment.accountPassword, Validators.required],
    });

    
  }
 
  onSubmit() {
    this.storeService.dispatch(login({ credentials: this.login.value }));
  }
}

import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { map, Observable } from 'rxjs';
import { Account } from 'src/app/interface/admin/account/account';
import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPaginationDetails,
  PaginationDetails,
} from 'src/app/interface/pagination';

import { MaterialModule } from 'src/app/material.module';
import { AccountService } from 'src/app/services/admin/account/account.service';
import { NotifyService } from 'src/app/services/admin/account/notify.service';
import { PositionService } from 'src/app/services/admin/account/position.service';
import { getAccounts } from 'src/app/store/admin/core/account/getAccounts/account.actions';
import {
  selectAccount,
  selectAccountLoading,
} from 'src/app/store/admin/core/account/getAccounts/account.selectors';

@Component({
  selector: 'app-view-account',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    MaterialModule,
    DatePipe,
    NgScrollbarModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.scss',
})
export class ViewAccountComponent implements OnInit {
  details: any = [];
  positionHistory: any = [];

  private positionService = inject(PositionService);
  private notifyService = inject(NotifyService);
  viewId: ViewId = defaultId();
  accountEvaluation: any = [];
  private storeService = inject(Store);
  constructor(@Inject(MAT_DIALOG_DATA) public data: ViewId) {}
  paginationRequest: PaginationDetails<Account>;
  isLoading = this.storeService.select(selectAccountLoading);
  allAccounts: Observable<Account[]> = this.storeService.select(selectAccount);
  isLoadingEvaluation: boolean = false;
  ngOnInit(): void {
    this.viewId = this.data;
    this.paginationRequest = defaultPaginationDetails<Account>();
    this.positionService.getViewPosition(this.viewId).subscribe((data) => {
      this.positionHistory = data;
    });

    this.viewAccount();
  }

  viewAccount() {
    this.paginationRequest.pageIndex = 0;
    const { pageIndex, search, filter } = this.paginationRequest;
    const paginationDetails = { pageIndex, search, filter };

    this.storeService.dispatch(getAccounts(paginationDetails, this.viewId));
  }
  evaluateAccount() {
    this.isLoadingEvaluation = true;
    this.notifyService
      .getEvaluateAccount(this.viewId)
      .pipe(
        map((data: any) => {
          this.isLoadingEvaluation = false;
          this.accountEvaluation.message = data.message;
          this.accountEvaluation.performance = data.performance;
        }),
      )
      .subscribe();
  }
}

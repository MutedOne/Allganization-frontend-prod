import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { AccountService } from 'src/app/services/admin/account/account.service';

import { defaultId, ViewId } from 'src/app/interface/global';
import { Account } from 'src/app/interface/admin/account/account';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  defaultPaginationDetails,
  Pagination,
  PaginationDetails,
} from 'src/app/interface/pagination';
import {
  selectAccount,
  selectAccountLoading,
  selectAccountPagination,
} from 'src/app/store/admin/core/account/getAccounts/account.selectors';
import { selectTotalAccounts } from 'src/app/store/admin/core/account/getTotalAccounts/accountTotal.selectors';
import { getAccounts } from 'src/app/store/admin/core/account/getAccounts/account.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-account',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list-account.component.html',
  styleUrl: './list-account.component.scss',
})
export class ListAccountComponent implements OnInit {
  private storeService = inject(Store);
  private accountService = inject(AccountService);
  allAccounts: Observable<Account[]> = this.storeService.select(selectAccount);
  isLoading = this.storeService.select(selectAccountLoading);
  paginationDetailstest: Observable<any> = this.storeService.select(
    selectAccountPagination,
  );
  // totalAccounts: Observable<number> =
  //   this.storeService.select(selectTotalAccounts);
  paginationRequest: PaginationDetails<Account>;

  displayTitle: string[] = ['assigned', 'status', 'action'];
  viewId: ViewId = defaultId();
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails<Account>();
  }
  openEditUser(id: number) {
    this.viewId = { id: id };
    const dialogRef = this.dialog.open(ViewAccountComponent, {
      data: this.viewId,
    });
  }

  resetAccountPassword(details: Account) {
    this.viewId.id = details.id;
    this.accountService.resetPassword(this.viewId).subscribe();
  }
  promotionAccount(details: Account) {
    this.viewId.id = details.id;
    this.accountService.getPromotedAccount(details).subscribe();
  }

  pageEvent(event: any) {
    this.paginationRequest.pageIndex = event.pageIndex;
    const { pageIndex, search, filter } = this.paginationRequest;
    const paginationDetails = { pageIndex, search, filter };

    this.storeService.dispatch(getAccounts(paginationDetails, this.viewId));
  }

  resignedAccount(details: Account) {
    this.viewId.id = details.id;
    this.accountService.accountResigned(this.viewId).subscribe();
  }
}

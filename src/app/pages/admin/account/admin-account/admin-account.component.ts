import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
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

import { AddAccountComponent } from 'src/app/components/modals/account/add-account/add-account.component';
import { ListAccountComponent } from 'src/app/components/list/list-account/list-account.component';
import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { AccountService } from 'src/app/services/admin/account/account.service';
import {
  defaultPagination,
  defaultPaginationDetails,
  defaultTotal,
  Pagination,
  PaginationDetails,
  Totalpage,
} from 'src/app/interface/pagination';
import { Account } from 'src/app/interface/admin/account/account';
import { defaultId, ViewId } from 'src/app/interface/global';
import { catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getTotalAccounts } from 'src/app/store/admin/core/account/getTotalAccounts/accountTotal.actions';
import { getAccounts } from 'src/app/store/admin/core/account/getAccounts/account.actions';

@Component({
  selector: 'app-admin-account',
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
    ListAccountComponent,
  ],
  templateUrl: './admin-account.component.html',
  styleUrl: './admin-account.component.scss',
})
export class AdminAccountComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'status', 'action'];

  paginationRequest: PaginationDetails<Account>;

  viewId: ViewId = defaultId();
  isLoading: boolean = false;
  readonly dialog = inject(MatDialog);
  private storeService = inject(Store);

  ngOnInit() {
    this.paginationRequest = defaultPaginationDetails<Account>();
    this.getAllAccount();
    this.getTotalAccount();
  }

  getAllAccount() {
    const { pageIndex, search, filter } = this.paginationRequest;
    const paginationDetails = { pageIndex, search, filter };

    this.storeService.dispatch(getAccounts(paginationDetails, this.viewId));
  }
  getTotalAccount() {
    this.storeService.dispatch(getTotalAccounts(this.viewId));
  }
  openEditUser() {
    const dialogRef = this.dialog.open(ViewAccountComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openAddUser() {
    const dialogRef = this.dialog.open(AddAccountComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  paginationData(event: any) {
    this.isLoading = true;
    const { search, filter } = this.paginationRequest;
    const pageIndex = event;
    const paginationDetails = { pageIndex, search, filter };
    this.storeService.dispatch(getAccounts(paginationDetails, this.viewId));
  }
}

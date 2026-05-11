import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { AddRequestComponent } from 'src/app/components/modals/borrow/request/add-request/add-request.component';

import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPaginationDetails,

  PaginationDetails,

} from 'src/app/interface/pagination';
import { MaterialModule } from 'src/app/material.module';

import { getBorrowRequest } from 'src/app/store/user/borrow/request/getRequest/request.actions';
import {
  selectBorrow,
  selectBorrowLoading,
  selectBorrowPagination,
  selectBorrowTotal,
} from 'src/app/store/user/borrow/request/getRequest/request.selectors';


@Component({
  selector: 'app-borrow',
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
  templateUrl: './borrow.component.html',
  styleUrl: './borrow.component.scss',
})
export class BorrowComponent {
  paginationRequest: PaginationDetails;
  displayTitle = [
    'Form',
    'Purpose',
    'currentApprover',
    'CountApprover',
    'Created On',
    'action',
  ];

  viewId: ViewId = defaultId();

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) { }
  storeService = inject(Store);
  allRequest = this.storeService.select(selectBorrow);
  pagination = this.storeService.select(selectBorrowPagination);
  totalRequest = this.storeService.select(selectBorrowTotal);
  isLoading = this.storeService.select(selectBorrowLoading);
  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails;

    this.getAllRequests();
  }
  getAllRequests() {
    const { currentPage, search, filter } = this.paginationRequest;
    const paginationDetails = { currentPage, search, filter };

    this.storeService.dispatch(
      getBorrowRequest(paginationDetails, this.viewId),
    );
  }

  openViewDepartment(detail: any) { }
  openAddUser() {
    const dialogRef = this.dialog.open(AddRequestComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  pageEvent(event: any) {
    const { search, filter } = this.paginationRequest;
    const currentPage = event.currentPage;
    const paginationDetails = { currentPage, search, filter };
    this.storeService.dispatch(
      getBorrowRequest(paginationDetails, this.viewId),
    );
  }
  openEditUser(id: number) {
    const dialogRef = this.dialog.open(ViewAccountComponent, {
      data: { userId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

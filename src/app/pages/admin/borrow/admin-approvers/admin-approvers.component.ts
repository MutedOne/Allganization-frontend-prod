import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
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
import { AddAccountComponent } from 'src/app/components/modals/account/add-account/add-account.component';

import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { AddApproverComponent } from 'src/app/components/modals/borrow/forms/add-approver/add-approver.component';
import { AddFormsComponent } from 'src/app/components/modals/borrow/forms/add-forms/add-forms.component';
import { Approver } from 'src/app/interface/admin/borrow/approver';
import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPagination,
  defaultPaginationDetails,
  defaultTotal,
  Pagination,
  PaginationDetails,
  Totalpage,
} from 'src/app/interface/pagination';
import { MaterialModule } from 'src/app/material.module';
import { AccountService } from 'src/app/services/admin/account/account.service';
import { ApproversService } from 'src/app/services/admin/borrow/approvers.service';
import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { getApprover } from 'src/app/store/admin/borrow/approver/getApprover/approver.actions';
import {
  selectApprover,
  selectApproverLoading,
  selectApproverPagination,
} from 'src/app/store/admin/borrow/approver/getApprover/approver.selectors';
import { getTotalApprovers } from 'src/app/store/admin/borrow/approver/getTotalApprover/approverTotal.actions';
import { selectTotalApprovers } from 'src/app/store/admin/borrow/approver/getTotalApprover/approverTotal.selectors';
@Component({
  selector: 'app-admin-approvers',
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
  templateUrl: './admin-approvers.component.html',
  styleUrl: './admin-approvers.component.scss',
})
export class AdminApproversComponent implements OnInit {
  displayTitle = ['Details', 'Approvers', 'action'];

  viewId: ViewId = defaultId();

  private approverService = inject(ApproversService);
  paginationRequest: PaginationDetails<Approver>;
  readonly dialog = inject(MatDialog);

  storeService = inject(Store);
  allApprover = this.storeService.select(selectApprover);
  allApproverTotal = this.storeService.select(selectTotalApprovers);
  pagination = this.storeService.select(selectApproverPagination);
  isLoading = this.storeService.select(selectApproverLoading);
  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails<Approver>();
    this.getAllApprover();
    this.getTotalApprover();
  }
  getAllApprover() {
    const { pageIndex, search, filter } = this.paginationRequest;
    const paginationDetails = { pageIndex, search, filter };
    this.storeService.dispatch(getApprover(paginationDetails, this.viewId));
  }
  getTotalApprover() {
    this.storeService.dispatch(getTotalApprovers(this.viewId));
  }
  pageEvent(event: any) {
    const { search, filter } = this.paginationRequest;
    const pageIndex = event.pageIndex;
    const paginationDetails = { pageIndex, search, filter };
    this.storeService.dispatch(getApprover(paginationDetails, this.viewId));
  }
  openViewApprovers(detail: any) {}
  openAddApprover() {
    const dialogRef = this.dialog.open(AddApproverComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

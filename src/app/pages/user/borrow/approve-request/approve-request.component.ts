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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, tap } from 'rxjs';
import { AddAccountComponent } from 'src/app/components/modals/account/add-account/add-account.component';

import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { AddApproverComponent } from 'src/app/components/modals/borrow/forms/add-approver/add-approver.component';
import { AddFormsComponent } from 'src/app/components/modals/borrow/forms/add-forms/add-forms.component';
import { AddRequestComponent } from 'src/app/components/modals/borrow/request/add-request/add-request.component';
import {
  Approver,
  ApproveRequest,
} from 'src/app/interface/admin/borrow/approver';
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
import { RequestService } from 'src/app/services/user/borrow/request.service';
import { getApproveRequest } from 'src/app/store/user/borrow/approve/getApprove/approve.actions';
import {
  selectApproved,
  selectApprovedLoading,
  selectApprovedPagination,
} from 'src/app/store/user/borrow/approve/getApprove/approve.selectors';
import { getTotalApprove } from 'src/app/store/user/borrow/approve/getTotalApprove/approveTotal.actions';
import { selectApprovedTotal } from 'src/app/store/user/borrow/approve/getTotalApprove/approveTotal.selectors';

@Component({
  selector: 'app-approve-request',
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
  templateUrl: './approve-request.component.html',
  styleUrl: './approve-request.component.scss',
})
export class ApproveRequestComponent {
  displayTitle = ['Form', 'Purpose', 'Requested by', 'Created On', 'action'];

  viewId: ViewId = defaultId();

  private requestService = inject(RequestService);
  paginationRequest: PaginationDetails<ApproveRequest>;

  readonly dialog = inject(MatDialog);

  storeService = inject(Store);
  listApprovedRequest = this.storeService.select(selectApproved);
  totalApprovedRequest = this.storeService.select(selectApprovedTotal);
  isLoading = this.storeService.select(selectApprovedLoading);
  pagination = this.storeService.select(selectApprovedPagination);
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails<ApproveRequest>();
    this.getApproveListRequest();
    this.getTotalApproveListRequest();
    this.totalApprovedRequest.subscribe((data) => {
      console.log(data);
    });
  }
  getApproveListRequest() {
    const { pageIndex, search, filter } = this.paginationRequest;
    const paginationDetails = { pageIndex, search, filter };
    this.storeService.dispatch(
      getApproveRequest(paginationDetails, this.viewId),
    );
  }
  getTotalApproveListRequest() {
    this.storeService.dispatch(getTotalApprove(this.viewId));
  }
  openViewRequest(detail: any) {}

  approveRequest(detail: any) {
    this.requestService
      .approveRequest(detail)
      .pipe(
        delay(500),
        tap(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/borrow/approve']);
              this.dialog.closeAll();
            });
        }),
      )
      .subscribe();
  }

  pageEvent(event: any) {
    const { search, filter } = this.paginationRequest;
    const pageIndex = event.pageIndex;
    const paginationDetails = { pageIndex, search, filter };
    this.storeService.dispatch(
      getApproveRequest(paginationDetails, this.viewId),
    );
  }
}

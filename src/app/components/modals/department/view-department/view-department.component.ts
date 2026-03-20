import { Component, inject, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListAccountComponent } from 'src/app/components/list/list-account/list-account.component';
import { AccountService } from 'src/app/services/admin/account/account.service';
import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPagination,
  defaultPaginationDetails,
  Pagination,
} from 'src/app/interface/pagination';
import { ViewPosition } from 'src/app/interface/admin/account/position';
import { Store } from '@ngrx/store';
import { getAccounts } from 'src/app/store/admin/core/account/getAccounts/account.actions';

@Component({
  selector: 'app-view-department',
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
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ListAccountComponent,
  ],
  templateUrl: './view-department.component.html',
  styleUrl: './view-department.component.scss',
})
export class ViewDepartmentComponent {
  getPositionDetails: ViewPosition;

  viewId: ViewId = defaultId();
  paginationDetails: Pagination = defaultPagination();
  constructor(@Inject(MAT_DIALOG_DATA) public data: ViewPosition) {}
  private accountService = inject(AccountService);
  paginationRequest: any = defaultPaginationDetails();
  isLoading: boolean = false;
  private storeService = inject(Store);
  ngOnInit() {
    const { id } = this.data;
    this.getPositionDetails = this.data;
    this.viewId.id = id;
    this.getAllAccount();
    this.getTotalAccounts();
  }
  getAllAccount() {
    console.log(this.viewId);
    const { pageIndex, search, filter } = this.paginationRequest;
    const paginationDetails = { pageIndex, search, filter };

    this.storeService.dispatch(getAccounts(paginationDetails, this.viewId));
  }
  getTotalAccounts() {
    this.accountService.getTotalAccount(this.viewId).subscribe((data) => {
      if (data && Array.isArray(data)) {
        this.paginationRequest.total = data[0].total;
      }
    });
  }
  paginationData(event: any) {
    this.isLoading = true;
    const { search, filter } = this.paginationRequest;
    const pageIndex = event;
    const paginationDetails = { pageIndex, search, filter };
    this.accountService
      .getAllAccount(paginationDetails, this.viewId)
      .subscribe((data) => {
        this.paginationRequest = {
          ...this.paginationRequest,
          data: data,
          pageIndex: event,
        };
        this.isLoading = false;
      });
  }
}

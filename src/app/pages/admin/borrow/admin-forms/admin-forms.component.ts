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
import { AddAccountComponent } from 'src/app/components/modals/account/add-account/add-account.component';

import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { AddFormsComponent } from 'src/app/components/modals/borrow/forms/add-forms/add-forms.component';
import { Form } from 'src/app/interface/admin/borrow/form';
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
import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { getForms } from 'src/app/store/admin/borrow/form/getForms/forms.actions';
import {
  selectForm,
  selectFormListTotal,
  selectFormLoading,
  selectFormPagination,
} from 'src/app/store/admin/borrow/form/getForms/forms.selectors';

@Component({
  selector: 'app-admin-forms',
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
  templateUrl: './admin-forms.component.html',
  styleUrl: './admin-forms.component.scss',
})
export class AdminFormsComponent implements OnInit {
  listForm: Form[] = [];

  displayTitle = ['Details', 'action'];
  viewId: ViewId = defaultId();

  paginationRequest: PaginationDetails;
  private formsService = inject(FormsService);
  readonly dialog = inject(MatDialog);
  storeService = inject(Store);

  getForms = this.storeService.select(selectForm);
  getTotalForm = this.storeService.select(selectFormListTotal);
  pagination = this.storeService.select(selectFormPagination);
  isLoading = this.storeService.select(selectFormLoading);

  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails;
    this.getAllForms();
  }
  private getAllForms() {
    const { currentPage, search, filter } = this.paginationRequest;
    const paginationDetails = { currentPage, search, filter };
    this.storeService.dispatch(getForms(paginationDetails, this.viewId));
  }
  openViewForm(detail: any) { }
  openAddForm() {
    const dialogRef = this.dialog.open(AddFormsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  pageEvent(event: any) {
    const { search, filter } = this.paginationRequest;
    const currentPage = event.currentPage;
    const paginationDetails = { currentPage, search, filter };
    this.storeService.dispatch(getForms(paginationDetails, this.viewId));
  }
}

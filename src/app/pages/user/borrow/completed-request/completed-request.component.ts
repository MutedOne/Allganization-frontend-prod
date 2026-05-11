import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { AddRequestComponent } from 'src/app/components/modals/borrow/request/add-request/add-request.component';
import { ApproveRequest } from 'src/app/interface/admin/borrow/approver';
import { BorrowRequest } from 'src/app/interface/admin/borrow/borrow';
import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPaginationDetails,
  PaginationDetails,
} from 'src/app/interface/pagination';
import { MaterialModule } from 'src/app/material.module';
import { FormsService } from 'src/app/services/admin/borrow/forms.service';

import { BorrowRequestCompleted } from 'src/app/store/user/borrow/request/getCompletedRequest/request.actions';
import {
  selectBorrowCompleted,
  selectBorrowCompletedLoading,
  selectBorrowCompletedPagination,
  selectBorrowCompletedtotal,
} from 'src/app/store/user/borrow/request/getCompletedRequest/request.selectors';



@Component({
  selector: 'app-completed-request',
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
  templateUrl: './completed-request.component.html',
  styleUrl: './completed-request.component.scss',
})
export class CompletedRequestComponent {
  paginationRequest: PaginationDetails;
  displayTitle = ['Form', 'Purpose', 'Created On', 'action'];

  viewId: ViewId = defaultId();
  formsService = inject(FormsService);
  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) { }
  storeService = inject(Store);
  allRequest = this.storeService.select(selectBorrowCompleted);
  pagination = this.storeService.select(selectBorrowCompletedPagination);
  totalRequest = this.storeService.select(selectBorrowCompletedtotal);
  isLoading = this.storeService.select(selectBorrowCompletedLoading);
  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails;
    this.getAllRequests();
  }
  getAllRequests() {
    // this.paginationRequest.filter = 'completed';
    const { currentPage, search, filter } = this.paginationRequest;
    const paginationDetails = { currentPage, search, filter };

    this.storeService.dispatch(
      BorrowRequestCompleted(paginationDetails, this.viewId),
    );
  }
  downloadPDFRequest(request: any) {
    this.formsService
      .getDownloadPDFForm(request)
      .subscribe(async (data: any) => {
        const pdfFile = new Uint8Array(data.file.data);
        const pdfDoc = await PDFDocument.load(pdfFile);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const placedSignature = JSON.parse(
          `[${data.placedSignature.slice(1, -1)}]`,
        );

        data.approveDetails.forEach((approver: any, index: number) => {
          const { x, y } = placedSignature[index];
          Object.values(approver).forEach((value, index2) => {
            firstPage.drawText(`${value}`, {
              x: x,
              y: y - index2 * 12,
              size: 12,
              font: helveticaFont,
              color: rgb(0.95, 0.1, 0.1),
            });
          });
        });

        const pdfBytes = await pdfDoc.save(); // 2. Create a Blob from the PDF bytes
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });

        // 3. Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = data.filename;
        link.click();

        // 4. Clean up the URL object to free up memory
        URL.revokeObjectURL(link.href);
      });
  }
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
      BorrowRequestCompleted(paginationDetails, this.viewId),
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

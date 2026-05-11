import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
import { AddDepartmentComponent } from 'src/app/components/modals/department/add-department/add-department.component';
import { ViewDepartmentComponent } from 'src/app/components/modals/department/view-department/view-department.component';
import { PositionService } from 'src/app/services/admin/account/position.service';
import {
  defaultPaginationDetails,
  PaginationDetails,
} from 'src/app/interface/pagination';
import { defaultId, ViewId } from 'src/app/interface/global';

import { Store } from '@ngrx/store';
import {
  selectPosition,
  selectPositionLoading,
  selectPositionPagination,
  selectPositionTotal,
} from 'src/app/store/admin/core/position/getPositions/position.selectors';
import { getPosition } from 'src/app/store/admin/core/position/getPositions/position.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface productsData {
  id: number;
  imagePath: string;
  position: string;
  department: string;
  quantity: number;
}

@Component({
  selector: 'app-admin-department',
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
  templateUrl: './admin-department.component.html',
  styleUrl: './admin-department.component.scss',
})
export class AdminDepartmentComponent implements OnInit {
  displayTitle: string[] = ['assigned', 'quantity', 'action'];

  viewId: ViewId = defaultId();
  readonly dialog = inject(MatDialog);
  paginationRequest: PaginationDetails;
  positionService = inject(PositionService);
  private storeService = inject(Store);
  getPosition = this.storeService.select(selectPosition);
  paginationDetails = this.storeService.select(selectPositionPagination);
  isLoading = this.storeService.select(selectPositionLoading);
  totalListPosition = this.storeService.select(selectPositionTotal);

  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails;
    this.getAllPosition();

  }
  private getAllPosition() {
    const { currentPage, search, filter } = this.paginationRequest;
    const paginationDetails = { currentPage, search, filter };
    this.storeService.dispatch(getPosition(paginationDetails, this.viewId));
  }

  openAddDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openViewDepartment(detail: any) {
    const dialogRef = this.dialog.open(ViewDepartmentComponent, {
      data: detail,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  pageEvent(event: any) {
    const { search, filter } = this.paginationRequest;
    const currentPage = event.currentPage;
    const paginationDetails = { currentPage, search, filter };
    this.storeService.dispatch(getPosition(paginationDetails, this.viewId));
  }
}

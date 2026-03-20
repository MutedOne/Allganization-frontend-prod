import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { OnInit } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';

import { AsyncPipe } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  defaultPaginationDetails,
  PaginationDetails,
} from 'src/app/interface/pagination';
import {
  AddDepartmentDefault,
  Department,
} from 'src/app/interface/admin/account/department';
import { getDepartment } from 'src/app/store/admin/core/department/getDepartment/department.actions';
import { selectDepartment } from 'src/app/store/admin/core/department/getDepartment/department.selectors';
import { defaultId, ViewId } from 'src/app/interface/global';
import { addPositionFailure } from 'src/app/store/admin/core/position/AddPosition/addPosition.selectors';
import { addPosition } from 'src/app/store/admin/core/position/AddPosition/addPosition.actions';
@Component({
  selector: 'app-add-department',
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
    AsyncPipe,
  ],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss',
})
export class AddDepartmentComponent implements OnInit {
  departmentForm!: FormGroup;
  paginationRequest: PaginationDetails<Department>;
  filteredOptions: Observable<any[]>;
  addAccountDetails = AddDepartmentDefault();
  constructor(private fb: FormBuilder) {}

  viewId: ViewId = defaultId();
  storeService = inject(Store);

  ngOnInit() {
    this.paginationRequest = defaultPaginationDetails<Department>();
    this.validate();
    this.apiGetDepartment();
  }
  private validate() {
    this.departmentForm = this.fb.group({
      department: ['', Validators.required],
      position: ['', Validators.required],
      level: [
        { value: this.addAccountDetails.level, disabled: true },
        [Validators.required],
      ],
      code: ['', [Validators.required]],
    });
  }
  private apiGetDepartment() {
    console.log('asdasd');
    this.filteredOptions = this.departmentForm.controls[
      'department'
    ].valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.paginationRequest.search = searchTerm;
        const { search, pageIndex, filter } = this.paginationRequest;

        this.storeService.dispatch(
          getDepartment({ search, pageIndex, filter }, this.viewId)
        );
        return this.storeService.select(selectDepartment);
      }),
      tap((val: Department[]) => {
        if (val.length == 1) {
          this.addAccountDetails.level = val[0].occupiedLevel + 1;
          this.addAccountDetails.department = val[0].name;
          this.addAccountDetails.id = val[0].id;
          this.departmentForm.patchValue({
            level: this.addAccountDetails.level,
          });
        } else if (val.length == 0) {
          this.addAccountDetails.level = 1;
          this.departmentForm.patchValue({
            level: this.addAccountDetails.level,
          });
          this.addAccountDetails.department = this.paginationRequest.search;
          this.addAccountDetails.id = 0;
        } else {
          this.addAccountDetails.level = 0;
          this.departmentForm.patchValue({
            level: this.addAccountDetails.level,
          });
          this.addAccountDetails.department = '';
          this.addAccountDetails.id = 0;
          this.departmentForm.get('department')?.setErrors({ require: true });
          this.departmentForm.get('department')?.markAsTouched();
        }

        return val;
      })
    );
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.addAccountDetails = {
        ...this.addAccountDetails,
        position: this.departmentForm.get('position')?.value,
        code: this.departmentForm.get('code')?.value,
      };
      this.storeService.dispatch(addPosition(this.addAccountDetails));
    }
  }
}

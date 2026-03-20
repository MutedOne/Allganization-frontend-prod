import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import {
  AddAccount,
  AddAccountDefault,
} from 'src/app/interface/admin/account/account';
import { Department } from 'src/app/interface/admin/account/department';
import { Position } from 'src/app/interface/admin/account/position';
import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPaginationDetails,
  PaginationDetails,
} from 'src/app/interface/pagination';
import { AccountService } from 'src/app/services/admin/account/account.service';
import { DepartmentService } from 'src/app/services/admin/account/department.service';
import { PositionService } from 'src/app/services/admin/account/position.service';
import { addAccount } from 'src/app/store/admin/core/account/AddAccount/addAccount.actions';
import { addAccountError } from 'src/app/store/admin/core/account/AddAccount/addAccount.selectors';
import { getDepartment } from 'src/app/store/admin/core/department/getDepartment/department.actions';
import { selectDepartment } from 'src/app/store/admin/core/department/getDepartment/department.selectors';
import { getPosition } from 'src/app/store/admin/core/position/getPositions/position.actions';
import { selectPosition } from 'src/app/store/admin/core/position/getPositions/position.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-account',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss',
})
export class AddAccountComponent implements OnInit {
  storeService = inject(Store);

  paginationRequest: PaginationDetails<Department>;
  paginationRequestPosition: PaginationDetails<Position>;
  viewId: ViewId = defaultId();
  viewIdPosition: ViewId = defaultId();
  filteredOptions: Observable<any[]>;
  filteredOptionPositions: Observable<any[]>;
  addAccountDetails: AddAccount;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails<Department>();
    this.paginationRequestPosition = defaultPaginationDetails<Position>();
    this.addAccountDetails = AddAccountDefault();

    this.validateForm();
    this.apiGetDepartment();
  }

  private validateForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: [
        environment.accountPassword,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,13}$/),
        ],
      ],

      department_id: [null, [Validators.required]],
      position_id: [null, [Validators.required]],
      isAdmin: [false],
    });
  }
  private apiGetDepartment() {
    this.filteredOptions = this.userForm.controls[
      'department_id'
    ].valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.paginationRequest.search = searchTerm;
        const { search, pageIndex, filter } = this.paginationRequest;

        this.storeService.dispatch(
          getDepartment({ search, pageIndex, filter }, this.viewIdPosition),
        );
        return this.storeService.select(selectDepartment);
      }),
      tap((val) => {
        if (val.length > 0) {
          this.userForm.get('department_id')?.setErrors(null);
          this.addAccountDetails.department_id = val[0].id;
          this.getDepartmentPosition(val[0].id);
        } else {
          this.filteredOptionPositions = of([]);
          this.addAccountDetails.department_id = 0;
          this.userForm.get('position_id')?.setValue('');
          this.paginationRequestPosition.search = '';
          this.userForm.get('department_id')?.setErrors({ required: true });
          this.userForm.get('department_id')?.markAsTouched();
        }

        return val;
      }),
    );
  }
  private getDepartmentPosition(id: number) {
    this.filteredOptionPositions = this.userForm.controls[
      'position_id'
    ].valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.paginationRequestPosition.search = searchTerm;
        const { search, pageIndex, filter } = this.paginationRequestPosition;

        this.storeService.dispatch(
          getPosition({ search, pageIndex, filter }, { id: id }),
        );
        return this.storeService.select(selectPosition);
      }),
      tap((val) => {
        if (val.length == 1) {
          this.userForm.get('position_id')?.setErrors(null);
          this.addAccountDetails.position_id = val[0].id;
        } else {
          this.addAccountDetails.position_id = 0;
          this.userForm.get('position_id')?.setErrors({ require: true });
          this.userForm.get('position_id')?.markAsTouched();
        }
        return val;
      }),
    );
  }

  protected onSubmit() {
    if (this.userForm.valid) {
      const { username, name, password, isAdmin } = this.userForm.value;
      this.addAccountDetails = {
        ...this.addAccountDetails,
        username: username,
        name: name,
        password: password,
        isAdmin: isAdmin,
      };
      this.storeService.dispatch(addAccount(this.addAccountDetails));
    }
  }
}

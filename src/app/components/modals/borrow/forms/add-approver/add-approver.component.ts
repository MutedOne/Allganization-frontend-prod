import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Account } from 'src/app/interface/admin/account/account';
import { AddFormDefault, Form } from 'src/app/interface/admin/borrow/form';
import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPagination,
  defaultPaginationDetails,
  Pagination,
  PaginationDetails,
} from 'src/app/interface/pagination';
import { AccountService } from 'src/app/services/admin/account/account.service';
import { ApproversService } from 'src/app/services/admin/borrow/approvers.service';
import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { addApprover } from 'src/app/store/admin/borrow/approver/AddApprover/addApprover.actions';
import { getForms } from 'src/app/store/admin/borrow/form/getForms/forms.actions';
import { selectForm } from 'src/app/store/admin/borrow/form/getForms/forms.selectors';
import { getAccounts } from 'src/app/store/admin/core/account/getAccounts/account.actions';
import { selectAccount } from 'src/app/store/admin/core/account/getAccounts/account.selectors';

@Component({
  selector: 'app-add-approver',
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
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './add-approver.component.html',
  styleUrl: './add-approver.component.scss',
})
export class AddApproverComponent {
  addApproverForm!: FormGroup;
  numberOfApprover: any = [];
  approvers = this.fb.array([]);

  filteredForm: any = [];
  filteredAccount: any;
  private formsService = inject(FormsService);
  private approversService = inject(ApproversService);
  private accountService = inject(AccountService);

  viewId: ViewId = defaultId();
  constructor(private fb: FormBuilder) {}
  paginationRequestForm: PaginationDetails<Form>;
  paginationRequestAccount: PaginationDetails<Account>;
  optionsAccount: Account[][] = [];
  options: Form[] = [];
  filteredOptionstest: { [key: number]: Observable<any[]> } = {};
  filteredOptions: Observable<any[]>;
  isChanged: boolean;

  addFormDetails: any = AddFormDefault();
  isKeypress: boolean = false;

  storeService = inject(Store);
  allAccount: Account[] = [];
  ngOnInit(): void {
    this.paginationRequestForm = defaultPaginationDetails<Form>();
    this.paginationRequestAccount = defaultPaginationDetails<Account>();
    this.validate();
    this.initialAccount();
    this.getIDform();
  }
  private initialAccount() {
    this.storeService.dispatch(
      getAccounts(this.paginationRequestAccount, this.viewId),
    );

    this.storeService
      .select(selectAccount)
      .pipe(
        filter((data) => !!data && data.length > 0),
        take(1),
      )
      .subscribe((data) => (this.allAccount = data));
  }
  validate() {
    this.addApproverForm = this.fb.group({
      form_id: ['', Validators.required],
      approvers: this.approvers,
    });
  }

  private getIDform() {
    this.filteredOptions = this.addApproverForm.controls[
      'form_id'
    ].valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.paginationRequestForm.search = searchTerm;
        this.paginationRequestForm.filter = 'unused';
        const { search, pageIndex, filter } = this.paginationRequestForm;

        this.storeService.dispatch(
          getForms({ search, pageIndex, filter }, this.viewId),
        );
        return this.storeService.select(selectForm);
      }),
      tap((val) => {
        this.reset();
        if (val.length == 1) {
          this.addFormDetails.form_id = val[0].id;
          this.getLengthApprover(val[0]?.countApprovers);
          this.addApproverForm.get('form_id')?.setErrors(null);
        } else {
          this.addFormDetails.form_id = 0;
          this.addApproverForm.get('form_id')?.setErrors({ require: true });
          this.addApproverForm.get('form_id')?.markAsTouched();
        }

        return val;
      }),
    );
  }

  reset() {
    this.isChanged = true;
    if (this.approvers.length != 0) {
      this.approvers.clear();
      this.addFormDetails.approvers = [];
      this.isChanged = false;
    }
  }
  getLengthApprover(lengthApprover: number) {
    for (let i = 0; i < lengthApprover; i++) {
      this.approvers.push(
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^(?!0$).*/),
        ]),
      );
      this.addFormDetails.approvers.push(0);
    }
    this.getAllAccounts();
  }

  private getAllAccounts() {
    console.log(this.allAccount);
    for (let i = 0; i < this.approvers.length; i++) {
      this.filteredOptionstest[i] = this.approvers.at(i).valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          const requestParams = {
            ...this.paginationRequestAccount,
            search: (searchTerm as string) || '',
          };
          if (searchTerm != '') {
            return this.accountService.getAllAccount(
              requestParams,
              this.viewId,
            );
          } else {
            return of(this.allAccount);
          }
        }),
        tap((val) => {
          if (val.length == 1) {
            this.addFormDetails.approvers[i] = val[0].id;
          } else {
            this.addFormDetails.approvers[i] = 0;
            this.approvers.at(i)?.setErrors({ require: true });
            this.approvers.at(i)?.markAsTouched();
          }

          return val;
        }),
      );
    }
  }

  onSubmit() {
    if (this.addApproverForm.valid) {
      this.storeService.dispatch(addApprover(this.addFormDetails));
    }
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import {
  AddBorrowRequestDefault,
  GetAllBorrowRequest,
} from 'src/app/interface/admin/borrow/borrow';

import { defaultId, ViewId } from 'src/app/interface/global';
import {
  defaultPaginationDetails,
  PaginationDetails,
} from 'src/app/interface/pagination';

import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { RequestService } from 'src/app/services/user/borrow/request.service';
import { getForms } from 'src/app/store/admin/borrow/form/getForms/forms.actions';
import { selectForm } from 'src/app/store/admin/borrow/form/getForms/forms.selectors';
import { addBorrowRequest } from 'src/app/store/user/borrow/addRequest/request.actions';
import { selectBorrowError } from 'src/app/store/user/borrow/addRequest/request.selectors';

@Component({
  selector: 'app-add-request',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss',
})
export class AddRequestComponent {
  addRequest!: FormGroup;
  options: any[] = [];
  filteredOptions: Observable<any[]>;
  private formsService = inject(FormsService);
  private requestService = inject(RequestService);
  AddBorrowRequestDetails = AddBorrowRequestDefault();
  viewId: ViewId = defaultId();
  paginationRequest: PaginationDetails;

  constructor(private fb: FormBuilder) { }

  storeService = inject(Store);
  ngOnInit(): void {
    this.paginationRequest = defaultPaginationDetails;
    this.validate();
    this.getAllForms();
    this.getIDForm();
  }
  validate() {
    this.addRequest = this.fb.group({
      form_id: [null, Validators.required],
      purpose: ['', Validators.required],
    });
  }
  getAllForms() {
    this.filteredOptions = this.addRequest.controls[
      'form_id'
    ].valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.paginationRequest.search = searchTerm;

        const { search, currentPage, filter } = this.paginationRequest;

        this.storeService.dispatch(
          getForms({ search, currentPage, filter }, this.viewId),
        );
        return this.storeService.select(selectForm);
      }),
      tap((val) => {
        if (val.length == 1) {
          this.addRequest.get('form_id')?.setErrors(null);
        } else {
          this.addRequest.get('form_id')?.setErrors({ require: true });
          this.addRequest.get('form_id')?.markAsTouched();
        }

        return val;
      }),
    );
  }
  private getIDForm() {
    // const { currentPage, search, filter } = this.paginationRequest;
    // this.addRequest.controls['form_id'].valueChanges
    //   .pipe(
    //     debounceTime(2000),
    //     distinctUntilChanged(),
    //     switchMap((searchTerm) => {
    //       this.paginationRequest.search = searchTerm;
    //       return this.formsService.getAllforms(
    //         { currentPage, search, filter },
    //         this.viewId,
    //       );
    //     }),
    //   )
    //   .subscribe((data) => {
    //     this.options = data;
    //   });
  }
  private _filterForm(value: any): any[] {
    const filterValue = value.toLowerCase();
    const filterResult = this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
    if (filterResult.length == 0) {
      this.AddBorrowRequestDetails.form_id = 0;
      const formId = this.addRequest.get('form_id');
      formId?.setErrors({ require: true });
      formId?.markAsTouched();
    }

    return filterResult;
  }
  selectIdForm(id: number) {
    this.AddBorrowRequestDetails.form_id = id;
  }
  onSubmit() {
    this.AddBorrowRequestDetails.purpose =
      this.addRequest.get('purpose')?.value;
    this.storeService.dispatch(addBorrowRequest(this.AddBorrowRequestDetails));
  }
}

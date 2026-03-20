import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import * as DepartmentActions from 'src/app/store/admin/core/department/getDepartment/department.actions';
import { AddAccountComponent } from './add-account.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectDepartment } from 'src/app/store/admin/core/department/getDepartment/department.selectors';
import { getDepartment } from 'src/app/store/admin/core/department/getDepartment/department.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { selectPosition } from 'src/app/store/admin/core/position/getPositions/position.selectors';
import * as PositionActions from 'src/app/store/admin/core/position/getPositions/position.actions';
import * as AccountActions from 'src/app/store/admin/core/account/AddAccount/addAccount.actions';
describe('AddAccountComponent', () => {
  let component: AddAccountComponent;
  let fixture: ComponentFixture<AddAccountComponent>;
  let store: MockStore;

  const mockDepartment = {
    id: 1,
    name: 'Information Tech',
    occupiedLevel: 2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddAccountComponent, // Standalone component

        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore({
          initialState: {},
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAccountComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectDepartment, []);
    fixture.detectChanges();
  });

  it('should dispatch getDepartment when department_id changes', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.filteredOptions.subscribe();
    component.userForm.get('department_id')?.setValue('Software');
    tick(1000);
    expect(dispatchSpy).toHaveBeenCalledWith(
      DepartmentActions.getDepartment(
        jasmine.objectContaining({ search: 'Software' }) as any,
        component.viewIdPosition,
      ),
    );
  }));

  it('should update department_id and call getDepartmentPosition on success', fakeAsync(() => {
    store.overrideSelector(selectDepartment, [mockDepartment]);
    component.filteredOptions.subscribe();
    component.userForm
      .get('department_id')
      ?.setValue('asdasdInfsdadormation Techada');
    tick(500);
    expect(component.addAccountDetails.department_id).toBe(mockDepartment.id);
    expect(component.userForm.get('department_id')?.errors).toBeNull();
  }));
  it('should update position_id when department_id changes and response is not empty', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const mockPosition = {
      id: 1,
      department: 'Information Tech',
      level: 1,
      position: 'Adminitrator',
      quantity: 3,
    };
    fixture.detectChanges();
    store.overrideSelector(selectDepartment, [mockDepartment]);
    store.overrideSelector(selectPosition, [mockPosition]);
    component.filteredOptions.subscribe();
    component.userForm.get('department_id')?.setValue('Information Tech');
    tick(500);

    component.filteredOptionPositions.subscribe();
    tick(500);
    expect(component.addAccountDetails.department_id).toBe(mockDepartment.id);
    expect(component.userForm.get('department_id')?.errors).toBeNull();
    expect(dispatchSpy).toHaveBeenCalledWith(
      PositionActions.getPosition(
        jasmine.objectContaining({ search: '' }) as any,
        jasmine.objectContaining({ id: 1 }) as any,
      ),
    );
    expect(component.addAccountDetails.department_id).toBe(mockPosition.id);
  }));
  it('should call addAccount when form is valid and clicked onSubmit', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const toAddAccountDetails = {
      username: 'Stephen',
      name: 'yow',
      password: 'Test@123',
      department_id: 0,
      position_id: 0,
      isAdmin: false,
    };

    component.userForm.patchValue(toAddAccountDetails);
    (component as any).onSubmit();
    expect(component.userForm.valid).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(
      AccountActions.addAccount(toAddAccountDetails),
    );
  });
  it('should be valid when password passed the condition', () => {
    component.userForm.patchValue({
      username: 'Stephen',
      name: 'yow',
      password: 'Test@123',
      department_id: 1,
      position_id: 1,
    });

    expect(component.userForm.valid).toBeTruthy();
  });
  it('should be invalid when fields are empty', () => {
    component.userForm.patchValue({
      username: '',
      name: '',
      password: '',
      department_id: null,
      position_id: null,
      isAdmin: false,
    });
    expect(component.userForm.valid).toBeFalse();
  });
  it("should be invalid when password doesn't passed the condition", () => {
    component.userForm.patchValue({
      username: 'Stephen',
      name: 'yow',
      password: 'Test',
      department_id: 1,
      position_id: 1,
    });

    expect(component.userForm.valid).toBeFalse();
  });
});

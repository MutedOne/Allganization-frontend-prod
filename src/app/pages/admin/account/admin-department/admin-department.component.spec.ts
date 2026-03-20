import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDepartmentComponent } from './admin-department.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AdminDepartmentComponent', () => {
  let component: AdminDepartmentComponent;
  let fixture: ComponentFixture<AdminDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDepartmentComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

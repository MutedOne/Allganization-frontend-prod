import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepartmentComponent } from './view-department.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ViewDepartmentComponent', () => {
  let component: ViewDepartmentComponent;
  let fixture: ComponentFixture<ViewDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDepartmentComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

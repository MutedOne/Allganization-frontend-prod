import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproversComponent } from './admin-approvers.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AdminApproversComponent', () => {
  let component: AdminApproversComponent;
  let fixture: ComponentFixture<AdminApproversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminApproversComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

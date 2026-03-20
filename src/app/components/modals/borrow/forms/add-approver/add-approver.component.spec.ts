import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApproverComponent } from './add-approver.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AddApproverComponent', () => {
  let component: AddApproverComponent;
  let fixture: ComponentFixture<AddApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddApproverComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AddApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

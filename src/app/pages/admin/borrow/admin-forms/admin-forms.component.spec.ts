import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsComponent } from './admin-forms.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AdminFormsComponent', () => {
  let component: AdminFormsComponent;
  let fixture: ComponentFixture<AdminFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormsComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountComponent } from './admin-account.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AdminAccountComponent', () => {
  let component: AdminAccountComponent;
  let fixture: ComponentFixture<AdminAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

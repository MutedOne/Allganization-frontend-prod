import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopComponent } from './admin-shop.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AdminShopComponent', () => {
  let component: AdminShopComponent;
  let fixture: ComponentFixture<AdminShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShopComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

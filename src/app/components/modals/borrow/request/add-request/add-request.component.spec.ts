import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestComponent } from './add-request.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AddRequestComponent', () => {
  let component: AddRequestComponent;
  let fixture: ComponentFixture<AddRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRequestComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

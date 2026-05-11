import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAccount } from 'src/app/store/admin/core/account/getAccounts/account.selectors';
import { AccountService } from 'src/app/services/admin/account/account.service';
import * as AccountActions from 'src/app/store/admin/core/account/getAccounts/account.actions';
import { defaultId } from 'src/app/interface/global';
import {
  defaultPagination,
  defaultPaginationDetails,
} from 'src/app/interface/pagination';
import { selectTotalAccounts } from 'src/app/store/admin/core/account/getTotalAccounts/accountTotal.selectors';
import { of } from 'rxjs';
import { getAccounts } from 'src/app/store/admin/core/account/getAccounts/account.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { PositionDefault } from 'src/app/interface/admin/account/position';
import { ViewAccountComponent } from './view-account.component';
import { PositionService } from 'src/app/services/admin/account/position.service';
import { NotifyService } from 'src/app/services/admin/account/notify.service';
describe('ViewAccountComponent', () => {
  let component: ViewAccountComponent;
  let fixture: ComponentFixture<ViewAccountComponent>;
  let store: MockStore;

  const positionServiceMock = jasmine.createSpyObj('positionService', [
    'getViewPosition',
  ]);
  const NotifyServiceMock = jasmine.createSpyObj('NotifyService', [
    'getEvaluateAccount',
  ]);
  const mockPosition = {
    id: 0,
    level: 0,
    position: '',
    department: '',
    quantity: 0,
  };
  const mockEvaluate = {
    message: 'Test message',
    performance: 'test performance',
  };

  const dialogDataMock = { id: 123 };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAccountComponent],
      providers: [
        provideHttpClient(),
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },

        {
          provide: PositionService,
          useValue: positionServiceMock,
        },
        {
          provide: NotifyService,
          useValue: NotifyServiceMock,
        },
        provideMockStore({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAccountComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    component.paginationRequest = defaultPaginationDetails();
    component.viewId = defaultId();
    positionServiceMock.getViewPosition.and.returnValue(of([mockPosition]));
    NotifyServiceMock.getEvaluateAccount.and.returnValue(of(mockEvaluate));
    fixture.detectChanges();
  });

  it('should display account information', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.viewAccount();
    const { currentPage, search, filter } = defaultPaginationDetails();
    const paginationDetails = { currentPage, search, filter };
    expect(component.positionHistory).toEqual([mockPosition]);
    expect(dispatchSpy).toHaveBeenCalledWith(
      getAccounts(paginationDetails, component.viewId),
    );
  });
  it('should evaluate account ', () => {
    component.evaluateAccount();
    NotifyServiceMock.getEvaluateAccount.and.returnValue(of(mockEvaluate));

    expect(component.accountEvaluation.message).toEqual(mockEvaluate.message);
  });
});

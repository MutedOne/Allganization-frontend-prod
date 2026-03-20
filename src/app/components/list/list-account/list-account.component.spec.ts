import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountComponent } from './list-account.component';
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
describe('ListAccountComponent', () => {
  let component: ListAccountComponent;
  let fixture: ComponentFixture<ListAccountComponent>;
  let store: MockStore;
  const mockAccountService = jasmine.createSpyObj('AccountService', [
    'resetPassword',
    'getPromotedAccount',
    'accountResigned',
  ]);
  const positionServiceMock = jasmine.createSpyObj('positionService', [
    'getViewPosition',
  ]);
  const mockListAccount = {
    id: 1,
    department: 'Information Tech',
    account_history_id: 1,
    name: 'admin',
    position: 'Adminitrator',
    username: 'admin',
    end: new Date('1970-01-01T00:00:00.000Z'),
  };
  const dialogDataMock = { id: 123 };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAccountComponent],
      providers: [
        provideHttpClient(),
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
        {
          provide: AccountService,
          useValue: mockAccountService,
          positionServiceMock,
        },
        provideMockStore({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAccountComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should display list of accounts', () => {
    store.overrideSelector(selectAccount, [mockListAccount]);
    component.allAccounts.subscribe((data) => {
      expect(data).toEqual([mockListAccount]);
    });
  });
  it('should display total list of accounts', () => {
    const mockListTotalAccount = 50;
    store.overrideSelector(selectTotalAccounts, mockListTotalAccount);
    store.refreshState();
    fixture.detectChanges();
    component.totalAccounts.subscribe((data) => {
      expect(data).toEqual(mockListTotalAccount);
    });
  });
  it('should reset account password', () => {
    mockAccountService.resetPassword.and.returnValue(of(true));
    (component as any).resetAccountPassword(mockListAccount);
    expect(component.viewId).toEqual({ id: mockListAccount.id });
  });
  it('should promote account', () => {
    mockAccountService.getPromotedAccount.and.returnValue(of(true));
    (component as any).promotionAccount(mockListAccount);
    expect(component.viewId).toEqual({ id: mockListAccount.id });
  });
  it('should resign account', () => {
    mockAccountService.accountResigned.and.returnValue(of(true));
    (component as any).resignedAccount(mockListAccount);
    expect(component.viewId).toEqual({ id: mockListAccount.id });
  });
  it('should update pageIndex and dispatch getAccounts action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const event = {
      pageIndex: 2,
    };
    component.pageEvent(event as any);
    const { pageIndex, search, filter } = component.paginationRequest;
    expect(component.paginationRequest.pageIndex).toBe(2);

    expect(dispatchSpy).toHaveBeenCalledWith(
      AccountActions.getAccounts(
        { pageIndex, search, filter },
        component.viewId,
      ),
    );
  });
  it('should open modal with user id', () => {
    const userID = {
      id: 1,
    };
    positionServiceMock.getViewPosition.and.returnValue(
      of([PositionDefault()]),
    );
    component.openEditUser(userID.id);

    expect(component.viewId).toEqual({ id: userID.id });
  });
});

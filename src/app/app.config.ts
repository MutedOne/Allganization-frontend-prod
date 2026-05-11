import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  isDevMode
} from '@angular/core';
import {

  provideHttpClient,
  withInterceptors,

} from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loginReducer } from './store/login/login.reducer';
import { LoginEffects } from './store/login/login.effects';
import { accountReducer } from './store/admin/core/account/getAccounts/account.reducer';
import { positionReducer } from './store/admin/core/position/getPositions/position.reducer';
import { AccountEffects } from './store/admin/core/account/getAccounts/account.effects';
import { PositionEffects } from './store/admin/core/position/getPositions/position.effects';
import { FormsEffects } from './store/admin/borrow/form/getForms/forms.effects';
import { formsReducer } from './store/admin/borrow/form/getForms/forms.reducer';
import { ApproverEffects } from './store/admin/borrow/approver/getApprover/approver.effects';
import { approverReducer } from './store/admin/borrow/approver/getApprover/approver.reducer';
import { approveRequestReducer } from './store/user/borrow/approve/getApprove/approve.reducer';
import { ApproveRequestEffects } from './store/user/borrow/approve/getApprove/approve.effects';
import { BorrowRequestEffects } from './store/user/borrow/request/getRequest/request.effects';
import { borrowRequestReducer } from './store/user/borrow/request/getRequest/request.reducer';
import { AddBorrowRequestEffects } from './store/user/borrow/addRequest/request.effects';
import { addBorrowRequestReducer } from './store/user/borrow/addRequest/request.reducer';
import { AddFormsEffects } from './store/admin/borrow/form/AddForm/addform.effects';
import { addFormsReducer } from './store/admin/borrow/form/AddForm/addform.reducer';
import { addPositionsReducer } from './store/admin/core/position/AddPosition/addPosition.reducer';
import { addPositionsEffects } from './store/admin/core/position/AddPosition/addPosition.effects';
import { addAccountsEffects } from './store/admin/core/account/AddAccount/addAccount.effects';
import { addAccountsReducer } from './store/admin/core/account/AddAccount/addAccount.reducer';
import { departmentReducer } from './store/admin/core/department/getDepartment/department.reducer';
import { DepartmentEffects } from './store/admin/core/department/getDepartment/department.effects';
import { addApproversEffects } from './store/admin/borrow/approver/AddApprover/addApprover.effects';
import { addApproversReducer } from './store/admin/borrow/approver/AddApprover/addApprover.reducer';
import { borrowCompletedRequestReducer } from './store/user/borrow/request/getCompletedRequest/request.reducer';
import { BorrowCompletedRequestEffects } from './store/user/borrow/request/getCompletedRequest/request.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding(),
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule,
    ),
    provideStore({
      loginReducer: loginReducer,
      accountReducer: accountReducer,
      positionReducer: positionReducer,
      formsReducer: formsReducer,
      approverReducer: approverReducer,
      approveRequestReducer: approveRequestReducer,
      borrowRequestReducer: borrowRequestReducer,
      addBorrowRequestReducer: addBorrowRequestReducer,
      addFormsReducer: addFormsReducer,
      addPositionsReducer: addPositionsReducer,
      addAccountsReducer: addAccountsReducer,
      departmentReducer: departmentReducer,
      addApproversReducer: addApproversReducer,
      borrowCompletedRequestReducer: borrowCompletedRequestReducer,
    }),
    provideEffects([
      LoginEffects,
      AccountEffects,
      FormsEffects,
      ApproverEffects,
      PositionEffects,
      ApproveRequestEffects,
      BorrowRequestEffects,
      AddBorrowRequestEffects,
      AddFormsEffects,
      addPositionsEffects,
      addAccountsEffects,
      DepartmentEffects,
      addApproversEffects,
      BorrowCompletedRequestEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};

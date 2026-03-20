import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loginReducer } from './store/login/login.reducer';
import { LoginEffects } from './store/login/login.effects';
import { accountReducer } from './store/admin/core/account/getAccounts/account.reducer';
import { accountTotalReducer } from './store/admin/core/account/getTotalAccounts/accountTotal.reducer';
import { positionReducer } from './store/admin/core/position/getPositions/position.reducer';
import { positionTotalReducer } from './store/admin/core/position/getTotalPosition/positionTotal.reducer';
import { AccountEffects } from './store/admin/core/account/getAccounts/account.effects';
import { AccountTotalEffects } from './store/admin/core/account/getTotalAccounts/accountTotal.effects';
import { PositionEffects } from './store/admin/core/position/getPositions/position.effects';
import { PositionTotalEffects } from './store/admin/core/position/getTotalPosition/positionTotal.effects';
import { FormsEffects } from './store/admin/borrow/form/getForms/forms.effects';
import { FormsTotalEffects } from './store/admin/borrow/form/getTotalForms/formsTotal.effects';
import { formsReducer } from './store/admin/borrow/form/getForms/forms.reducer';
import { formsTotalReducer } from './store/admin/borrow/form/getTotalForms/formsTotal.reducer';
import { ApproverEffects } from './store/admin/borrow/approver/getApprover/approver.effects';
import { ApproverTotalEffects } from './store/admin/borrow/approver/getTotalApprover/approverTotal.effects';
import { approverReducer } from './store/admin/borrow/approver/getApprover/approver.reducer';
import { approverTotalReducer } from './store/admin/borrow/approver/getTotalApprover/approverTotal.reducer';
import { approveRequestReducer } from './store/user/borrow/approve/getApprove/approve.reducer';
import { approveRequestTotalReducer } from './store/user/borrow/approve/getTotalApprove/approveTotal.reducer';
import { ApproveRequestEffects } from './store/user/borrow/approve/getApprove/approve.effects';
import { ApproveRequestTotalEffects } from './store/user/borrow/approve/getTotalApprove/approveTotal.effects';
import { BorrowRequestEffects } from './store/user/borrow/request/getRequest/request.effects';

import { borrowRequestTotalReducer } from './store/user/borrow/request/getTotalRequest/requestTotal.reducer';
import { borrowRequestReducer } from './store/user/borrow/request/getRequest/request.reducer';
import { BorrowRequestTotalEffects } from './store/user/borrow/request/getTotalRequest/requestTotal.effects';
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
import { borrowCompletedRequestTotalReducer } from './store/user/borrow/request/getTotalCompletedRequest/requestTotal.reducer';
import { borrowCompletedRequestReducer } from './store/user/borrow/request/getCompletedRequest/request.reducer';
import { BorrowCompletedRequestTotalEffects } from './store/user/borrow/request/getTotalCompletedRequest/requestTotal.effects';
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
      accountTotalReducer: accountTotalReducer,
      positionReducer: positionReducer,
      positionTotalReducer: positionTotalReducer,
      formsReducer: formsReducer,
      formsTotalReducer: formsTotalReducer,
      approverReducer: approverReducer,
      approverTotalReducer: approverTotalReducer,
      approveRequestReducer: approveRequestReducer,
      approveRequestTotalReducer: approveRequestTotalReducer,
      borrowRequestReducer: borrowRequestReducer,
      borrowRequestTotalReducer: borrowRequestTotalReducer,
      addBorrowRequestReducer: addBorrowRequestReducer,
      addFormsReducer: addFormsReducer,
      addPositionsReducer: addPositionsReducer,
      addAccountsReducer: addAccountsReducer,
      departmentReducer: departmentReducer,
      addApproversReducer: addApproversReducer,
      borrowCompletedRequestTotalReducer: borrowCompletedRequestTotalReducer,
      borrowCompletedRequestReducer: borrowCompletedRequestReducer,
    }),
    provideEffects([
      LoginEffects,
      AccountEffects,
      AccountTotalEffects,
      FormsEffects,
      FormsTotalEffects,
      ApproverEffects,
      ApproverTotalEffects,
      PositionEffects,
      PositionTotalEffects,
      ApproveRequestEffects,
      ApproveRequestTotalEffects,
      BorrowRequestEffects,
      BorrowRequestTotalEffects,
      AddBorrowRequestEffects,
      AddFormsEffects,
      addPositionsEffects,
      addAccountsEffects,
      DepartmentEffects,
      addApproversEffects,
      BorrowCompletedRequestTotalEffects,
      BorrowCompletedRequestEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};

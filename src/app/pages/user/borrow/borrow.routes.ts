import { Routes } from '@angular/router';

import { AdminFormsComponent } from '../../admin/borrow/admin-forms/admin-forms.component';
import { BorrowComponent } from './borrow/borrow.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { CompletedRequestComponent } from './completed-request/completed-request.component';

export const BorrowRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BorrowComponent,
      },
      {
        path: 'approve',
        component: ApproveRequestComponent,
      },
      {
        path: 'completed',
        component: CompletedRequestComponent,
      },

      // {

      //   path: 'sample-page',
      //   component: BorrowComponent,
      // },
    ],
  },
];

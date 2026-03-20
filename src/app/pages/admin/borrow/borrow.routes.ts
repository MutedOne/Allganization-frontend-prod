import { Routes } from '@angular/router';

import { AdminFormsComponent } from '../../admin/borrow/admin-forms/admin-forms.component';
import { AdminApproversComponent } from './admin-approvers/admin-approvers.component';



export const AdminBorrowRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forms',
        component: AdminFormsComponent,
      },
      {
        path: 'approvers',
        component: AdminApproversComponent,
      }
    ],
  },
];

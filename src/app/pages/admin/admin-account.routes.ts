import { Routes } from '@angular/router';
import { AdminAccountComponent } from './account/admin-account/admin-account.component';

import { AdminDepartmentComponent } from './account/admin-department/admin-department.component';

export const AdminAccountRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminAccountComponent,
      },
      {
        path: 'department',
        component: AdminDepartmentComponent,
      },
    ],
  },
];

import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
    ],
  },
];

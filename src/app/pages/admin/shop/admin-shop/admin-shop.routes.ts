import { Routes } from '@angular/router';
import { AdminShopComponent } from './admin-shop.component';

export const AdminShopRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminShopComponent,
      },
      {
        path: 'sample-page',
        component: AdminShopComponent,
      },
    ],
  },
];

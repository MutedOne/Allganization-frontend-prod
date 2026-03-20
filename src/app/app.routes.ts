import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./pages/user/shop/shop.routes').then((m) => m.ShopRoutes),
      },
      {
        path: 'borrow',
        loadChildren: () =>
          import('./pages/user/borrow/borrow.routes').then(
            (m) => m.BorrowRoutes,
          ),
      },
      {
        path: 'admin/shop',
        loadChildren: () =>
          import('./pages/admin/shop/admin-shop/admin-shop.routes').then(
            (m) => m.AdminShopRoutes,
          ),
      },
      {
        path: 'admin/account',
        loadChildren: () =>
          import('./pages/admin/admin-account.routes').then(
            (m) => m.AdminAccountRoutes,
          ),
      },
      {
        path: 'admin/borrow',
        loadChildren: () =>
          import('./pages/admin/borrow/borrow.routes').then(
            (m) => m.AdminBorrowRoutes,
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorPageComponent,
  },
];

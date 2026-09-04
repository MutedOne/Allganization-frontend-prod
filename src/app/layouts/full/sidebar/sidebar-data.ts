import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Employee Portal',
    iconName: 'layout-grid-add',
    route: '/users',
  },
  {
    displayName: 'Admin Portal',
    iconName: 'layout-grid-add',
    route: '/admin',
  },
];
export const navShop: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Shop',
    iconName: 'layout-grid-add',
    route: '/shop',
  },
  {
    displayName: 'Mybag',
    iconName: 'layout-grid-add',
    route: '/shop/mybag',
  },
  {
    displayName: 'Transaction',
    iconName: 'layout-grid-add',
    route: '/shop/transaction',
  },
];
export const navBorrow: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Borrow',
    iconName: 'layout-grid-add',
    route: '/borrow',
  },
  {
    displayName: 'Approve',
    iconName: 'layout-grid-add',
    route: '/borrow/approve',
  },
  {
    displayName: 'Completed Request',
    iconName: 'layout-grid-add',
    route: '/borrow/completed',
  },
];

export const navAdminShop: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Delivery service',
    iconName: 'layout-grid-add',
    route: '/admin/shop/delivery-service',
  },
  {
    displayName: 'promo',
    iconName: 'layout-grid-add',
    route: '/admin/shop/promo',
  },
  {
    displayName: 'rewards',
    iconName: 'layout-grid-add',
    route: '/admin/shop/rewards',
  },
];
export const navAdminBorrow: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Forms',
    iconName: 'layout-grid-add',
    route: '/admin/borrow/forms',
  },
  {
    displayName: 'Approvers',
    iconName: 'layout-grid-add',
    route: '/admin/borrow/approvers',
  },
];
export const navAdminAccount: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Account',
    iconName: 'layout-grid-add',
    route: '/admin/account',
  },
  {
    displayName: 'Department',
    iconName: 'layout-grid-add',
    route: '/admin/account/department',
  },
];

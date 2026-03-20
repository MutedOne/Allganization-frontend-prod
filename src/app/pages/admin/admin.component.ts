import { Component } from '@angular/core';
import { ProjectsComponent } from 'src/app/components/projects/projects.component';

@Component({
  selector: 'app-admin',
  imports: [ProjectsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  projectList = [
    {
      title: 'Account Setup',
      navigateTo: '/admin/account',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
    {
      title: 'Shop Setup',
      navigateTo: '/admin/shop',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
    {
      title: 'Borrow Setup',
      navigateTo: '/admin/borrow/forms',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
  ];
}

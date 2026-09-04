import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProjectsComponent } from 'src/app/components/projects/projects.component';

@Component({
  selector: 'app-admin',
  imports: [ProjectsComponent,
      MatCardModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  projectList = [
    {
      title: 'Human Resource',
      navigateTo: '/admin/account',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
    {
      title: 'Employee Store',
      navigateTo: '/admin/shop',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
    {
      title: 'Asset',
      navigateTo: '/admin/borrow/forms',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
  ];
}

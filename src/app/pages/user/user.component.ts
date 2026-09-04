import { Component } from '@angular/core';
import { ProjectsComponent } from 'src/app/components/projects/projects.component';

@Component({
  selector: 'app-user',
  imports: [ProjectsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
   projectList = [
    {
      title: 'Employee Store',
      navigateTo: '/shop',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
   {
      title: 'Asset',
      navigateTo: '/borrow',
      img: 'assets/images/svgs/icon-account.svg',
      progress: 80,
      color: 'primary',
    },
  ];

}

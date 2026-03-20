import { Component, inject, Input } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-projects',
  imports: [MaterialModule,TablerIconsModule,RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
   @Input() projectData: any = {};
   router = inject(Router);
   changeSideBar(path:any){
    this.router.navigate([path]);
    console.log("test",path)
   }
}

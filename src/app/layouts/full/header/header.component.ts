import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/admin/account/account.service';
import { ViewAccountComponent } from 'src/app/components/modals/account/view-account/view-account.component';
import { defaultId, ViewId } from 'src/app/interface/global';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-header',
    imports: [RouterModule, CommonModule, NgScrollbarModule, TablerIconsModule, MaterialModule],
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  readonly dialog = inject(MatDialog);
 
    private authService = inject(AuthenticationService)
    viewId:ViewId = defaultId()
 constructor(private router: Router) {}

  getCurrentUser(){
      this.authService.getCurrentAccountLogin().subscribe((data:any) =>{
        this.openEditUser(data.loginId)
      })
  }
  openEditUser(id:number) {
      
    this.viewId = {id:id}
    const dialogRef = this.dialog.open(ViewAccountComponent,{
       data: this.viewId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    this.authService.logOut()
    
  }

}


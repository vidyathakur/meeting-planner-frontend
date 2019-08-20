

import { AuthGuardService } from './../core/auth-guard.service';
import { UserListingComponent } from './../usersinfo/components/user-listing/user-listing.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { UserFormComponent } from 'src/app/usersinfo/components/user-form/user-form.component';
import { CreateUsersComponent } from 'src/app/newuser/components/create-users/create-users.component';


const routes: Routes = [
  {path:'dashboard', component:DashboardComponent,
  canActivate:[AuthGuardService],
  children: [
    
      {
        path:'userlist',
        component:UserListingComponent
      },
      {
        path:'newuser',
        component:CreateUsersComponent
      },
      {
        path:'userlist/:userId',
        component:UserFormComponent
      },
      {
        path:'**',
        redirectTo:'userlist'
      }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

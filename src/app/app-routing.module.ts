import { UserdashboardComponent } from './normalUserDashboard/userdashboard/userdashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/users/signup/signup.component';
import { LoginComponent } from 'src/app/users/login/login.component';
import { ForgotPasswordComponent } from 'src/app/users/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {
    path:'signup', 
    component:SignupComponent
 },
 {
    path:'forgot-password', 
    component:ForgotPasswordComponent
 },
 {
    path:'users', 
    component:UserdashboardComponent
 },
  {
  path : 'dashboard',
  loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule'
},{
  path : '**',
  redirectTo: 'login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
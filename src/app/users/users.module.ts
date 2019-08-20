import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { AuthGuardService } from 'src/app/core/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/users/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, AuthGuardService],
})
export class UsersModule { }

import { SocketService } from './socket.service';
import { CreateuserModule } from './newuser/createuser.module';
import { CoreModule } from './core/core.module';
import { UserlistModule } from './usersinfo/userlist.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';
import { UsersModule } from 'src/app/users/users.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserdashboardComponent } from './normalUserDashboard/userdashboard/userdashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserdashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DashboardModule,
    UserlistModule,
    FormsModule,
    CreateuserModule,
    CoreModule,
    MaterialModule,
    UsersModule,
    NgbModule,
    DashboardRoutingModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

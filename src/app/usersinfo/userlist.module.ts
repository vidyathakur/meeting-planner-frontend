import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { AuthService } from 'src/app/users/auth.service';
import { ServiceService } from './service.service';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from 'src/app/usersinfo/components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [UserListingComponent, UserFormComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    CalendarModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [ServiceService,AuthService,SocketService],
  exports: [UserListingComponent, UserFormComponent]
})
export class UserlistModule { }

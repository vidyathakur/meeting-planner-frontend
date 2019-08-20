import { CreateuserModule } from './../newuser/createuser.module';
import { UserlistModule } from './../usersinfo/userlist.module';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserlistModule,
    CreateuserModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

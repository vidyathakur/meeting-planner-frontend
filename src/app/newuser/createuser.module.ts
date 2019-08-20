
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from 'src/app/dashboard/dashboard-routing.module';
import { CreateUsersComponent } from 'src/app/newuser/components/create-users/create-users.component';



@NgModule({
  declarations: [CreateUsersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    FormsModule,
  ],
  exports: [CreateUsersComponent]
})
export class CreateuserModule { }

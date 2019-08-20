import { JwtService } from './services/jwt.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from 'src/app/core/auth-guard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthGuardService],
})
export class CoreModule { }

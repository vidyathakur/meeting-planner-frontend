import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies';
import { AuthService } from 'src/app/users/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public email: any;
  public password: any;

  constructor(public router: Router, public authService: AuthService,
              public toastr: ToastrManager) { }

  ngOnInit() {
  }

  public goToSignUp(){
     this.router.navigate(['/signup']);
  }

  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warningToastr('enter email')


    } else if (!this.password) {

      this.toastr.warningToastr('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.authService.signinFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            console.log(apiResponse)

             Cookie.set('authtoken', apiResponse.data.authToken);
            
             Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            
             Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
           
             this.authService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
             if(apiResponse.data.userDetails.parentId){
                
                 this.router.navigate(['/users']);
             } else {
               
              this.router.navigate(['/dashboard', 'userlist']);
             }
          } else {

            this.toastr.errorToastr(apiResponse.message)
          

          }

        }, (err) => {
          this.toastr.errorToastr('some error occured')

        });

    } // end condition

  } // end signinFunction


  forgotpassHandler(){
   this.router.navigate(['/forgot-password']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/users/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  	//public codes: any[];
    public codes;
public firstName: any;
  public lastName: any;
  public mobileNumber: any;
  public CountryCode: any;
  public email: any;
  public password: any;
  constructor(public router: Router,
  public http: HttpClient,
              public toastr: ToastrManager,
              public authService: AuthService,) {
                this.CountryCode = '+91';
		this.http.get('./assets/phone.json').subscribe(data => {
			this.codes = data;
			console.log(data);
		});
               }

  ngOnInit() {
  }

  public newUserFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warningToastr('enter first name')
     

    } else if (!this.lastName) {
      this.toastr.warningToastr('enter last name')

    } else if (!this.mobileNumber) {
      this.toastr.warningToastr('enter mobile')

    } else if (!this.email) {
      this.toastr.warningToastr('enter email')

    } else if (!this.password) {
      this.toastr.warningToastr('enter password')
     

    } 
     else {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        CountryCode: this.CountryCode,
        email: this.email,
        password: this.password,
      }

      console.log(data);

      this.authService.newUserFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.successToastr('User create successful');

            setTimeout(() => {

              this.router.navigate(['userlist']);

            }, 2000);

          } else {

            this.toastr.errorToastr(apiResponse.message);

          }

        }, (err) => {

          this.toastr.errorToastr('some error occured');

        });

    } // end condition

  } // end newUserFunction

}

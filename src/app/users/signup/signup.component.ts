import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/users/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	//public codes:any[];
		public codes;
	public firstName: any;
	public lastName: any;
	public CountryCode: any;
	public shortCode: any;
	public mobileNumber: any;
	public email: any;
	public password: any;

	constructor(
		public router: Router,
		public http: HttpClient,
		public toastr: ToastrManager,
		public authService: AuthService
	) {
		//     this.http.get('http://country.io/phone.json')
		//  .map((res: Response) => res.json())
		this.CountryCode = '+91';
		this.http.get('./assets/phone.json').subscribe(data => {
			this.codes = data;
			console.log(data);
		});
	}

	ngOnInit() {}

	public goToSignIn: any = () => {
		this.router.navigate(['/login']);
	}; // end goToSignIn

	public signupFunction: any = () => {
		if (!this.firstName) {
			this.toastr.warningToastr('enter first name');
		} else if (!this.lastName) {
			this.toastr.warningToastr('enter last name');
		} else if (!this.mobileNumber) {
			this.toastr.warningToastr('enter mobile');
		} else if (!this.email) {
			this.toastr.warningToastr('enter email');
		} else if (!this.password) {
			this.toastr.warningToastr('enter password');
		} else {
			let data = {
				firstName: this.firstName,
				lastName: this.lastName,
				mobileNumber: this.mobileNumber,
				CountryCode: this.CountryCode,
				shortCode: this.shortCode,
				email: this.email,
				password: this.password
			};

			console.log(data);

			this.authService.signupFunction(data).subscribe(
				apiResponse => {
					console.log(apiResponse);

					if (apiResponse.status === 200) {
						this.toastr.successToastr('Signup successful');

						setTimeout(() => {
							this.goToSignIn();
						}, 2000);
					} else {
						this.toastr.errorToastr(apiResponse.message);
					}
				},
				err => {
					this.toastr.errorToastr('some error occured');
				}
			);
		} // end condition
	}; // end signupFunction
}

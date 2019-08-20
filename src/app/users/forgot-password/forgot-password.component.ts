import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/users/auth.service';
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "src/app/usersinfo/service.service";
@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	public email: any;

	constructor(
		public router: Router,
		public toastr: ToastrManager,
		public http: HttpClient,
		public serviceService: ServiceService,
		public authService: AuthService
	) {}

	ngOnInit() {}

	public sendMail: any = () => {
		let user = {
			email: this.email
		};

		this.authService.sendEmail(user).subscribe(
			data => {
				let msg = data['message'];
				if (data.error == true) {
					this.toastr.warningToastr(msg);
				} else {
					this.toastr.successToastr(msg);
				}
			},
			error => {
				console.error(error, 'error');
			}
		);
	}; // end condition

	public goToSignIn: any = () => {
		this.router.navigate(['/login']);
	}; // end goToSignIn
  
} // end signupFunction
  
  



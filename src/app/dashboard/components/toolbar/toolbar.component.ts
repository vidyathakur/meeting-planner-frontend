import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/users/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css'],
  providers: [SocketService]
})
export class ToolbarComponent implements OnInit {
	@Output() toggleSidenav = new EventEmitter<void>();
	constructor(
		public authService: AuthService,
		public SocketService: SocketService,
		public toastr: ToastrManager,
		public router: Router
	) {}

	ngOnInit() {}

	public logout: any = () => {
		this.authService.logout().subscribe(
			apiResponse => {
				if (apiResponse.status === 200) {
					Cookie.delete('authtoken');

					Cookie.delete('receiverId');

					Cookie.delete('receiverName');

					this.SocketService.exitSocket();
					
					this.router.navigate(['/login']);
				} else {
					this.toastr.errorToastr(apiResponse.message);
					//this.router.navigate(['/login']);
				} // end condition
			},
			err => {
				this.toastr.errorToastr('some error occured');
			}
		);
	}; // end logout
}

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Component, OnInit, NgZone } from '@angular/core';
import { SocketService } from 'src/app/socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/users/auth.service';
import { ServiceService } from 'src/app/usersinfo/service.service';
import { HttpClient } from '@angular/common/http';
const MAX_WIDTH_BREAKPOINT = 720;
@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.css'],
	providers: [SocketService]
})
export class SideNavComponent implements OnInit {
	public authToken: any;
	public userInfo: any;
	public receiverId: any;
	public receiverName: any;
	public users: any = [];
	public disconnectedSocket: boolean;
	private mediaMatcher: MediaQueryList = matchMedia(`(max-width : ${MAX_WIDTH_BREAKPOINT}px)`);
	links = [
		{
			name: 'UserList',
			url: 'userlist'
		},
		{
			name: 'NewUser',
			url: 'newuser'
		}
	];
	constructor(
		zone: NgZone,
		public serviceService: ServiceService,
		private _route: ActivatedRoute,
		public toastr: ToastrManager,
		public SocketService: SocketService,
		public http: HttpClient,
		public authService: AuthService,
		private router: Router
	) {
		this.receiverId = Cookie.get('receiverId');
		this.receiverName = Cookie.get('receiverName');
		this.mediaMatcher.addListener(mql => {
			zone.run(() => (this.mediaMatcher = matchMedia(`(max-width: ${MAX_WIDTH_BREAKPOINT}px)`)));
		});
	}

	ngOnInit() {
		this.authToken = Cookie.get('authtoken');

		this.userInfo = this.authService.getUserInfoFromLocalstorage();

		this.checkStatus();

		this.verifyUserConfirmation();
		this.receiverName = Cookie.get('receiverName');
		this.getOnlineUserList();
	}

	isScreenSmall() {
		return this.mediaMatcher.matches;
	}

	public checkStatus: any = () => {
		if (
			Cookie.get('authtoken') === undefined ||
			Cookie.get('authtoken') === '' ||
			Cookie.get('authtoken') === null
		) {
			this.router.navigate(['/login']);

			return false;
		} else {
			return true;
		}
	}; // end checkStatus

	public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList()

      });
    }
  
  public getOnlineUserList :any =()=>{

    this.SocketService.onlineUserList().subscribe(users => {
			
		this.users = [];

		for (let x in users) {
			let temp = { 'userId': x, 'name': users[x], 'unread': 0, 'chatting': false };

			this.users.push(temp);
		}

		console.log(this.users);
	}); // end online-user-list
}
}

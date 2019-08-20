import { SocketService } from './../../../socket.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Users } from 'src/app/usersinfo/users';
import { ServiceService } from 'src/app/usersinfo/service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Cookie } from 'ng2-cookies';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService } from 'src/app/users/auth.service';

@Component({
	selector: 'app-user-listing',
	templateUrl: './user-listing.component.html',
	styleUrls: ['./user-listing.component.css'],
	providers: [SocketService]
})
export class UserListingComponent implements OnInit,OnDestroy {

	
	public disconnectedSocket: boolean;
firstName: string;
 config: any;
	public currentUser;
	//authToken: string;
	public users;
	constructor(
		public serviceService: ServiceService,
		private _route: ActivatedRoute,
		public toastr: ToastrManager,
		public SocketService:SocketService,
		public http: HttpClient,
		public authService: AuthService,
		private router: Router
	) {

  
		this.config = {
    			currentPage: 1,
    			itemsPerPage: 3
    };

    this._route.queryParamMap
            .map(params => params.get('page'))
            .subscribe(page => this.config.currentPage = page);

	}
	//    goToCalendar(){
	// this.router.navigate(['dashboard', 'userlist', 'usercalender']);
	// }
pageChange(newPage: number) {
		this.router.navigate([''], { queryParams: { page: newPage } });
	}
	editBtnHandler(userId) {
		this.router.navigate(['dashboard', 'userlist', userId]);
	}

	ngOnInit() {
		let myUserId = this._route.snapshot.paramMap.get('userId');

		console.log('myUserId');

		this.serviceService.getAllUser(myUserId).subscribe(
			data => {
				if(data.data!=null){
						this.users = data.data;
						console.log(this.users);
				} else {
					
				}
			
			},
			err => {
				console.log('some error occured');
				console.error(err);
			}
		);

		this.checkStatus();
	}

	private setToForm() {}

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

	public deleteThisUser(userId) : any{
    this.serviceService.deleteUser(userId).subscribe(
      data => {
				//debugger;
        console.log(data);
				this.users = data;
      this.toastr.successToastr('User Deleted successfully', 'Success!');
       setTimeout(() =>{
         this.ngOnInit();
        }, 1000)
				
      },
      error =>{
        console.log("some error occured")
        console.log(error.errorMessage)
         this.toastr.errorToastr('Some error occured', 'Oops!');
      }
    )
  }

search(){
	if(this.firstName != ""){
	this.users = this.users.filter(res =>{
		return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
	});
	} else if(this.firstName == ""){
		this.ngOnInit();
	}

}
	ngOnDestroy(){
	    console.log("constructor ngOnDestroy")
	  }

		



  
}

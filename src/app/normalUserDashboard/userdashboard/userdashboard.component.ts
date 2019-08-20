import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy,ViewChild,  TemplateRef} from '@angular/core';
import {  startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { ServiceService } from 'src/app/usersinfo/service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/users/auth.service';
import { SocketService } from 'src/app/socket.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
	selector: 'app-userdashboard',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './userdashboard.component.html',
	styleUrls: ['./userdashboard.component.css'],
	providers: [SocketService]
})
export class UserdashboardComponent implements OnInit {
	//public events= [];
	public CalendarEvent = [];
	closeResult: string;
	@ViewChild('modalContent', { static: true })
	modalContent: TemplateRef<any>;

	view: CalendarView = CalendarView.Month;

	CalendarView = CalendarView;

	viewDate: Date = new Date();

	modalData: {
		action: string;
		event: CalendarEvent;
	};

	actions: CalendarEventAction[] = [
		{
			label: '<i class="fa fa-fw fa-pencil">View</i>',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.handleEvent('Edited', event);
			}
		}
	];

	refresh: Subject<any> = new Subject();

	events: CalendarEvent[] = this.serviceService
		.getAllEvents(Cookie.get('receiverId'))
		.subscribe(data => {
			this.events;
			let arr = [];
			let obj = {};
			if (data['data']) {
				data['data'].forEach(element => {
					arr.push({
						start: startOfDay(element.startTime),
						end: addDays(element.endTime, 1),
						title: element.title,
						description: element.description,
						meetingWith: element.meetingWith,
						meetingPlace: element.meetingPlace,
						startTime: element.startTime,
						endTime: element.endTime,
						actions: this.actions,
						allDay: true,
						resizable: {
							beforeStart: true,
							afterEnd: true
						},
						draggable: true
					});
				});
			}

			this.events = arr;
			this.CalendarEvent = arr;
		});

	activeDayIsOpen: boolean = true;
	public users: any = [];
	public title: string;
public description: string;
	public meetingWith: string;
	public meetingPlace: string;
	public startTime: number;
	public endTime: number;
	public userInfo: any;
	public authToken: any;
	public receiverName: any;
	public disconnectedSocket: boolean;
	constructor(
		public serviceService: ServiceService,
		private modalService: NgbModal,
		public toastr: ToastrManager,
		public SocketService: SocketService,
		private _route: ActivatedRoute,
		public router: Router,
		private modal: NgbModal,
		public authService: AuthService
	) {}

	ngOnInit() {
		let userId = Cookie.get('receiverId');
		this.receiverName = Cookie.get('receiverName');

		this.authToken = Cookie.get('authtoken');
		this.userInfo = this.authService.getUserInfoFromLocalstorage();

		this.checkStatus();
		this.verifyUserConfirmation();
		this.getOnlineUserList();
		console.log(startOfDay('2019-08-20T06:30:00.000+00:00'));
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
		this.SocketService.verifyUser().subscribe(data => {
			this.disconnectedSocket = false;

			this.SocketService.setUser(this.authToken);
			this.getOnlineUserList();
		});
	};

	public getOnlineUserList: any = () => {
		this.SocketService.onlineUserList().subscribe(users => {
			this.users = [];
			console.log(this.users);

			for (let x in users) {
				let temp = { 'userId': x, 'name': users[x], 'unread': 0, 'chatting': false };

				this.users.push(temp);
			}

			console.log(this.users);
		}); // end online-user-list
	};

	dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		if (isSameMonth(date, this.viewDate)) {
			if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
			}
			this.viewDate = date;
		}
	}

	eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
		this.events = this.events.map(iEvent => {
			if (iEvent === event) {
				return {
					...event,
					start: newStart,
					end: newEnd
				};
			}
			return iEvent;
		});
		this.handleEvent('Dropped or resized', event);
	}

	handleEvent(action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
		this.modal.open(this.modalContent, { size: 'lg' });
	}





	setView(view: CalendarView) {
		this.view = view;
	}

	closeOpenMonthViewDay() {
		this.activeDayIsOpen = false;
	}

	public logout: any = () => {
		this.authService.logout().subscribe(
			apiResponse => {
				if (apiResponse.status === 200) {
					console.log('logout called');
					Cookie.delete('authtoken');

					Cookie.delete('receiverId');

					Cookie.delete('receiverName');

					// this.SocketService.exitSocket()

					this.router.navigate(['/login']);
				} else {
					this.toastr.errorToastr(apiResponse.message);
				} // end condition
			},
			err => {
				this.toastr.errorToastr('some error occured');
			}
		);
	}; // end logout
}

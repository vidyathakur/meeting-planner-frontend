import { Users } from 'src/app/usersinfo/users';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectionStrategy, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import {  startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours} from 'date-fns';
import { Subject } from 'rxjs';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView} from 'angular-calendar';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/users/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/usersinfo/service.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Events } from 'src/app/usersinfo/events';
import { Cookie } from 'ng2-cookies';

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
	selector: 'app-user-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
	modalRef: any;
	modalReference: NgbModalRef;
	CalendarEvent;
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
			label: '<i class="fa fa-fw fa-pencil">Edit</i>',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.handleEvent('Edited', event);
			}
		},
		{
			label: '<i class="fa fa-fw fa-times">Delete</i>',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.events = this.events.filter(iEvent => iEvent !== event);

				let eventId = event.meetId;
				this.serviceService.deleteEvent(eventId).subscribe(
					data => {
						//debugger;
						console.log(data);
						this.users = data;
						this.toastr.successToastr('Meeting Deleted successfully', 'Success!');
						setTimeout(() => {
							this.ngOnInit();
						}, 1000);
					},
					error => {
						console.log('some error occured');
						console.log(error.errorMessage);
						this.toastr.errorToastr('Some error occured', 'Oops!');
					}
				);
				//this.handleEvent('Deleted', event);
			}
		}
	];

	refresh: Subject<any> = new Subject();

	events: CalendarEvent[] = this.serviceService
		.getAllEvents(this._route.snapshot.paramMap.get('userId'))
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
						meetId: element.meetId,
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
	myForm: FormGroup;
	public currentUser;
	private users: Users;
	public meetId;
	public title: string;
	public description: string;
	public meetingWith: string;
	public meetingPlace: string;
	public startTime: number;
	public endTime: number;
	public userInfo: any;

	constructor(
		public serviceService: ServiceService,
		private modalService: NgbModal,
		private _route: ActivatedRoute,
		private modal: NgbModal,
		public toastr: ToastrManager,
		private router: Router,
		public authService: AuthService
	) {
		this.myForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			mobileNumber: new FormControl('', Validators.required),
			CountryCode: new FormControl('', Validators.required)
		});
	}

	ngOnInit() {
		console.log('ngOnItCalled');
		let myUserId = this._route.snapshot.paramMap.get('userId');
		this.userInfo = this.authService.getUserInfoFromLocalstorage();
		console.log('myUserId');
		this.serviceService.getSingleUserInformation(myUserId).subscribe(
			data => {
				console.log(data);
				this.currentUser = data['data'];
			},
			error => {
				console.log('some error occured');
				console.log(error.errorMessage);
			}
		);
	}

	public editThisUser(): any {
		this.serviceService.editUser(this.currentUser.userId, this.currentUser).subscribe(
			data => {
				debugger;
				console.log(data);
				this.toastr.successToastr('User updated successfully', 'Success!');
				setTimeout(() => {
					this.router.navigate(['/userlist', this.currentUser.userId]);
				}, 1000);
			},
			error => {
				console.log('some error occured');
				console.log(error.errorMessage);
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	editThisEvent(): any {
		let eventsData = {
			eventItem: this.modalData.event,
			email: this.currentUser.email,
			from: this.userInfo.email
		};

		this.serviceService.editEvent(eventsData).subscribe(
			data => {
				this.toastr.successToastr('Meeting updated successfully', 'Success!');
			this.modalService.dismissAll('Cross click');
			},
			error => {
				console.log('some error occured');
				console.log(error.errorMessage);
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public createEvent(): any {
		let eventsData = {
			userId: this.currentUser.userId,
			description: this.description,
			title: this.title,
			email: this.currentUser.email,
			meetingWith: this.meetingWith,
			meetingPlace: this.meetingPlace,
			startTime: this.startTime,
			endTime: this.endTime,
			from: this.userInfo.email
		};
		console.log(eventsData);

		this.serviceService.createEvents(eventsData).subscribe(
			data => {
				console.log('Events created');
				console.log(data);
				this.toastr.successToastr('Meeting Created successfully', 'Success!');

				this.modalService.dismissAll('Cross click');
				this.router.navigate(['dashboard/userlist']);
			},
			error => {
				console.log('some error occured');
				console.log(error.errorMessage);
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

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

	openXl(content) {
		this.modalService.open(content, { size: 'lg' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
private url = 'http://localhost:3000/api/v1/users';
  constructor(public http: HttpClient) { }


  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

getAllEvents(userId):any{
      let myResponse = this.http.get(this.url + '/all/events/' + userId + '?authToken=' + Cookie.get('authtoken'))
      console.log(myResponse);
      return myResponse;
 }


  getAllUser(userId):any{
  let myResponse = this.http.get(this.url  + '/view/all/' +  Cookie.get('receiverId') + '?authToken=' + Cookie.get('authtoken'));
  console.log(myResponse);
  return myResponse;
   
 }

 public getSingleUserInformation(currentUserId):any{
    let myResponse = this.http.get(this.url  + '/' + currentUserId + '/details' + '?authToken=' + Cookie.get('authtoken'))
    return myResponse;
  }


   public deleteUser(userId): any{
    let data = {}
    let myResponse = this.http.post(this.url + '/' + userId + '/delete' + '?authToken=' + Cookie.get('authtoken'), data )
    return myResponse;
  }

  public editUser(userId, userData): any{
    let myResponse = this.http.put(this.url + '/' + userId + '/edit' + '?authToken=' + Cookie.get('authtoken'), userData)
    return myResponse;
  }


  public createEvents(eventsData): any{
    let myResponse = this.http.post(this.url + '/create' + '?authToken=' + Cookie.get('authtoken'), eventsData)
    return myResponse;
  }

  public editEvent(userData): any{
    let myResponse = this.http.post(this.url + '/editEvent' + '?authToken=' + Cookie.get('authtoken'), userData);
    return myResponse;
  }

  public deleteEvent(eventId): any{
    let data = {}
    let myResponse = this.http.post(this.url + '/' + eventId + '/deleteEvent' + '?authToken=' + Cookie.get('authtoken'), data);
    return myResponse;
  }

   


  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError
}

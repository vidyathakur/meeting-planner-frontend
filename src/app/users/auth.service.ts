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
export class AuthService {

private url = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

   public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data))


  }


  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('CountryCode', data.CountryCode)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  } // end of signupFunction function.

 public sendEmail(data): Observable<any> {

   const params = new HttpParams()
      .set('email', data.email)

     return this.http.post(`${this.url}/api/v1/users/sendFormData`, params);
   
  } // end of sendEmail function.


  public newUserFunction(data): Observable<any> {
    console.log(this.setUserInfoInLocalStorage);
    
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('CountryCode', data.CountryCode)
      .set('email', data.email)
      .set('password', data.password)
      .set('parentId',Cookie.get('receiverId'))
    //console.log(params);
    return this.http.post(`${this.url}/api/v1/users/newuser` + '?authToken=' + Cookie.get('authtoken'), params);

  } // end of newUserFunction function.


  public signinFunction(data): Observable<any> {
        const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } 

  // public updateLoginUser(): Observable<any> {
     
  //      const params = new HttpParams()
  //     .set('userId', Cookie.get('receiverId'))
  //     return this.http.post(`${this.url}/api/v1/users/updateLoginUser` + '?authToken=' + Cookie.get('authtoken'),params);
  // //  return this.http.put(`${this.url}/api/v1/users/updateLoginUser/?authToken=` + Cookie.get('authtoken'));
  // } 
  


  public logout(): Observable<any> {

    const params = new HttpParams()
		.set('authToken', Cookie.get('authtoken'))
		//.set('userId', Cookie.get('receiverId'));
    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function


 

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

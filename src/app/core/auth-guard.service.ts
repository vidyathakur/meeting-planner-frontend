import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }


canActivate(route: ActivatedRouteSnapshot): boolean {

    console.log("in guard service");

    if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

      // this.router.navigate(['/']);
      
      return false;

    } else {
      
      return true;

    }

  }
}

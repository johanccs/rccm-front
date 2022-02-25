import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  
  constructor(private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const user1 = localStorage.getItem("user1");
      
      if(user1 !== "true")
      {
        alert("You are not logged in");
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return false;
      }

      return true;
  }
  
}

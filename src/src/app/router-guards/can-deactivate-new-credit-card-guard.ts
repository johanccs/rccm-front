import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';
import { HomeComponent } from "../components/home/home.component";

@Injectable()
export class CanDeactivateNewCreditCardGuard implements CanDeactivate<HomeComponent>{
    canDeactivate(component: HomeComponent): boolean {
        if(component.createCreditCardForm.dirty){
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }

}
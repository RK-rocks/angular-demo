import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthLoginService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthLoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("calling auth guard...");
        const currentUser = this.authenticationService.currentUserValue;
        console.log("currentUser",currentUser)
        if (currentUser) {
            // logged in so return true
            return true;
        }else{
            // this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        // this.router.navigate(['/']);
    }
}
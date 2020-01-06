import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthLoginService } from "../_services/auth.service";
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })
export class TokenGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthLoginService,
        private toastr: ToastrService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("calling token guard...");
        console.log(route.params.token)
        if (route.params) {
            let a = { "token": route.params.token }
            const url='user/checkfptoken'
            const res = await this.authenticationService.postRequest(url,a);
            if(res.status == 1){
                return true;
            }else{
                this.router.navigate(['/']);
                this.toastr.success(res.message)
                return false;
            }
        }else{
            this.router.navigate(['/']);
            this.toastr.success('Wrong token')
            return false;
        }
        // this.router.navigate(['/']);
    }
}
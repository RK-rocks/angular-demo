import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from "../../../_services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class addressDetailsResolver implements Resolve<any> {
    constructor(private AuthService: AuthService, private router: Router) { }
    async resolve(route: ActivatedRouteSnapshot) {
        try {
            let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
            let user_id = sessionData.userId
            const  url = 'address/getaddress';
            const obj = {"user_id":user_id}
            return await this.AuthService.postRequest(url,obj);
        } catch (err) {
            console.error('err', err);
            // this.router.navigate(['/']);
        }
    }
}


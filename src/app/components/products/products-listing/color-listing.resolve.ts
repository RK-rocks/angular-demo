import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthLoginService } from "../../../_services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class colorDetailsResolver implements Resolve<any> {
    constructor(private AuthLoginService: AuthLoginService, private router: Router) { }
    async resolve(route: ActivatedRouteSnapshot) {
        try {
            let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
            let user_id = sessionData.userId
            const  url = 'product/getproductcolor';
            const obj = {"user_id":user_id}
            return await this.AuthLoginService.postRequest(url,obj);
        } catch (err) {
            console.error('err', err);
            // this.router.navigate(['/']);
        }
    }
}


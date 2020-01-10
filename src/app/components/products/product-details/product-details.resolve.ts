import { Injectable } from '@angular/core';

import { Resolve,ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthLoginService } from "../../../_services/auth.service";
import {EncrDecrService} from '../../../_services/encr-decr.service';

@Injectable({
    providedIn: 'root'
})
export class allProductDetailsResolver implements Resolve<any> {
    id
    decryptId
    constructor(private AuthLoginService: AuthLoginService, 
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private EncrDecr: EncrDecrService) { }
    async resolve(route: ActivatedRouteSnapshot) {
        try {
            console.log(route.params.id)
            // this.activatedRoute.params.subscribe(params => {
            this.id = route.params.id;
            var cypherTetx = this.id.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
            if(cypherTetx.includes('Por21Ld')){
                cypherTetx = cypherTetx.replace('Por21Ld', '/')
            }
            var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', cypherTetx)
            this.decryptId = decrypted
            // })
            let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
            let user_id = sessionData.userId
            const  url = 'product/getproductdetailbyid';
            const obj = {"user_id":user_id,"product_id":this.decryptId}
            return await this.AuthLoginService.postRequest(url,obj);
        } catch (err) {
            console.error('err', err);
            // this.router.navigate(['/']);
        }
    }
}


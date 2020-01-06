import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, Router,ActivatedRoute } from '@angular/router';
import { AuthLoginService } from "../../../_services/auth.service";
import {EncrDecrService} from '../../../_services/encr-decr.service';

@Injectable({
    providedIn: 'root'
})
export class addressEditDataResolver implements Resolve<any> {
    id: string;
  editMode:any
  decrypted:any
    constructor(
        private AuthLoginService: AuthLoginService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private EncrDecr: EncrDecrService   
    ) { }
    async resolve(route: ActivatedRouteSnapshot) {
        try {
            this.id = route.params.id;
            var cypherTetx = this.id.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
            if(cypherTetx.includes('Por21Ld')){
                cypherTetx = cypherTetx.replace('Por21Ld', '/')
            }
            this.decrypted = this.EncrDecr.get('123456$#@$^@1ERF', cypherTetx)

            const  url = 'address/getaddressdetailsbyid';
            const obj = {"address_id":this.decrypted}
            return await this.AuthLoginService.postRequest(url,obj);
        } catch (err) {
            console.error('err', err);
        }
    }
}


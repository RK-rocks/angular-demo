import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute,RouterStateSnapshot } from "@angular/router";
import { AuthLoginService } from "../../../_services/auth.service";
import {EncrDecrService} from '../../../_services/encr-decr.service';


@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {
  addAddressForm: FormGroup;
  submitted = false;
  loading = false
  id: string;
  editMode:any
  decryptId:any
  letAddressData = []
  reqObj:any
  constructor(
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    private EncrDecr: EncrDecrService
  ) { }

  ngOnInit() {
    this.addAddressForm = this.formBuilder.group({
      address: ['', [Validators.required]]
    });

    if(this.activatedRoute.snapshot.params.id){
      this.activatedRoute.data.subscribe(data => {
        this.letAddressData = data.event.data.addressData;
      });
  
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        var cypherTetx = this.id.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
        if(cypherTetx.includes('Por21Ld')){
          cypherTetx = cypherTetx.replace('Por21Ld', '/')
        }
        var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', cypherTetx)
        this.editMode = params['id'] != null;
        this.decryptId = decrypted
      })
    }
  }

  get f() {
    return this.addAddressForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.loading = true
    if (this.addAddressForm.invalid) {
      this.loading = false
      return;
    }
    this.submitted = true;
    let url = 'address/addaddress'
      
    let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
    let user_id = sessionData.userId
    this.reqObj = {
      address:this.addAddressForm.value.address,
      user_id:user_id,
    }
    if(this.editMode){
      url = 'address/editaddress'
      this.reqObj.address_id = this.decryptId
    }
    try {
      let res = await this.AuthLoginService.postRequest(url,this.reqObj)
      if(res.status == 1){
        if(!this.editMode){
          this.router.navigate(['/dashboard/addres-list']);
        }
        this.loading = false

        this.toastr.success(res.message)
      }else{
        this.loading = false
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.loading = false
      this.toastr.warning(error.message)
    }
  }
}

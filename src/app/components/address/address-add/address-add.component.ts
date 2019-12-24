import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute,RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {
  addAddressForm: FormGroup;
  submitted = false;
  loading = false
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.addAddressForm = this.formBuilder.group({
      address: ['', [Validators.required]]
    });
  }

  get f() {
    return this.addAddressForm.controls;
  }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.loading = true
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid
    
    if (this.addAddressForm.invalid) {
      console.log(this.addAddressForm)
      this.loading = false
      return;
    }
    this.submitted = true;
      
    let url = 'address/addaddress'
    let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
    let user_id = sessionData.userId
    let reqObj = {
      address:this.addAddressForm.value.address,
      user_id:user_id
    }
    try {
      let res = await this.AuthService.postRequest(url,reqObj)
      if(res.status == 1){
        this.router.navigate(['/dashboard/addres-list']);
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

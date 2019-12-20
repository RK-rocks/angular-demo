import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { MobileValidator } from '../../helpers/mobile.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted = false;
  loading = false
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private toastr: ToastrService
  ) { }

  user: any = {};

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]]
  });
  }

  registerLink='/'

  get f() { 
    return this.forgotPasswordForm.controls; }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.loading = true
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid
    
    if (this.forgotPasswordForm.invalid) {
      this.loading = false
      return;
    }
    this.submitted = true;
    let url = 'forgotpassword'
    let reqObj = {
      email:this.forgotPasswordForm.value.email
    }
    try {
      let res = await this.AuthService.postRequest(url,reqObj)
      console.log(res)
      if(res.status == 1){
        this.router.navigate(["/"]);
        this.toastr.success(res.message)
      }else{
        this.loading = false
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.loading = false
      console.log('err', error);
    }
  }

}

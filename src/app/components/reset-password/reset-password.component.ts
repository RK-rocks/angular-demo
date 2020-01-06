import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthLoginService } from "../../_services/auth.service";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  loading = false;
  token;
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthLoginService: AuthLoginService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  user: any = {};

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.token = params.token
    });
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.required, PasswordStrengthValidator]]
    });
  }

  registerLink = '/'

  get f() {
    return this.resetPasswordForm.controls;
  }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.loading = true
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid

    if (this.resetPasswordForm.invalid) {
      this.loading = false
      return;
    }
    this.submitted = true;
    
    let url = 'resetpassword'
    let reqObj = {
      newPassword:this.resetPasswordForm.value.newPassword,
      token:this.token
    }
    try {
      let res = await this.AuthLoginService.postRequest(url,reqObj)
      console.log(res)
      if(res.status == 1){
        this.router.navigate(["/"]);
        this.toastr.success(res.message)
      }else{
        this.toastr.warning(res.message)
      }
    } catch (error) {
      console.log('err', error);
    }

  }

}

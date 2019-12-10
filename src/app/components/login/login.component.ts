import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { MobileValidator } from '../../helpers/mobile.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', [Validators.required, Validators.required, MobileValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registerLink = '/'
  forgotPassword = '/forgot-password'

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.loading = true
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid

    if (this.loginForm.invalid) {
      this.loading = false
      return;
    }
    this.submitted = true;
    console.warn(this.loginForm.value);
    console.log('+++++++++++++++++++++')
    console.log(this.loginForm.value.mobileNo)
    console.log('+++++++++++++++++++++')
    console.log(this.loginForm.value.password)
    let a = { "mobileNo": this.loginForm.value.mobileNo, "password": this.loginForm.value.password }
    
    try {
      const res = await this.AuthService.postRequest(a);
      console.log('res', res);
      const responseData = {
            userId: res.data.userData.user_id,
            token: res.data.userData.token
          }
      localStorage.setItem('currentUser', JSON.stringify(responseData));
      this.toastr.success(res.message)
      this.router.navigate(["/dashboard"]);
    } catch (err) {
      console.log('err', err);
    }

  }
}

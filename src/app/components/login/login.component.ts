import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { AlertService } from "../../_services/alert.service";
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
    private toastr: ToastrService,
    private alertService: AlertService
  ) { 
    if (this.AuthService.currentUserValue) {
      this.router.navigate(["/dashboard"]);
    }
  }

  user: any = {};

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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

    // reset alerts on submit
    this.alertService.clear();
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid

    if (this.loginForm.invalid) {
      console.log(this.loginForm)
      this.loading = false
      return;
    }
    this.submitted = true;
    let a = { "email": this.loginForm.value.email, "password": this.loginForm.value.password }

    try {
      const url='user/login'
      const res = await this.AuthService.postRequest(url,a);
      console.log(res)
      if(res.status == 1){
        const responseData = {
          userId: res.data.userData.user_id,
          token: res.data.userData.token
        }
        localStorage.setItem('currentUser', JSON.stringify(responseData));
        this.toastr.success(res.message)
        this.alertService.success(res.message,true)
        this.router.navigate(["/dashboard"]);
      }else{
        this.alertService.error(res.message,false)
        setTimeout(function(){
          this.alertService.clear();
        },1000);
        this.toastr.warning(res.message)
        this.loading = false
      }
    } catch (err) {
      console.log('err', err);
      this.loading = false
    }

  }
}

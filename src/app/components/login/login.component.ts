import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthLoginService } from "../../_services/auth.service";
import { AlertService } from "../../_services/alert.service";
import { MobileValidator } from '../../helpers/mobile.validator';
import { ToastrService } from 'ngx-toastr';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false
  loginWith
  isDisabled = false;
  loggedIn
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private authService: AuthService,
    private authenticationService: AuthLoginService

  ) {
    if (this.AuthLoginService.currentUserValue) {
      this.router.navigate(["/dashboard"]);
    }
  }

  user: any = {};

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.authState.subscribe(async (user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  registerLink = '/'
  forgotPassword = '/forgot-password'

  get f() {
    return this.loginForm.controls;
  }

  //login and logout functions
  async signInWithFB() {
    this.loginWith = '2'
    let user = this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    var email = (await user).email
    var id = (await user).id
    this.loading = true
    let a = {
      "email": email,
      "id": id,
      'login_with': this.loginWith
    }

    try {
      const url = 'user/loginwithsocialmedia'
      const res = await this.AuthLoginService.postRequest(url, a);
      console.log(res)
      if (res.status == 1) {
        const responseData = {
          userId: res.data.userData.user_id,
          token: res.data.userData.token,
          is_subscribed: res.data.userData.is_subscribed
        }
        localStorage.setItem('currentUser', JSON.stringify(responseData));
        this.authenticationService.currentUserSubject.next({
          id: 1, password: '122', first_name: 'aaa', last_name: 'ss'
        });
        this.isDisabled = true
        this.loading = false
        this.toastr.success(res.message)
        this.alertService.success(res.message, true)
        this.router.navigate(["/dashboard"]);
      } else {
        this.toastr.error(res.message)
        this.loading = false
      }
    } catch (err) {
      console.log('err', err);
      this.loading = false
    }
  }

  async signInWithGoogle() {
    this.loginWith = '1'
    let user = this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    var email = (await user).email
    var id = (await user).id
    this.loading = true
    let a = {
      "email": email,
      "id": id,
      'login_with': this.loginWith
    }

    try {
      const url = 'user/loginwithsocialmedia'
      const res = await this.AuthLoginService.postRequest(url, a);
      console.log(res)
      if (res.status == 1) {
        const responseData = {
          userId: res.data.userData.user_id,
          token: res.data.userData.token,
          is_subscribed: res.data.userData.is_subscribed
        }
        localStorage.setItem('currentUser', JSON.stringify(responseData));
        this.authenticationService.currentUserSubject.next({
          id: 1, password: '122', first_name: 'aaa', last_name: 'ss'
        });
        this.isDisabled = true
        this.loading = false
        this.toastr.success(res.message)
        this.alertService.success(res.message, true)
        this.router.navigate(["/dashboard"]);
      } else {
        this.toastr.error(res.message)
        this.loading = false
      }
    } catch (err) {
      console.log('err', err);
      this.loading = false
    }
  }

  signOut(): void {
    this.authService.signOut();
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
      const url = 'user/login'
      const res = await this.AuthLoginService.postRequest(url, a);
      console.log(res)
      if (res.status == 1) {
        const responseData = {
          userId: res.data.userData.user_id,
          token: res.data.userData.token,
          is_subscribed: res.data.userData.is_subscribed
        }
        localStorage.setItem('currentUser', JSON.stringify(responseData));
        this.authenticationService.currentUserSubject.next({
          id: 1, password: '122', first_name: 'aaa', last_name: 'ss'
        });
        this.isDisabled = true
        this.toastr.success(res.message)
        this.alertService.success(res.message, true)
        this.router.navigate(["/dashboard"]);
      } else {
        this.toastr.error(res.message)
        this.loading = false
      }
    } catch (err) {
      console.log('err', err);
      this.loading = false
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { MobileValidator } from '../../helpers/mobile.validator';

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
  ) { }

  user: any = {};

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      mobileNo: ['', [Validators.required,Validators.required,MobileValidator]]
  });
  }

  registerLink='/'

  get f() { 
    return this.forgotPasswordForm.controls; }

  onSubmit() {
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
    console.warn(this.forgotPasswordForm.value);
    console.log('+++++++++++++++++++++')
    console.log(this.forgotPasswordForm.value.mobileNo)
    console.log('+++++++++++++++++++++')
    console.log(this.forgotPasswordForm.value.password11)
    this.AuthService
      .login(this.forgotPasswordForm.value.mobileNo, this.forgotPasswordForm.value.password11)
      
    this.router.navigate(["/"]);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  loading = false
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
  ) { }

  user: any = {};

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required,Validators.required,PasswordStrengthValidator]],
      newPassword:['', [Validators.required,Validators.required,PasswordStrengthValidator]]
  });
  }

  registerLink='/'

  get f() { 
    return this.resetPasswordForm.controls; }

  onSubmit() {
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
    console.warn(this.resetPasswordForm.value);
    console.log('+++++++++++++++++++++')
    console.log(this.resetPasswordForm.value.oldPassword)
    console.log('+++++++++++++++++++++')
    console.log(this.resetPasswordForm.value.newPassword)
    // this.AuthService
    //   .login(this.resetPasswordForm.value.oldPassword, this.resetPasswordForm.value.newPassword)
      
    this.router.navigate(["/"]);
  }

}

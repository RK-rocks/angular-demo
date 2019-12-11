import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted = false;
  loading = false
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
  ) {
   }

  user: any = {};

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required,Validators.required,PasswordStrengthValidator]],
      newPassword:['', [Validators.required,Validators.required,PasswordStrengthValidator]]
  });
  }

  registerLink='/'

  get f() { 
    return this.changePasswordForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.loading = true
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid
    
    if (this.changePasswordForm.invalid) {
      this.loading = false
      return;
    }
    this.submitted = true;
    // this.AuthService
    //   .login(this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword)
      
    this.router.navigate(["/"]);
  }

}

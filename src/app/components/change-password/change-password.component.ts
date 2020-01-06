import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute,RouterStateSnapshot } from "@angular/router";
import { AuthLoginService } from "../../_services/auth.service";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';
import { ToastrService } from 'ngx-toastr';
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
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService
  ) {
   }

  user: any = {};

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'))
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required,Validators.required,PasswordStrengthValidator]],
      newPassword:['', [Validators.required,Validators.required,PasswordStrengthValidator]]
  });
  }

  registerLink='/'

  get f() { 
    return this.changePasswordForm.controls; }

  async onSubmit() {
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
      
    let url = 'changepassword'
    let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
    let user_id = sessionData.userId
    let reqObj = {
      oldPassword:this.changePasswordForm.value.oldPassword,
      newPassword:this.changePasswordForm.value.newPassword,
      user_id:user_id
    }
    try {
      let res = await this.AuthLoginService.postRequest(url,reqObj)
      if(res.status == 1){
        this.router.navigate(['/']);
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

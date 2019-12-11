import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';
import { MobileValidator } from '../../helpers/mobile.validator';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../../_services/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.maxLength(12)]],
      lastName: ['', [Validators.required,Validators.maxLength(12)]],
      mobileNo: ['', [Validators.required,MobileValidator]],
      password: ['', [Validators.required, PasswordStrengthValidator]],
      email: ['', [Validators.required,Validators.email]]
  });
  }

  

  // convenience getter for easy access to form fields
  get f() { 
    return this.registerForm.controls; }

    async onSubmit() {
      this.submitted = true;
      this.loading = true
      
      if (this.registerForm.invalid) {
        console.log(this.registerForm)
        this.loading = false
        return;
      }else{
        this.submitted = true;
        try {
          const url='register'
        const res = await this.AuthService.postRequest(url,this.registerForm.value);
        if(res.status == 1){
          this.toastr.success(res.message)
          this.router.navigate(["/"]);
        }else{
          this.loading = false;
          this.toastr.warning(res.message)
        }
        } catch (error) {
          console.log('err', error);
        }
      }
    }
}

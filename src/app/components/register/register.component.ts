import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';
import { MobileValidator } from '../../helpers/mobile.validator';


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
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.maxLength(12)]],
      lastName: ['', [Validators.required,Validators.maxLength(12)]],
      mobileNo: ['', [Validators.required,MobileValidator]],
      password: ['', [Validators.required, PasswordStrengthValidator]],
      address: ['', Validators.required]
  });
  }

  

  // convenience getter for easy access to form fields
  get f() { 
    return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid
    console.warn(this.registerForm.value);
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      this.loading = false
      return;
    }
    this.router.navigate(["/"]);
  }

}

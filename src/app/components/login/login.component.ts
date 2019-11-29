import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
  ) { }

  user: any = {};

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      password11: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  registerLink='/'

  get f() { 
    return this.loginForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid
    
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    console.warn(this.loginForm.value);
    this.AuthService
      .login(this.loginForm.value.mobileNo, this.loginForm.value.password11)
      
    this.router.navigate(["/dashboard"]);
  }
}

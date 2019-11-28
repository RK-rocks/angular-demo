import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    protected router: Router,
  ) { }

  ngOnInit() {
  }

  registerLink='/'

  loginForm = new FormGroup({
    mobileNo : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
    this.router.navigate(["/dashboard"]);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    protected router: Router,
  ) { }

  ngOnInit() {
  }

  registerForm = new FormGroup({
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    mobileNo : new FormControl('',Validators.required),
    password11 : new FormControl('',Validators.required),
    address : new FormControl('',Validators.required),
  })

  

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
    this.router.navigate(["/login"]);
  }

}

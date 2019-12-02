import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password11: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required]
  });
  }

  

  // convenience getter for easy access to form fields
  get f() { 
    console.log(this.registerForm.controls)
    console.log(this.submitted)
    return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true
    // TODO: Use EventEmitter with form value
    // stop here if form is invalid
    console.warn(this.registerForm.value);
    if (this.registerForm.invalid) {
      this.loading = false
      return;
    }
    this.router.navigate(["/"]);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';
import { MobileValidator } from '../../helpers/mobile.validator';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../../_services/auth.service";
import { User } from '../../models/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  registerForm: FormGroup;
  url:any = '';
  submitted = false;
  loading = false
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private toastr: ToastrService,
    private activatedRoute :ActivatedRoute
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.maxLength(12)]],
      lastName: ['', [Validators.required,Validators.maxLength(12)]],
      image:[]
  });


}
userData = this.activatedRoute.snapshot.data['event'].data.userData; 

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}

  // convenience getter for easy access to form fields
  get f() { 
    return this.registerForm.controls; }

    async onSubmit() {
      console.log(this.registerForm.value)
      this.submitted = true;
      this.loading = true
      
      if (this.registerForm.invalid) {
        console.log(this.registerForm.value)
        this.loading = false
        return;
      }else{
        this.submitted = true;
        try {
          const urlI='user/updateprofile'
          const formData = new FormBuilder;
          console.log("++++++++++++++++++++++++++++++++++++++++")
          let firstName = this.registerForm.get('firstName').value
          let lastName = this.registerForm.get('lastName').value
          let image = this.fileData
          let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
          let user_id = sessionData.userId
          let dataObj = {
            "first_name":firstName,
            "last_name":lastName,
            "user_id":user_id,
            "image":image
          }

          console.log('formData',formData)
        const res = await this.AuthService.postFormRequest(urlI,dataObj);
        if(res.status == 1){
          this.toastr.success(res.message)
          this.loading = false;
          // this.router.navigate(["/"]);
        }else{
          this.loading = false;
          this.toastr.warning(res.message)
        }
        } catch (error) {
          console.log('err', error);
          this.loading = false;
        }
      }
    }    
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // console.log(event.target.result)
        // this.url = event.target.result;
      }
    }
  }
  public delete(){
    this.url = '';
  }
}

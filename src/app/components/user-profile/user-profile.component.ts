import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { PasswordStrengthValidator } from '../../helpers/password-strength.validator';
import { MobileValidator } from '../../helpers/mobile.validator';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../_services/auth.service";
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

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
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    private activatedRoute :ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.maxLength(12)]],
      lastName: ['', [Validators.required,Validators.maxLength(12)]],
      image:[]
  });
  if(this.userData.profile_image){
    console.log(this.userData)
    this.url = `${environment.userUrl}`+'/'+'/'+this.userData.profile_image
  }

}
userData = this.activatedRoute.snapshot.data['event'].data.userData; 

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log(this.fileData)
    this.preview();
}

  public delete(){
    this.url = '';
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
    this.url = reader.result; 
  }
}

  // convenience getter for easy access to form fields
  get f() { 
    return this.registerForm.controls; }

    async onSubmit() {
      this.submitted = true;
      this.loading = true
      
      if (this.registerForm.invalid) {
        this.loading = false
        return;
      }else{
        this.submitted = true;
        try {
          const urlI='http://localhost:4065/user/updateprofile'
          const formData = new FormData();
          console.log("++++++++++++++++++++++++++++++++++++++++")
          let firstName = this.registerForm.get('firstName').value
          let lastName = this.registerForm.get('lastName').value
          let image = this.fileData
          console.log(this.fileData)
          let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
          let user_id = sessionData.userId
          
          formData.append('profile_pic', this.fileData);
          formData.append('first_name', firstName);
          formData.append('last_name', lastName);
          formData.append('user_id', user_id);
          
          const res:any =   this.http.post(urlI, formData)
      .subscribe(result => {
        console.log(res);
        if(result['status'] == 1){
          this.toastr.success(result['message'])
          this.loading = false;
          // this.router.navigate(["/"]);
        }else{
          this.loading = false;
          this.toastr.warning(result['message'])
        }
      })
      console.log(res)
      
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
      this.fileProgress(event)
      reader.onload = (event) => { // called once readAsDataURL is completed
        // console.log(event.target.result)
        // if(event.target.result){
        //   // this.url = event.target.result;
        // }
      }
    }
  }
}

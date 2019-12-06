import { Component } from '@angular/core';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name :string= 'raj';
  age:number = 12

  constructor(public userService:UserService){
    
  }

  // getEmail(event){
  //   console.log(event)
  // }
}

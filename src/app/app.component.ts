import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title :string= 'raj';
  age:number = 12

  constructor(public userService:UserService){
    
  }

  getEmail(event){
    console.log(event)
  }
}

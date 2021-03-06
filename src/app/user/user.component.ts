import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input('username') userName: string

  @Input('userage') age: number

  @Output() email = new EventEmitter()

  constructor(public dataservice: UserService) {

  }

  ngOnInit() {
    let data = "demo@gmail.com"
    this.email.emit(data)
  }

}

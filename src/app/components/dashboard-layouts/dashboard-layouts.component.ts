import { Component, OnInit } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import {ChangePasswordComponent} from '../change-password/change-password.component'

@Component({
  selector: 'app-dashboard-layouts',
  templateUrl: './dashboard-layouts.component.html',
  styleUrls: ['./dashboard-layouts.component.scss']
})
export class DashboardLayoutsComponent implements OnInit {

  constructor(NbSidebarModule:NbSidebarModule,
    NbLayoutModule:NbLayoutModule,
    NbSidebarService:NbSidebarService) { }

  ngOnInit() {
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component"
import { RegisterComponent } from "../app/components/register/register.component";
import { LoginComponent } from "../app/components/login/login.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {DashboardLayoutsComponent} from './components/dashboard-layouts/dashboard-layouts.component'

import { AuthGuard } from './_guards';

const routes: Routes = [
  {
    path:'user',
    component:UserComponent
  },
  {
    path: "",
    component: LoginComponent,
    
  },
  {
    path: "register",
    canActivate:[AuthGuard],
    component: RegisterComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent
  },
  {
    path: "dashboard",
    canActivate:[AuthGuard],
    component: DashboardLayoutsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component"
import { RegisterComponent } from "../app/components/register/register.component";
import { LoginComponent } from "../app/components/login/login.component";

const routes: Routes = [
  {path:'user',component:UserComponent},
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
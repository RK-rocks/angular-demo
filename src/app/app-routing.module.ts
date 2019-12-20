import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from "./user/user.component"
import { RegisterComponent } from "../app/components/register/register.component";
import { LoginComponent } from "../app/components/login/login.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardLayoutsComponent } from './components/dashboard-layouts/dashboard-layouts.component'
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import {UserProfileComponent} from './components/user-profile/user-profile.component'
import { AuthGuard, TokenGuard } from './_guards';
import { userProfileDetailsResolver} from './components/user-profile/user-profile.resolve';
import { ordersDetailsResolver} from './components/orders/orders.resolve';
import {AddressListingComponent} from './components/address-listing/address-listing.component'
import {OrdersComponent} from './components/orders/orders.component'

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: "",

    component: LoginComponent,

  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-password/:token",
    canActivate: [TokenGuard],
    component: ResetPasswordComponent
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardLayoutsComponent,
    children: [
      {
        path: "change-password",
        component: ChangePasswordComponent
      },
      {
        path: "update-profile",
        resolve: {
          event: userProfileDetailsResolver,
        },
        component: UserProfileComponent
      },
      {
        path: "addres-list",
        resolve: {
          event: userProfileDetailsResolver,
        },
        component: AddressListingComponent
      },
      {
        path: "order-list",
        resolve: {
          event: ordersDetailsResolver,
        },
        component: OrdersComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from "./user/user.component"
import { RegisterComponent } from "../app/components/register/register.component";
import { LoginComponent } from "../app/components/login/login.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardLayoutsComponent } from './components/dashboard-layouts/dashboard-layouts.component'
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { AuthGuard, TokenGuard } from './_guards';
import { userProfileDetailsResolver } from './components/user-profile/user-profile.resolve';
import { productDetailsResolver } from './components/products/products-listing/product-listing.resolve';
import { colorDetailsResolver } from './components/products/products-listing/color-listing.resolve';
import { categoryDetailsResolver } from './components/products/products-listing/category-listing.resolve';
import { ordersDetailsResolver } from './components/orders/orders-list/orders.resolve';
import { addressDetailsResolver } from './components/address/address-listing/address-listing.resolve';
import { addressEditDataResolver } from './components/address/address-add/address-edit.resolve';
import { AddressListingComponent } from './components/address/address-listing/address-listing.component'
import { AddressAddComponent } from './components/address/address-add/address-add.component'
import { OrdersComponent } from './components/orders/orders-list/orders.component'
import {ProductsListingComponent} from './components/products/products-listing/products-listing.component'
import {SubscribeComponent} from './components/subscribe/subscribe.component'
import {LocateUsComponent} from './components/locate-us/locate-us.component'
import {allProductDetailsResolver} from './components/products/product-details/product-details.resolve'
import {ProductDetailsComponent} from './components/products/product-details/product-details.component'
import {CartListingComponent} from './components/cart-listing/cart-listing.component'
import {cartDetailsResolver} from './components/cart-listing/cart-listing.resolve'
import { CheckoutComponent } from './components/checkout/checkout.component';
import {StripePaymentFormComponent} from './components/stripe-payment-form/stripe-payment-form.component'

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
        path: "",
        resolve: {
          event: productDetailsResolver,colorDetailsResolver,categoryDetailsResolver
        },
        component: ProductsListingComponent
      },
      {
        path: "product-details/:id",
        resolve: {
          event: allProductDetailsResolver
        },
        component: ProductDetailsComponent
      },
      //from here
      // {
      //   path: "?color_id=:color_id",
      //   resolve: {
      //     event: productDetailsResolver,colorDetailsResolver,categoryDetailsResolver
      //   },
      //   component: ProductsListingComponent
      // },
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
          event: addressDetailsResolver,
        },
        component: AddressListingComponent,
        runGuardsAndResolvers: 'always'
      },
      {
        path: "addres-add",
        component: AddressAddComponent
      },
      {
        path: "addres-add/:id",
        component: AddressAddComponent,
        resolve:{
          event:addressEditDataResolver
        }
      },
      {
        path: "subscribe",
        component: SubscribeComponent,
      },
      {
        path: "locate-us",
        component: LocateUsComponent,
      },
      {
        path: "order-list",
        resolve: {
          event: ordersDetailsResolver,
        },
        component: OrdersComponent
      },
      {
        path: "cart-list",
        resolve: {
          event: cartDetailsResolver,
        },
        component: CartListingComponent
      },
      {
        path: "stripe-payment",
        // resolve: {
        //   event: cartDetailsResolver,
        // },
        component: StripePaymentFormComponent
      },
      {
        path: "check-out",
        resolve: {
          event: addressDetailsResolver,
        },
        component: CheckoutComponent,
        runGuardsAndResolvers:'always'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

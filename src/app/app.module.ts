import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './_services/user.service';
import { RegisterComponent } from './components/register/register.component'
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardLayoutsComponent } from './components/dashboard-layouts/dashboard-layouts.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NbSidebarModule, NbSidebarService } from '@nebular/theme';
import { AuthLoginService } from "./_services/auth.service";
import { AlertComponent } from './components/helper-components/alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddressListingComponent } from './components/address/address-listing/address-listing.component';
import { OrdersComponent } from './components/orders/orders-list/orders.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipDirective } from './components/helper-components/tooltip/tooltip.directive';
import { AddressAddComponent } from './components/address/address-add/address-add.component'
import {EncrDecrService} from './_services/encr-decr.service';
import { ConfirmationDialogComponent } from './components/helper-components/confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsListingComponent } from './components/products/products-listing/products-listing.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider,GoogleLoginProvider } from 'angularx-social-login';


const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1008661869510444')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("27464076111-s4aprm4m0r7sb6gjullkfr48l68cqql6")
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardLayoutsComponent,
    ChangePasswordComponent,
    AlertComponent,
    UserProfileComponent,
    AddressListingComponent,
    OrdersComponent,
    JwPaginationComponent,
    TooltipDirective,
    AddressAddComponent,
    ConfirmationDialogComponent,
    ProductsListingComponent,
    SubscribeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbSidebarModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    NgxPaginationModule,
    NgbModule,
    SocialLoginModule
  ],
  providers: [UserService, NbSidebarService, AuthLoginService,EncrDecrService
    // ConfirmationDialogService
    ,[
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      }
    ],
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule { }

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
import {AuthService} from "./_services/auth.service";
import { AlertComponent } from './components/helper-components/alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

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
    UserProfileComponent
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
    FontAwesomeModule
  ],
  providers: [UserService,NbSidebarService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

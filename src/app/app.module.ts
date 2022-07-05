import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { ErrorComponent } from './components/error/error.component';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';
import socketIOConfig from './config/socketIO';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OpenIDAuthService } from './service/openId-auth.service';
import { MetaDataService } from './service/meta-data.service';
import { BaseApiGatewayService } from './service/base-api-gateway.service';
import { DepartmentAddEditComponent } from './components/department-add-edit/department-add-edit.component';
import { DepartmentListingComponent } from './components/department-listing/department-listing.component';
import { EmployeeAddEditComponent } from './components/employee-add-edit/employee-add-edit.component';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import AutherizationInterceptor from './Interceptors/authorisation.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    EmployeeListingComponent,
    EmployeeAddEditComponent,
    DepartmentAddEditComponent,
    DepartmentListingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketIOConfig),
    OAuthModule.forRoot()

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AutherizationInterceptor, multi: true },
    OpenIDAuthService,
    MetaDataService,
    BaseApiGatewayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

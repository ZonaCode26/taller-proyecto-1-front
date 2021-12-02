import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CustomerHeaderComponent } from './components/header/customer-header/customer-header.component';
import { ForgotPasswordComponent } from './components/security/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    CustomerHeaderComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    CustomerHeaderComponent,
    ForgotPasswordComponent,
  ]
})
export class SharedModule { }

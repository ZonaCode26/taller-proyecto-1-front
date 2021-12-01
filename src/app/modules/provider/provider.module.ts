import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { ProviderRoutingModule } from './provider-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FormsModule,
    SharedModule,
    DataTablesModule
  ]
})
export class ProviderModule { }

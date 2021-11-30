import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CustomerHeaderComponent } from './components/header/customer-header/customer-header.component';


@NgModule({
  declarations: [
    CustomerHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    CustomerHeaderComponent
  ]
})
export class SharedModule { }

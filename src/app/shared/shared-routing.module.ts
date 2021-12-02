import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/security/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'forgot-password',component:ForgotPasswordComponent}
  
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'customer'},
  {path:'customer',loadChildren: () => import('../modules/customer/customer.module').then(m => m.CustomerModule) }/*,
  {path:'store',loadChildren: () => import('../modules/store/store.module').then(m => m.StoreModule)} ,
  {path:'login',loadChildren: () => import('../modules/security/security.module').then(m => m.SecurityModule)} ,
  {path:'manager',loadChildren: () => import('../modules/manager/manager.module').then(m => m.ManagerModule)} 
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModuloRoutingModule { 



}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'customer',pathMatch:'full' },
  {path:'customer',loadChildren: () => import('../modules/customer/customer.module').then(m => m.CustomerModule) },
  {path:'provider',loadChildren: () => import('../modules/provider/provider.module').then(m => m.ProviderModule) },
  {path:'security',loadChildren: () => import('../shared/shared.module').then(m => m.SharedModule) }/*,
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

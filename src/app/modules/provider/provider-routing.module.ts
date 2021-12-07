import { ProductsComponent } from './../customer/pages/products/products.component';
import { GuardService } from './../../core/services/guard.service';
import { ProductoComponent } from './pages/producto/producto.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'login'},
  { path:'login',component:LoginComponent },

  { path:'products',component:ProductoComponent, canActivate: [GuardService] },
  { path:'productos',component:ProductsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }

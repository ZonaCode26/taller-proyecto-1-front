import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';

const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'login'},
  { path:'login',component:LoginComponent },
  { path:'products',component:ProductsComponent },
  { path:'products/detail/:id', component:DetalleProductoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

import { SharedModule } from './../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListadoProductoComponent } from './components/producto/listado-producto/listado-producto.component';
import { DataTablesModule } from 'angular-datatables';
import { StoreProductoComponent } from './components/producto/store-producto/store-producto.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';



@NgModule({
  declarations: [
    LoginComponent,
    ProductsComponent,
    ListadoProductoComponent,
    StoreProductoComponent,
    DetalleProductoComponent

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    SharedModule,
    DataTablesModule

  ]
})
export class CustomerModule { }

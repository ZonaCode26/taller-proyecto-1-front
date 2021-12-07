import { MyInformation } from './../../../../../shared/models/my-information';
import { LoginService } from './../../../../../core/services/login.service';
import { CarritoService } from './../../../../../core/services/store/carrito.service';
import { CarritoItem } from './../../../../../shared/models/store/carrito-item';
import { FilterProducts } from './../../../../../shared/models/request/filter-products';
import { FilterBasic } from './../../../../../shared/models/request/filter-basic';
import { DataProducts } from './../../../../../shared/models/data-products';
import { Producto } from './../../../../../shared/models/producto';
import { ProductoService } from './../../../../../core/services/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Carrito } from 'src/app/shared/models/store/carrito';

@Component({
  selector: 'app-store-producto',
  templateUrl: './store-producto.component.html',
  styleUrls: ['./store-producto.component.css']
})
export class StoreProductoComponent implements OnInit {
  request: {viewas: string, orderby: string};
  products: Producto[] = [];  
  dataProd:DataProducts;
  dtTrigger: Subject<any> = new Subject<any>();
  filterRequest:FilterProducts;
  paginationArray: Array<any>;
  conteo:number;

  usuarioSesion:MyInformation= new MyInformation();

//  workCarrito:Carrito;
  // pageOfItems: Array<any>;

  constructor(private rutaActiva: ActivatedRoute,
              private service: ProductoService, 
              private router: Router,
              private carritoService:CarritoService,
              private loginService:LoginService
    ) { }

  ngOnInit(): void {
    this.usuarioSesion =  JSON.parse(sessionStorage.getItem('user-info'));// (sessionStorage.getItem('user-info') as any) ;
   
    this.filterRequest = new FilterProducts();
    this.filterRequest.estado = true;
    var filter2 =new FilterBasic();

    filter2.pageNo = 0;
    filter2.pageSize = 12;

    filter2.sort = "desc";
    filter2.sortBy ="nombre";
    this.filterRequest.filter = filter2;




    this.service.listarWithFilter(null).subscribe(data=>{
      this.dataProd = (data as any);
      this.products = this.dataProd.content;
//      this.paginationSize = this.dataProd.totalPages;
      this.paginationArray = Array( this.dataProd.totalPages);
      this.dtTrigger.next();
    });
    this.conteo = this.carritoService.obtenerConteo();

/*
    this.service.listar().subscribe(data=>{
      this.products = (data as any);
      this.dtTrigger.next();
    });
    */
    this.request = {
      viewas: this.rutaActiva.snapshot.params.viewas,
      orderby: this.rutaActiva.snapshot.params.orderby
    };

    this.rutaActiva.queryParams.subscribe(
      (params: Params) => {

        this.request.viewas = params.viewas;
        this.request.orderby = params.orderby;
        console.log("entro a ver: "+ this.request.viewas );
        console.log("entro a ver: "+ this.request.orderby );
       
      });
   


  }

  verDetalles(id: number){
    console.log("Se clickeó", id);
    this.router.navigate([`customer/products/detail/${id}`]);
  }

//   onChangePage(pageOfItems: Array<any>) {
//     // update current page of items
//     this.products = pageOfItems;
// }

cambiarPagina(num: number){

  this.filterRequest.filter.pageNo = num;

  this.service.listarWithFilter(this.filterRequest).subscribe(data=>{
    this.dataProd = (data as any);
    this.products = this.dataProd.content;
//      this.paginationSize = this.dataProd.totalPages;
    this.paginationArray = Array( this.dataProd.totalPages);
    this.dtTrigger.next();
  });
  console.log(num);
}

onOptionsSelectedOrd(value:string){
  console.log(value);
  this.filterRequest.filter.sort = value;
  this.service.listarWithFilter(this.filterRequest).subscribe(data=>{
    this.dataProd = (data as any);
    this.products = this.dataProd.content;
//      this.paginationSize = this.dataProd.totalPages;
    this.paginationArray = Array( this.dataProd.totalPages);
    this.dtTrigger.next();
  });
}

onOptionsSelectedPag(value:number){
  console.log(value);
  this.filterRequest.filter.pageSize=value;
  this.service.listarWithFilter(this.filterRequest).subscribe(data=>{
    this.dataProd = (data as any);
    this.products = this.dataProd.content;
//      this.paginationSize = this.dataProd.totalPages;
    this.paginationArray = Array( this.dataProd.totalPages);
    this.dtTrigger.next();
  });
}

clickBuscarProducto(value:string){
  this.filterRequest.nombre=value;
  this.service.listarWithFilter(this.filterRequest).subscribe(data=>{
    this.dataProd = (data as any);
    this.products = this.dataProd.content;
//      this.paginationSize = this.dataProd.totalPages;
    this.paginationArray = Array( this.dataProd.totalPages);
    this.dtTrigger.next();
  });
}

addCart(prod:Producto){
  this.carritoService.agregar(prod);
  this.conteo = this.carritoService.obtenerConteo();
}

goCarrito(){
  this.router.navigate([`customer/carrito`]);
}

cerrarSesion(){
  this.loginService.cerrarSesion();
}

formateaValor(valor) {
  // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
  return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
}


}

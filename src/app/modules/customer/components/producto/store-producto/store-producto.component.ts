import { Producto } from './../../../../../shared/models/producto';
import { ProductoService } from './../../../../../core/services/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-store-producto',
  templateUrl: './store-producto.component.html',
  styleUrls: ['./store-producto.component.css']
})
export class StoreProductoComponent implements OnInit {
  request: {viewas: string, orderby: string};
  products: Producto[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private rutaActiva: ActivatedRoute,private service: ProductoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(data=>{
      this.products = (data as any);
      this.dtTrigger.next();
    });
    
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

}

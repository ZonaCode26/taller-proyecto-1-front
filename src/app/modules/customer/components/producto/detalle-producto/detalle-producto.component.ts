import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Producto } from 'src/app/shared/models/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  request: {id:number};
  products: Producto[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();
  productId: number;

  constructor(private rutaActiva: ActivatedRoute,private service: ProductoService, private router: Router) { }

  ngOnInit(): void {

    this.productId = this.rutaActiva.snapshot.params.id;

    this.service.listarPorId(this.productId).subscribe(data=>{
      this.products = (data as any);
      this.dtTrigger.next();
      console.log("this.products", this.products);
    });
  }

  regresar(){
    this.router.navigate(['customer/products']);
  }

}

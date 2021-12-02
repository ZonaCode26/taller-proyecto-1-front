import { CarritoService } from './../../../../../core/services/store/carrito.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars-producto',
  templateUrl: './cars-producto.component.html',
  styleUrls: ['./cars-producto.component.css']
})
export class CarsProductoComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,private service: ProductoService, private router: Router,private carritoService:CarritoService) { }

  ngOnInit(): void {
  }

 

}

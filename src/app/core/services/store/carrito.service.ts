import { CarritoItem } from './../../../shared/models/store/carrito-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos: CarritoItem[] = [];  
  clave:string;
  item: CarritoItem;
  
  constructor() {
    this.clave = this.clave || "productos";
    this.productos = this.obtener();
}

agregar(producto) {
//  console.log(producto);
    this.item = producto;
  
    if (!this.existe(producto.id)) {
      this.item.cantidad = 1;
        this.productos.push(this.item);
        this.guardar();
    }else{
      this.productos.forEach(x=>{
        if(x.id=== producto.id){
          x.cantidad=x.cantidad+1;
        }
      });
      this.guardar();
    }
}

quitar(id) {
    const indice = this.productos.findIndex(p => p.id === id);
    if (indice != -1) {
        this.productos.splice(indice, 1);
        this.guardar();
    }
}

guardar() {
    localStorage.setItem(this.clave, JSON.stringify(this.productos));
}

obtener() {
    const productosCodificados = localStorage.getItem(this.clave);
    return JSON.parse(productosCodificados) || [];
}

existe(id) {
    return this.productos.find(producto => producto.id === id);
}

obtenerConteo() {
    return this.productos.length;
}


}

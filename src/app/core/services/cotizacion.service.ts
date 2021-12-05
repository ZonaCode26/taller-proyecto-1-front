import { FilterCotizacion } from './../../shared/models/request/filter-cotizacion';
import { DatatableGeneric } from './../../shared/models/datatable-generic';
import { CrearCotizacion } from './../../shared/models/crear-cotizacion';
import { environment } from './../../../environments/environment';
import { Cotizacion } from './../../shared/models/cotizacion';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/shared/models/producto';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService extends GenericService<Cotizacion> {

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/cotizacion`
    );
   }

   crearCotizacion( obj: Producto[] ){
    var crearCotizacion = new CrearCotizacion();
    var cotizacion  =  new Cotizacion();
    crearCotizacion.cotizacion = cotizacion;
    crearCotizacion.productos = obj;
    const headers = { 'content-type': 'application/json'}  
    return this.http.post<Cotizacion>(`${environment.HOST}/cotizacion/crear-cotizacion`,crearCotizacion,{'headers':headers});
 
   }

   
  generarReporte(id:number){
    return this.http.get(`${this.url}/generar-pdf-cotizacion/`+id, {
      responseType: 'blob'
    });
  }

  listarDataTable(filter:FilterCotizacion){
    const headers = { 'content-type': 'application/json'}  
    return this.http.post<DatatableGeneric>(`${environment.HOST}/cotizacion/datatable-filter`,filter,{'headers':headers}); 
   }


   consultarReporte(id:number){
    return this.http.get(`${this.url}/leerArchivo/`+id, {
      responseType: 'blob'
    });
  }


  realizarPedido(obj:Cotizacion){
    const headers = { 'content-type': 'application/json'}  
    return this.http.post<Cotizacion>(`${environment.HOST}/cotizacion/crear-pedido`,obj,{'headers':headers});
  }



   
   
}

import { DatatableGeneric } from './../../shared/models/datatable-generic';
import { environment } from './../../../environments/environment';
import { Producto } from './../../shared/models/producto';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto> {

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/producto`
    );
   }

   listarDataTable(){
    return  this.http.get<DatatableGeneric>(`${environment.HOST}/producto`);
   }
   
}
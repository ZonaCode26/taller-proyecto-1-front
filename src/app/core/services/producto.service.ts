import { FilterBasic } from './../../shared/models/request/filter-basic';
import { DataProducts } from './../../shared/models/data-products';
import { FilterProducts } from './../../shared/models/request/filter-products';
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


   listarWithFilter(filterRequest:FilterProducts ){
    if(filterRequest===null){
      filterRequest = new FilterProducts();
      filterRequest.estado = true;
      var filter2 =new FilterBasic();

      filter2.pageNo = 0;
      filter2.pageSize = 12;

      filter2.sort = "desc";
      filter2.sortBy ="nombre";
      filterRequest.filter = filter2;
    }

    const headers = { 'content-type': 'application/json'}  
     return this.http.post<DataProducts>(`${environment.HOST}/producto/filter-data`,filterRequest,{'headers':headers});
   }

   
}
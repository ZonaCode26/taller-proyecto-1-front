import { environment } from './../../../environments/environment';
import { Cotizacion } from './../../shared/models/cotizacion';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

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
}

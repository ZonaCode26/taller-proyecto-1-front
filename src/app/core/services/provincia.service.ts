import { environment } from './../../../environments/environment';
import { Provincia } from './../../shared/models/provincia';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService extends GenericService<Provincia> {

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/localidad/provincia`
    );
   }
}
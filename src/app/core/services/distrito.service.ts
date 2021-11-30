import { environment } from './../../../environments/environment';
import { Distrito } from './../../shared/models/distrito';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistritoService extends GenericService<Distrito> {

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/localidad/distrito`
    );
   }
}
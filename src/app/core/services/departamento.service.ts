import { environment } from './../../../environments/environment';
import { Departamento } from './../../shared/models/departamento';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends GenericService<Departamento> {

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/localidad/departamento`
    );
   }
}

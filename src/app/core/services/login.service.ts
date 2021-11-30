import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url : string =  `${environment.HOST}/authenticate`;

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  login(usuario:string,password:string){
    const headers = { 'content-type': 'application/json'}  
    /*
    const bodyJson = { 'username':  `${encodeURIComponent(usuario)}`,
    'password':  `${encodeURIComponent(password)}`}  
*/
    const bodyJson = { 'username':  usuario,
    'password':  `${encodeURIComponent(password)}`}  

    //const body=JSON.stringify( this.user);
    return this.http.post<any>(this.url, bodyJson,{'headers':headers});      
  }

  estaLogueado(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['store']);      
  }

}

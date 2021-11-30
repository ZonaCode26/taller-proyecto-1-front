import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot  } from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  
  constructor(
    private loginService:LoginService,
  ) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    //estar logueado
    let rpta = this.loginService.estaLogueado();
    if(!rpta){
      this.loginService.cerrarSesion();
      return false;
    }else{
      const helper =  new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
    //si token no a expirado
      if(!helper.isTokenExpired(token)){
        let urlAcceding =  state.url;    
      //verificar si tiene lo necesario para acceder
      return true;
      }else{
        this.loginService.cerrarSesion();
        return false;  
      }
    }
    return false;
  }

}

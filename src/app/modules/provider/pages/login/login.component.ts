import { GenericErrorResponse } from './../../../../shared/models/generic-error-response';
import { environment } from './../../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginService } from './../../../../core/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  genericError:GenericErrorResponse;
  errores: string[] = [];  

  usuario:string;
  clave:string;
  mensaje:string;
  error:string;

  constructor( private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    this.errores = [];
    this.loginService.loginProvider(this.usuario,this.clave).subscribe(data=>{
      console.log(data);
      sessionStorage.setItem(environment.TOKEN_NAME,data.token);
      const helper = new JwtHelperService();

      let decodecToken = helper.decodeToken(data.token);
        this.router.navigate(['provider/productos']);

    },
    error => {

      this.genericError = (error.error as any) ;
      
      if(this.genericError.message === "INVALID_CREDENTIALS"){
        this.errores.push("!Usuario o password incorrecto!");
      }else{
        this.errores = (this.genericError.errors as any) ;
      }


      // this.errores.push("!Usuario o password incorrecto!");

      // this.errores = (error.error as any) ;
      
      // console.log(error.error.message);
      // console.log(this.errores);
      //  if(error.error.message === "INVALID_CREDENTIALS"){
      //   this.errores.push("!Usuario o password incorrecto!");
      // }


    });
  }

}

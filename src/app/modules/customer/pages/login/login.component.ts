import { GenericErrorResponse } from './../../../../shared/models/generic-error-response';
import { environment } from './../../../../../environments/environment';
import { LoginService } from './../../../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  forgotPass(){
    this.router.navigate([`security/forgot-password`]);
  }

  iniciarSesion(){
    /*this.loginService.login(this.usuario,this.clave).pipe(
      catchError(this.handleError('searchHeroes', [])) // then handle the error
    );*/
    this.errores = [];
    this.loginService.login(this.usuario,this.clave).subscribe(data=>{
      //console.log(data);
      console.log("holaaaaa");
      
      sessionStorage.setItem(environment.TOKEN_NAME,data.token);
      const helper = new JwtHelperService();



      this.loginService.myInformation().subscribe(x=>{
        
        sessionStorage.setItem('user-info', JSON.stringify(x));
        this.router.navigate([`customer/products`]);
      });

      let decodecToken = helper.decodeToken(data.token);
     

    },
    error => {
      this.genericError = (error.error as any) ;
      
      if(this.genericError.message === "INVALID_CREDENTIALS"){
        this.errores.push("!Usuario o password incorrecto!");
      }else{
        this.errores = (this.genericError.errors as any) ;
      }
    });
  }
  
cerrarSesion(){
  this.loginService.cerrarSesion();
}
  
  
  /*
  ngAfterViewInit() {
    (window as any).initialize();
  }*/

}

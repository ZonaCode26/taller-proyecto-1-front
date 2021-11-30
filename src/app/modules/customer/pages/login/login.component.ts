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

  iniciarSesion(){
    this.loginService.login(this.usuario,this.clave).subscribe(data=>{
      console.log(data);
      sessionStorage.setItem(environment.TOKEN_NAME,data.token);
      const helper = new JwtHelperService();

      let decodecToken = helper.decodeToken(data.token);
        this.router.navigate(['customer/products']);

    });
  }

}

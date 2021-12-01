import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import {ModuloRoutingModule } from './routing/app-routing'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ModuloRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        headerName:"Authorization",
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:8080"],
        //allowedDomains: ["http://18.206.89.84:8080"],
/*        disallowedRoutes: ["http://0d32-2800-200-e430-191-19-2ade-59c-5203.ngrok.io/authenticate",
                          "http://0d32-2800-200-e430-191-19-2ade-59c-5203.ngrok.io/authenticate/client",
                          "http://0d32-2800-200-e430-191-19-2ade-59c-5203.ngrok.io/authenticate/provider"],*/
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

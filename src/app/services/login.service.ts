import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { LoginModel } from '../models/login-model';
import { URL_SERVICES } from '../config/config';
import Swal from 'sweetalert2'
import { ErrorManager } from '../errors/error-manager';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient, public router: Router) { 
  }


  public getCurrentUser(): LoginModel {
  
    const token = localStorage.getItem('tk');

    if (!token){
      console.log('No hay token');
      Swal.fire('Acceso Restringido', 'No hay token', 'error');
      //redirectToLogin(this.router);
      return null;
    }
  
    if (this.jwtHelper.isTokenExpired(token)) {
      console.log('Token expirado');
      Swal.fire('Acceso Restringido', 'Token expirado', 'error');
      //redirectToLogin(this.router);
      return null;
    }

  
    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken;
   
  }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('tk');


    if (!token){
      console.log('No hay token');
      Swal.fire('Acceso Restringido', 'No hay token', 'error');
      //redirectToLogin(this.router);
      return false;
    }
  
    if (this.jwtHelper.isTokenExpired(token)) {
      console.log('Token expirado');
      Swal.fire('Acceso Restringido', 'Token expirado', 'error');
      //redirectToLogin(this.router);
      return false;
    }
  
    return true;
  
  }


  login( user: LoginModel, recordar = false ) {

    if (recordar) {
      localStorage.setItem('em', user.em);
    } else {
      localStorage.removeItem('em');
    }

    const url = URL_SERVICES + '/login' ;

    return this.http.post( url, user )
      .pipe(map((resp: any) => {
            localStorage.setItem('tk', resp.token);
            this.router.navigate(['dashboard']);
            return true;  
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo crear');
       return throwError(error);
   }));
   
  }

 

  logout() {
    localStorage.removeItem('tk');
    //redirectToLogin(this.router);
  }



  public decodeToken(): any {
  
    const token = localStorage.getItem('tk');
  
    if (!token){
      console.log('No hay token');
      Swal.fire('Acceso Restringido', 'No hay token - decodeToken', 'error');
      //redirectToLogin(this.router);
      return;
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      console.log('Token expirado');
      Swal.fire('Acceso Restringido', 'Token expirado - decodeToken', 'error');
      //redirectToLogin(this.router);
      return;
    }
  
    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken.user;
  
  }

}

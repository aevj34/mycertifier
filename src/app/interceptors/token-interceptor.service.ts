import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public loginService: LoginService, public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const re = '/login';

    // Exclude interceptor for login request:
    if (req.url.search(re) != -1) {
  
     // console.log('entroo');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const newReq = req.clone(
        {
           headers: headers
        });
        return next.handle(newReq);
    }


    if (!this.loginService.isAuthenticated()) {
    
      // return next.handle(req);

      return next.handle(req).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        this.router.navigate(['/login']);
      }
    }));

    }


    const token = localStorage.getItem('tk');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    });

    const newReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(newReq);

  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/user' +'?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/user/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/user/' + id ;
    return this.http.get(url);
  }

  insert( user: User ) {

    const url = URL_SERVICES + '/user' ;

    return this.http.post( url, user )
      .pipe(map((resp: any) => {
        swal('Usuario creado', user.name, 'success');
        return resp.user;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }

  update( user: User ) {

    const url = URL_SERVICES + '/user/' + user._id ;

    return this.http.put( url, user )
      .pipe(map((resp: any) => {
        swal('Usuario actualizado', user.name, 'success');
        return resp.user;
      }
      ))
      .pipe(catchError( (error) => {
        return throwError(error);
    }));

  }

  delete(id: string, unsubscribe: boolean ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de Usuario';
    } else {
      text = 'Activación de Usuario';
    }

    const url = URL_SERVICES + '/user/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.user;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


  changePassword( user: User ) {

    const url = URL_SERVICES + '/user/changepassword';

    return this.http.put( url, user )
      .pipe(map((resp: any) => {
        swal('Contraseña cambiada', user.name, 'success');
        return resp;
      }
      ))
      .pipe(catchError( (error) => {
        return throwError(error);
    }));

  }

  dashboard() {
    const url = URL_SERVICES + '/user/dashboard' ;
    return this.http.get(url);
  }

}

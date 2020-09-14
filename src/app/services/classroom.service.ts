import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { Classroom } from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {


  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/classroom' +'?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/classroom/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/classroom/' + id ;
    return this.http.get(url);
  }

  insert( classroom: Classroom ) {

    const url = URL_SERVICES + '/classroom' ;

    return this.http.post( url, classroom )
      .pipe(map((resp: any) => {
        swal('Aula creada', classroom.name, 'success');
        return resp.classroom;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }

  update( classroom: Classroom ) {

    const url = URL_SERVICES + '/classroom/' + classroom._id ;

    return this.http.put( url, classroom )
      .pipe(map((resp: any) => {
        swal('Aula actualizada', classroom.name, 'success');
        return resp.classroom;
      }
      ))
      .pipe(catchError( (error) => {
        return throwError(error);
    }));

  }

  delete(id: string, unsubscribe: boolean ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de tipos';
    } else {
      text = 'Activación de tipos';
    }

    const url = URL_SERVICES + '/classroom/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.classroom;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2'
import { ErrorManager } from '../errors/error-manager';
import { EnrollmentDetail } from '../models/enrollment-detail';


@Injectable({
  providedIn: 'root'
})

export class EnrollmentDetailService {

  constructor(public http: HttpClient) { }


  obtain(id: string) {
    const url = URL_SERVICES + '/enrollmentDetail/' + id ;
    return this.http.get(url);
  }

  insert( enrollmentDetail: EnrollmentDetail ) {

    const url = URL_SERVICES + '/enrollmentDetail' ;

    return this.http.post( url, enrollmentDetail )
      .pipe(map((resp: any) => {
        Swal.fire('Curso agreaddo', 'El curso se agregó satisfactoriamente', 'success');
        return resp.enrollmentDetail;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo crear');
       return throwError(error);
   }));
  }

  update( enrollmentDetail: EnrollmentDetail ) {

    const url = URL_SERVICES + '/enrollmentDetail/' + enrollmentDetail._id ;

    return this.http.put( url, enrollmentDetail )
      .pipe(map((resp: any) => {
        Swal.fire('Curso Actualizado', 'El curso se actualizó satisfactoriamente', 'success');
        return resp;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo actualizar');
        return throwError(error);
    }));

  }

  delete(id: string, unsubscribe: boolean, enrollmentid: string, ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de grado';
    } else {
      text = 'Activavión de grado';
    }

    const url = URL_SERVICES + '/enrollmentDetail/' + id + '/' + unsubscribe + '/' + enrollmentid;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(text, 'Operación terminada satisfactoriamente', 'success');

        return resp.enrollmentDetail;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo actualizar');
       return throwError(error);
   }));

  }

  getByEnrollment(id: string) {
    const url = URL_SERVICES + '/enrollmentDetail/enrollment/' + id ;
    return this.http.get(url);
  }



}

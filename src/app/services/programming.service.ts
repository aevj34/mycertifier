import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2'
import { ErrorManager } from '../errors/error-manager';
import { Programming } from '../models/programmings';


@Injectable({
  providedIn: 'root'
})

export class ProgrammingService {

  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/programming?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  getAllCombo(search: string) {
    const url = URL_SERVICES + '/programming/getAllByCombo?search=' + search;
    return this.http.get(url);
  }


  search(search: string) {
    const url = URL_SERVICES + '/programming/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/programming/' + id ;
    return this.http.get(url);
  }

  insert( programming: Programming ) {

    const url = URL_SERVICES + '/programming' ;

    console.log(programming);

    return this.http.post( url, programming )
      .pipe(map((resp: any) => {
        Swal.fire('Curso creado', 'El curso se programó satisfactoriamente', 'success');
        return resp.programming;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo crear');
       return throwError(error);
   }));
  }

  update( programming: Programming ) {

    const url = URL_SERVICES + '/programming/' + programming._id ;

    console.log(programming);

    return this.http.put( url, programming )
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

  delete(id: string, unsubscribe: boolean ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de grado';
    } else {
      text = 'Activavión de grado';
    }

    const url = URL_SERVICES + '/programming/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(text, 'Operación terminada satisfactoriamente', 'success');

        return resp.programming;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo actualizar');
       return throwError(error);
   }));

  }


  getAvailables(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/programming/availables?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  searchAvailables(search: string) {
    const url = URL_SERVICES + '/programming/availables/search/' + search ;
    return this.http.get(url);
  }

  getStudents(programmingid: string) {
    const url = URL_SERVICES + '/programming/students/' + programmingid ;
    return this.http.get(url);
  }


    
  public downloadPDF(programmming: Programming): any {

    const url = URL_SERVICES + '/programming/enrollments-course';
   
    return this.http.post(url, programmming, { responseType: 'blob' })
    .pipe(map((resp: any) => {
      return resp;
    }
    ))
    .pipe(catchError( (error) => {
      ErrorManager.handleError(error,'No se pudo crear');
     return throwError(error);
 }));
}


}

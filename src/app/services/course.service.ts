import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2'
import { ErrorManager } from '../errors/error-manager';
import { Course } from '../models/course';


@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/course?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  getAllCombo() {
    const url = URL_SERVICES + '/course/getAllByCombo';
    return this.http.get(url);
  }

  searchAllCombo(search: string) {
    const url = URL_SERVICES + '/course/getAllByCombo?search=' + search;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/course/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/course/' + id ;
    return this.http.get(url);
  }

  insert( course: Course ) {

    const url = URL_SERVICES + '/course' ;

    console.log(course);

    return this.http.post( url, course )
      .pipe(map((resp: any) => {
        Swal.fire('Curso creado', course.name, 'success');
        return resp.course;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo crear');
       return throwError(error);
   }));
  }

  update( course: Course ) {

    const url = URL_SERVICES + '/course/' + course._id ;

    return this.http.put( url, course )
      .pipe(map((resp: any) => {
        Swal.fire('Curso Actualizado', course.name, 'success');
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

    const url = URL_SERVICES + '/course/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(text, 'Operación terminada satisfactoriamente', 'success');

        return resp.course;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo actualizar');
       return throwError(error);
   }));

  }

  getByCurricularPlan(curricularPlan: string) {
    const url = URL_SERVICES + '/course/curricularPlan?id=' + curricularPlan ;
    return this.http.get(url);
  }


}

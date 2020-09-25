import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2'
import { ErrorManager } from '../errors/error-manager';
import { CurricularPlan } from '../models/curricular-plan';
@Injectable({
  providedIn: 'root'
})

export class CurricularPlanService {

  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/curricularPlan?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/curricularPlan/search/' + search  ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/curricularPlan/' + id ;
    return this.http.get(url);
  }

  insert( curricularPlan: CurricularPlan ) {

    const url = URL_SERVICES + '/curricularPlan' ;

    return this.http.post( url, curricularPlan )
      .pipe(map((resp: any) => {
        Swal.fire('Plan curricular creado', curricularPlan.name, 'success');
        return resp;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo crear');
       return throwError(error);
   }));
  }

  update( curricularPlan: CurricularPlan ) {

    const url = URL_SERVICES + '/curricularPlan/' + curricularPlan._id ;

    return this.http.put( url, curricularPlan )
      .pipe(map((resp: any) => {
        Swal.fire('Plan curricular actualizado', curricularPlan.name, 'success');
        return resp.curricularPlan;
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

    const url = URL_SERVICES + '/curricularPlan/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(text, resp.curricularPlan.name, 'success');
        return resp.curricularPlan;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo actualizar');
       return throwError(error);
   }));

  }


  deleteCourse(courseId: string) {

    let text: string;
    text = 'Baja de curso';

    const url = URL_SERVICES + '/curricularPlan/deletecourse/' + courseId  ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(text, resp.course.name, 'success');

        return resp.course;
      }
      ))
      .pipe(catchError( (error) => {
        ErrorManager.handleError(error,'No se pudo actualizar');
       return throwError(error);
   }));

  }

  getCoursesByCurricularPlan(curricularPlan: string) {
    const url = URL_SERVICES + '/curricularPlan/courses/' + curricularPlan ;
    return this.http.get(url);
  }



}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { CourseType } from '../models/course-type';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {


  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/courseType' +'?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/courseType/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/courseType/' + id ;
    return this.http.get(url);
  }

  insert( courseType: CourseType ) {

    const url = URL_SERVICES + '/courseType' ;

    return this.http.post( url, courseType )
      .pipe(map((resp: any) => {
        swal('Tipo creado', courseType.name, 'success');
        return resp.courseType;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }

  update( courseType: CourseType ) {

    const url = URL_SERVICES + '/courseType/' + courseType._id ;

    return this.http.put( url, courseType )
      .pipe(map((resp: any) => {
        swal('Tipo actualizado', courseType.name, 'success');
        return resp.courseType;
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

    const url = URL_SERVICES + '/courseType/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.courseType;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


}

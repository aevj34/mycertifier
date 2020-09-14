import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { CourseGroup } from '../models/course-group';

@Injectable({
  providedIn: 'root'
})
export class CourseGroupService {


  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/courseGroup' +'?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/courseGroup/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/courseGroup/' + id ;
    return this.http.get(url);
  }

  insert( courseGroup: CourseGroup ) {

    const url = URL_SERVICES + '/courseGroup' ;

    return this.http.post( url, courseGroup )
      .pipe(map((resp: any) => {
        swal('Nivel creado', courseGroup.name, 'success');
        return resp.courseGroup;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }

  update( courseGroup: CourseGroup ) {

    const url = URL_SERVICES + '/courseGroup/' + courseGroup._id ;

    return this.http.put( url, courseGroup )
      .pipe(map((resp: any) => {
        swal('Nivel actualizado', courseGroup.name, 'success');
        return resp.courseGroup;
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

    const url = URL_SERVICES + '/courseGroup/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.courseGroup;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


}

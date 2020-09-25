import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/teacher' +'?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/teacher/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/teacher/' + id ;
    return this.http.get(url);
  }

  insert( teacher: Teacher ) {

    const url = URL_SERVICES + '/teacher' ;

    return this.http.post( url, teacher )
      .pipe(map((resp: any) => {
        swal('Docente creado', teacher.name, 'success');
        return resp.teacher;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }

  update( teacher: Teacher ) {

    const url = URL_SERVICES + '/teacher/' + teacher._id ;

    return this.http.put( url, teacher )
      .pipe(map((resp: any) => {
        swal('Docente actualizado', teacher.name, 'success');
        return resp.teacher;
      }
      ))
      .pipe(catchError( (error) => {
        return throwError(error);
    }));

  }

  delete(id: string, unsubscribe: boolean ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de Docente';
    } else {
      text = 'Activación de Docente';
    }

    const url = URL_SERVICES + '/teacher/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.teacher;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


  getAllCombo() {
    const url = URL_SERVICES + '/teacher/combo';
    return this.http.get(url);
  }


}

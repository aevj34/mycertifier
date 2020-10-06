import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/student' +'?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/student/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/student/' + id ;
    return this.http.get(url);
  }

  obtainByDocument(document: string) {
    const url = URL_SERVICES + '/student/getByDocument?id=' + document ;
    return this.http.get(url);
  }

  insert( student: Student ) {

    const url = URL_SERVICES + '/student' ;

    return this.http.post( url, student )
      .pipe(map((resp: any) => {
        swal('Alumno registrado', 'Se haregistrado a ' + student.name + ' ' + student.lastName + ' satisfactoriamente', 'success');
        return resp;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }

  update( student: Student ) {

    const url = URL_SERVICES + '/student/' + student._id ;

    return this.http.put( url, student )
      .pipe(map((resp: any) => {
        swal('Alumno actualizado', student.name, 'success');
        return resp.student;
      }
      ))
      .pipe(catchError( (error) => {
        return throwError(error);
    }));

  }

  delete(id: string, unsubscribe: boolean ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de Alumno';
    } else {
      text = 'Activación de Alumno';
    }

    const url = URL_SERVICES + '/student/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.student;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


  getAllCombo() {
    const url = URL_SERVICES + '/student/getAllByCombo';
    return this.http.get(url);
  }

}

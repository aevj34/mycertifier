import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { Requirement } from '../models/requirement';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {


  constructor(public http: HttpClient) { }

  getByParent(parentId: number) {
    const url = URL_SERVICES + '/requirement' +'?parentId=' + parentId ;
    return this.http.get(url);
  }

  insert( requirement: Requirement ) {

    const url = URL_SERVICES + '/requirement' ;

    return this.http.post( url, requirement )
      .pipe(map((resp: any) => {
        swal('Pre-requisito agregado', 'Pre-requisito  ingresado satisfactoriamente', 'success');
        return resp.requirement;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }


  delete(id: string, unsubscribe: boolean ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de Requerimientos';
    } else {
      text = 'Activación de Requerimientos';
    }

    const url = URL_SERVICES + '/requirement/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.requirement;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


}

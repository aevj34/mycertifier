import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(public http: HttpClient) { }

  getAll() {
    const url = URL_SERVICES + '/programming/turns';
    return this.http.get(url);
  }
  
}

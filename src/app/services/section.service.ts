import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(public http: HttpClient) { }

  getAll() {
    const url = URL_SERVICES + '/programming/sections';
    return this.http.get(url);
  }
}

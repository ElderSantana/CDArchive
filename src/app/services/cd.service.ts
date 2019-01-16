import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CDService {
  private headers = new HttpHeaders();
  constructor(
    public http: HttpClient
  ) { }

  getOptions() : Object{ 
    let h = this.headers.set('Access-Control-Allow-Origin' ,  '*');
    let options = {headers: h}
    return options;
  }
 
  getCds( ){
    return this.http.get(``  , this.getOptions()).pipe(map(response => response));
  }
}

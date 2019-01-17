import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CDService {
  constructor(
    public http: HttpClient
  ) { }
   
  getOptions() : Object{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let options = {headers: headers}
    return options;
  }   

  getCds( ){
    return this.http.get(`${environment.base}/cds`, this.getOptions()).pipe(map(response => response));
  }
  addCd(cd : any){
    return this.http.post(`${environment.base}/cd` , cd , this.getOptions()).pipe(map(response => response));
  }
  editCd(cd : any){
    return this.http.post(`${environment.base}/cd/${cd.id}` , cd).pipe(map(response => response));
  }
  getGenres( ){
    return this.http.get(`${environment.base}/genres`, this.getOptions()).pipe(map(response => response));
  }
  addGenre(genre : any){
    return this.http.post(`${environment.base}/genre` , genre , this.getOptions()).pipe(map(response => response));
  }
}

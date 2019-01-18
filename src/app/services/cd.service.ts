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
    const headers = new HttpHeaders();
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
    console.log(cd);
    
    return this.http.post(`${environment.base}/cd/${cd.id}` , cd , this.getOptions()).pipe(map(response => response));
  }
  removeCd(id){
    return this.http.delete(`${environment.base}/cd/${id}` , this.getOptions()).pipe(map(response => response));
  }
  getGenres( ){
    return this.http.get(`${environment.base}/genres`, this.getOptions()).pipe(map(response => response));
  }
  addGenre(genre : any){
    return this.http.post(`${environment.base}/genre` , genre , this.getOptions() ).pipe(map(response => response));
  }

   // generate slug for a string
   slug(str)
   {
     str = str.replace(/^\s+|\s+$/g, ''); // trim
     str = str.toLowerCase();
   
     // remove accents, swap ñ for n, etc
     var from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
     var to   = "aaaaaeeeeiiiiooooouuuunc------";
   
     for (var i=0, l=from.length ; i<l ; i++)
       str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
   
   
     str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
       .replace(/\s+/g, '-') // collapse whitespace and replace by -
       .replace(/-+/g, '-'); // collapse dashes
   
     return str;
   }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})
export class KecamatanService {
  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = GlobalComponent.url;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer Token',
      'HeaderUsername': localStorage.getItem('username')  || '{}',
      'HeaderID': localStorage.getItem('userID')  || '{}',
      'UserToken': localStorage.getItem('token')  || '{}'
    })
  };
  
  constructor(private http: HttpClient) { }
  
  getAllKecamatan(kabupaten_kota_id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/wilayah/getAllKecamatan?kabupaten_kota_id=' + kabupaten_kota_id  , { headers: this.httpOptions['headers'] } );
  }
  
  getAllKecamatanByParams(kabupaten_kota_id:any, params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/wilayah/getAllKecamatanByParams?kabupaten_kota_id=' + kabupaten_kota_id + '&params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getKecamatanByID(id: any) {
    return this.http.get(this.baseUrl + '/api/wilayah/getKecamatanByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  



  
  getDaftarRole(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role/getAllRole' , { params, headers: this.httpOptions['headers'] } );
  }
  
  getAllRole(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role/getAllRole' , { headers: this.httpOptions['headers'] } );
  }
  
  getRoleByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role/getRoleByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  createRole(role: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/role/createRole', role, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', role))
      );
  }

  updateRole(role: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/role/updateRole', role, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', role))
      );
  }

  deleteRole(id: any) {
    return this.http.get(this.baseUrl + '/api/role/deleteRole?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }








  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

 
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})
export class DesakelurahanService {
  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = GlobalComponent.url;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer 4pb4tech',
      'HeaderUsername': localStorage.getItem('username')  || '{}',
      'HeaderID': localStorage.getItem('userID')  || '{}',
      'UserToken': localStorage.getItem('token')  || '{}'
    })
  };
  
  constructor(private http: HttpClient) { }
  
  getAllDesaKelurahan(kecamatan_id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/wilayah/getAllDesaKelurahan?kecamatan_id=' + kecamatan_id  , { headers: this.httpOptions['headers'] } );
  }
  
  getAllDesaKelurahanByParams(kecamatan_id:any, params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/wilayah/getAllDesaKelurahanByParams?kecamatan_id=' + kecamatan_id + '&params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getDesaKelurahanByID(id: any) {
    return this.http.get(this.baseUrl + '/api/wilayah/getDesaKelurahanByID?id=' + id, { headers: this.httpOptions['headers'] } );
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

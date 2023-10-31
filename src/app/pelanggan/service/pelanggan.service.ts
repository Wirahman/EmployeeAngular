import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class PelangganService {
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

  createPelanggan(pelanggan: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/pelanggan/createPelanggan', pelanggan, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pelanggan))
      );
  }

  updatePelanggan(pelanggan: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/pelanggan/updatePelanggan', pelanggan, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pelanggan))
      );
  }

  deletePelanggan(id: any) {
    return this.http.get(this.baseUrl + '/api/pelanggan/deletePelanggan?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAllPelanggan(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/pelanggan/getAllPelanggan' , { headers: this.httpOptions['headers'] } );
  }
  
  getPelangganByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/pelanggan/getPelangganByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getPelangganByID(id: any) {
    return this.http.get(this.baseUrl + '/api/pelanggan/getPelangganByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  







  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}

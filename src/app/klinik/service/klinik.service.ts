import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class KlinikService {
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

  createKlinik(klinik: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/klinik/createKlinik', klinik, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', klinik))
      );
  }

  updateKlinik(klinik: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/klinik/updateKlinik', klinik, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', klinik))
      );
  }

  deleteKlinik(id: any) {
    return this.http.get(this.baseUrl + '/api/klinik/deleteKlinik?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAllKlinik(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/klinik/getAllKlinik' , { headers: this.httpOptions['headers'] } );
  }
  
  getAllKlinikByCustomerID(customerID: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/klinik/getAllKlinikByCustomerID?customerID=' + customerID , { headers: this.httpOptions['headers'] } );
  }
  
  getKlinikByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/klinik/getKlinikByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getKlinikByID(id: any) {
    return this.http.get(this.baseUrl + '/api/klinik/getKlinikByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  







  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class PackageHeaderService {
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
  
  createPackageHeader(packageHeader: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/package/createPackageHeader', packageHeader, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', packageHeader))
      );
  }

  updatePackageHeader(packageHeader: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/package/updatePackageHeader', packageHeader, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', packageHeader))
      );
  }

  getDaftarRole(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role/getAllRole' , { params, headers: this.httpOptions['headers'] } );
  }
  
  deletePackageHeader(id: any) {
    return this.http.get(this.baseUrl + '/api/package/deletePackageHeader?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }


  getAllPackageHeader(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/package/getAllPackageHeader' , { headers: this.httpOptions['headers'] } );
  }
  
  getPackageHeaderByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/package/getPackageHeaderByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getPackageHeaderByID(id: any) {
    return this.http.get(this.baseUrl + '/api/package/getPackageHeaderByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  






  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

 
}

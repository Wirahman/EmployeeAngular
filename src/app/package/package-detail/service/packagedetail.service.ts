import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class PackageDetailService {
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
  
  createPackageDetail(packageDetail: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/package/createPackageDetail', packageDetail, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', packageDetail))
      );
  }

  updatePackageDetail(packageDetail: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/package/updatePackageDetail', packageDetail, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', packageDetail))
      );
  }

  deletePackageDetail(id: any) {
    return this.http.get(this.baseUrl + '/api/package/deletePackageDetail?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }


  getAllPackageDetail(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/package/getAllPackageDetail' , { headers: this.httpOptions['headers'] } );
  }
  
  getPackageDetailByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/package/getPackageDetailByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getPackageDetailByID(id: any) {
    return this.http.get(this.baseUrl + '/api/package/getPackageDetailByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  






  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

 
}

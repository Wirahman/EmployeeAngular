import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class PermissionService {
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
  
  getDaftarPermission(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/permission/getAllPermission' , { params, headers: this.httpOptions['headers'] } );
  }
  
  getAllPermission(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/permission/getAllPermission' , { headers: this.httpOptions['headers'] } );
  }
  
  getPermissionByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/permission/getPermissionByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getPermissionByID(id: any) {
    return this.http.get(this.baseUrl + '/api/permission/getPermissionByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  
  createPermission(permission: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/permission/createPermission', permission, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', permission))
      );
  }

  updatePermission(permission: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/permission/updatePermission', permission, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', permission))
      );
  }

  deletePermission(id: any) {
    return this.http.get(this.baseUrl + '/api/permission/deletePermission?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }








  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}

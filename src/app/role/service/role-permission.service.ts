import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';

@Injectable({
  providedIn: 'root'
})

export class RolePermissionService {
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
  
  getAllPermission(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role-permission/getAllPermission' , { params, headers: this.httpOptions['headers'] } );
  }
  
  getPermissionByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role-permission/getRolePermissionByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  updateRolePermission(rolePermission: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/role-permission/updateRolePermission', rolePermission, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', rolePermission))
      );
  }
  
  updateRoleSemuaPermission(rolePermission: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/role-permission/updateRoleSemuaPermission', rolePermission, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', rolePermission))
      );
  }
  
  periksaCheckBoxAllRolePermission(rolePermission: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/role-permission/periksaCheckBoxAllRolePermission', rolePermission, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', rolePermission))
      );
  }
  
  getAllMenu(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role-permission/getAllMenu' , { params, headers: this.httpOptions['headers'] } );
  }
  
  getValidasiButton(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role-permission/getValidasiButton' , { params, headers: this.httpOptions['headers'] } );
  }
  
  

  
  







  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
 
}

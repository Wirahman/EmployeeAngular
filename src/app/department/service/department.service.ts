import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
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
  
  createDepartment(department: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/department/createDepartment', department, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', department))
      );
  }

  updateDepartment(department: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/department/updateDepartment', department, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', department))
      );
  }

  deleteDepartment(id: any) {
    return this.http.get(this.baseUrl + '/api/department/deleteDepartment?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/department/getAllDepartment' , { params, headers: this.httpOptions['headers'] } );
  }
  
  
  getAllAktif(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/department/GetAllAktif' , { headers: this.httpOptions['headers'] } );
  }
  
  getDepartmentByID(id: any) {
    return this.http.get(this.baseUrl + '/api/department/getDepartmentByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  
  getDepartmentByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/department/getDepartmentByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  








  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

  
}

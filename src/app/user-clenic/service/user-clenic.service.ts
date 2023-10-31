import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class UserClenicService {
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

  createUserClenic(userClenic: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/userClenic/createUserClenic', userClenic, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', userClenic))
      );
  }

  updateUserClenic(userClenic: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/userClenic/updateUserClenic', userClenic, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', userClenic))
      );
  }

  deleteUserClenic(id: any) {
    return this.http.get(this.baseUrl + '/api/userClenic/deleteUserClenic?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAllUserClenic(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/userClenic/getAllUserClenic' , { headers: this.httpOptions['headers'] } );
  }
  
  getUserClenicByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/userClenic/getUserClenicByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getUserClenicByID(id: any) {
    return this.http.get(this.baseUrl + '/api/userClenic/getUserClenicByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  







  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}

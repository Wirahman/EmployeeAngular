import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class PenggunaService {
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

  login(pengguna: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/user/login', pengguna, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pengguna))
      );
  }

  register(pengguna: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/user/register', pengguna, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pengguna))
      ); 
  }

  updateUser(pengguna: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/user/updateUser', pengguna, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pengguna))
      );
  }
  
  deleteUser(id: any) {
    return this.http.get(this.baseUrl + '/api/user/deleteUser?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' }).pipe(
      catchError(this.handleError('Error Ketika Mendapatkan Data', id))
    );;
  }
  
  resetPassword(id: any) {
    return this.http.get(this.baseUrl + '/api/user/resetPassword?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }
  
  ubahPassword(pengguna: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/user/ubahPassword', pengguna, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pengguna))
      );
  }
  
  getAllUser(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/user/getAllUser' , { params, headers: this.httpOptions['headers'] } );
  }
  
  getUserByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/user/getUserByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getUserByID(id: any) {
    return this.http.get(this.baseUrl + '/api/user/getUserByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  
  logout(pengguna: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/user/logout', pengguna, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pengguna))
      );
  }

  

  






  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}

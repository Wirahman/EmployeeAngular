import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class LogActivitiesService {
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

  createLogActivities(logactivities: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/logactivities/createLogActivities', logactivities, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', logactivities))
      );
  }

  updateLogActivities(logactivities: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/logactivities/updateLogActivities', logactivities, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', logactivities))
      );
  }

  deleteLogActivities(id: any) {
    return this.http.get(this.baseUrl + '/api/logactivities/deleteLogActivities?tahun=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAllLogActivities(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/logactivities/getAllLogActivities' , { headers: this.httpOptions['headers'] } );
  }
  
  getLogActivitiesByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/logactivities/getLogActivitiesByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getLogActivitiesByID(id: any) {
    return this.http.get(this.baseUrl + '/api/logactivities/getLogActivitiesByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  







  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}

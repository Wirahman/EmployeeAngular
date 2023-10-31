import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';

@Injectable({
  providedIn: 'root'
})
export class CodeSettingsService {
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
  // Ini untuk function asli
  getDaftarCodeSettings(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/code-settings/getAllCodeSettings' , { params, headers: this.httpOptions['headers'] } );
  }

  getCodeSettingsByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/code-settings/getCodeSettingsByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getCodeSettingsByID(id: any) {
    return this.http.get(this.baseUrl + '/api/code-settings/getCodeSettingsByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }

  createCodeSettings(codesettings: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/code-settings/createCodeSettings', codesettings, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', codesettings))
      );
  }

  updateCodeSettings(codesettings: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/code-settings/updateCodeSettings', codesettings, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', codesettings))
      );
  }

  deleteCodeSettings(id: any) {
    return this.http.get(this.baseUrl + '/api/code-settings/deleteCodeSettings?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }


  





  







  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

 
}

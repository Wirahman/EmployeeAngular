import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class ContractDetailService {
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
  
  createContractDetail(contractDetail: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/contract/createContractDetail', contractDetail, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', contractDetail))
      );
  }

  updateContractDetail(contractDetail: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/contract/updateContractDetail', contractDetail, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', contractDetail))
      );
  }

  getDaftarRole(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role/getAllRole' , { params, headers: this.httpOptions['headers'] } );
  }
  
  deleteContractDetail(id: any) {
    return this.http.get(this.baseUrl + '/api/contract/deleteContractDetail?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAllContractDetail(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/contract/getAllContractDetail' , { headers: this.httpOptions['headers'] } );
  }
  
  getContractDetailByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/contract/getContractDetailByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getContractDetailByID(id: any) {
    return this.http.get(this.baseUrl + '/api/contract/getContractDetailByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  






  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

 
}
